package stock.bo;

import stock.model.StockDateDataEntity;

import org.springframework.stereotype.Component;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
public class stockDataBo {

    private static final String STOCK_DATA_URL = "http://quotes.money.163.com/service/chddata.html?code=0%s&start=20180101&end=%s&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER";

    public void downloadFileFromUrl(String stockCode) throws IOException {

        URL url = new URL("http://quotes.money.163.com/service/chddata.html?code=0600600&start=20180101&end=20180301&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER");
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
        //设置超时间为3秒
        //conn.setConnectTimeout(3*1000);
        //防止屏蔽程序抓取而返回403错误
        //conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");

        //得到输入流
        InputStream inputStream = conn.getInputStream();
        //获取自己数组
        byte[] getData = readInputStream(inputStream);

        //文件保存位置
        File file = new File("c:/temp/aaa.csv");
        FileOutputStream fos = new FileOutputStream(file);
        fos.write(getData);
        if(fos!=null){
            fos.close();
        }
        if(inputStream!=null){
            inputStream.close();
        }


        System.out.println("info:"+url+" download success");

    }

   private byte[] readInputStream(InputStream inputStream) throws IOException {
        byte[] buffer = new byte[1024];
        int len = 0;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        while((len = inputStream.read(buffer)) != -1) {
            bos.write(buffer, 0, len);
        }
        bos.close();
        return bos.toByteArray();
    }

    public StockDateDataEntity getStocksByVolatility(String stockCode, String volatility, String startDate, String endDate){

        return null;
    }

}
