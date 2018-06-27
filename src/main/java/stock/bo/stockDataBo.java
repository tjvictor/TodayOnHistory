package stock.bo;

import stock.dao.stockDao;
import stock.model.StockDateDataEntity;
import stock.model.StockEntity;

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

    private static final String STOCK_DATA_URL = "http://quotes.money.163.com/service/chddata.html?code=0%s&start=20180101&end=%s&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER";

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

        return stockDaoImp.isTableExist("s"+tableName);

    }

}
