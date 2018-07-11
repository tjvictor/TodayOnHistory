package stock.bo;

import stock.dao.stockDao;
import stock.model.StockDateDataEntity;
import stock.model.StockEntity;
import stock.utils.CommonUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class stockDataBo {

    @Autowired
    private stockDao stockDaoImp;

	/*
	SH is 0XXXXXX
	SZ is 1XXXXXX
	XXXXXX is stock code, like below

	http://quotes.money.163.com/service/chddata.html?code=0000001&start=20100101&end=20180601&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER
	http://quotes.money.163.com/service/chddata.html?code=0600436&start=20100101&end=20180601&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER

	http://quotes.money.163.com/service/chddata.html?code=1399001&start=20100101&end=20180601&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER
	http://quotes.money.163.com/service/chddata.html?code=1002601&start=20100101&end=20180601&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER
	http://quotes.money.163.com/service/chddata.html?code=1300729&start=20100101&end=20180601&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER
	http://quotes.money.163.com/service/chddata.html?code=1000049&start=20100101&end=20180601&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER
	*/

    private static final String STOCK_DATA_URL = "http://quotes.money.163.com/service/chddata.html?code=%s&start=%s&end=%s&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER";

    public void downloadFileFromUrl(String stockCode) throws IOException, SQLException {

        URL url = new URL("http://quotes.money.163.com/service/chddata.html?code=0600600&start=20180101&end=20180301&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER");
        System.setProperty("java.net.useSystemProxies", "true");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        InputStream inputStream = conn.getInputStream();
        byte[] getData = readInputStream(inputStream);

        //文件保存位置
        File file = new File("c:/temp/aaa.csv");
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(getData);
        if (fos != null) {
            fos.close();
        }
        if (inputStream != null) {
            inputStream.close();
        }

        String str = new String(getData, "GB2312");

        stockDaoImp.createNewStockTable("s600600");
        List<StockEntity> stockEntityList = new ArrayList<StockEntity>();
        String[] dataList = str.split("\r\n");
        int index = 1;
        if (dataList.length > 1) {
            while (index < dataList.length) {
                String item = dataList[index];
                String[] data = item.split(",");
                StockEntity stock = new StockEntity();
                stock.setDate(data[0]);
                stock.setCode(data[1]);
                stock.setTclose(data[3]);
                stock.setHigh(data[4]);
                stock.setLow(data[5]);
                stock.setTopen(data[6]);
                stock.setLclose(data[7]);
                stock.setChg(data[8]);
                stock.setPchg(data[9]);
                stock.setVoturnover(data[10]);
                stock.setVaturnover(data[11]);

                stockEntityList.add(stock);
                index++;
            }
        }

        stockDaoImp.insertStockHistoryData("s600600", stockEntityList);

    }

    private byte[] readInputStream(InputStream inputStream) throws IOException {
        byte[] buffer = new byte[1024];
        int len = 0;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        while ((len = inputStream.read(buffer)) != -1) {
            bos.write(buffer, 0, len);
        }
        bos.close();
        return bos.toByteArray();
    }

    public StockDateDataEntity getStocksByVolatility(String stockCode, String volatility, String startDate, String endDate) {

        return null;
    }

    public boolean isTableExist(String tableName) throws SQLException {

        return stockDaoImp.isTableExist("s" + tableName);

    }

    public void initStockData(String stockCode) throws SQLException, IOException {
        if (!isTableExist(stockCode)) {
            stockDaoImp.createNewStockTable("s" + stockCode);
            insertStockHistoryDataFromWeb(stockCode, "19900101", CommonUtils.dateAddDay(CommonUtils.getCurrentDate(), -1).replace("-", ""));
            stockDaoImp.insertStockLastDate(stockCode, "", CommonUtils.getCurrentDate());
        }
    }

    public void insertStockHistoryDataFromWeb(String code, String startDate, String endDate) throws IOException, SQLException {
        String finalCode = getFinalCode(code);
        URL url = new URL(String.format(STOCK_DATA_URL, finalCode, startDate, endDate));
        System.setProperty("java.net.useSystemProxies", "true");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        InputStream inputStream = conn.getInputStream();
        byte[] getData = readInputStream(inputStream);
        String str = new String(getData, "GB2312");

        List<StockEntity> stockEntityList = new ArrayList<StockEntity>();
        String[] dataList = str.split("\r\n");
        int index = 1;
        if (dataList.length > 1) {
            while (index < dataList.length) {
                String item = dataList[index];
                String[] data = item.split(",");
                StockEntity stock = new StockEntity();
                stock.setDate(data[0]);
                stock.setCode(data[1]);
                stock.setTclose(data[3]);
                stock.setHigh(data[4]);
                stock.setLow(data[5]);
                stock.setTopen(data[6]);
                stock.setLclose(data[7]);
                stock.setChg(data[8]);
                stock.setPchg(data[9]);
                stock.setVoturnover(data[10]);
                stock.setVaturnover(data[11]);

                stockEntityList.add(stock);
                index++;
            }
        }

        stockDaoImp.insertStockHistoryData("s" + code, stockEntityList);
    }

    private String getFinalCode(String code) {
        // this is for SH
        if (code.equals("000001"))
            return "0" + code;
        switch (code.charAt(0)) {
            //this is for SH
            case '6':
                return "0" + code;
            //this is for SZ, such as 300, 002, 000....
            case '3':
            case '0':
                return "1" + code;
        }

        return "";
    }
}
