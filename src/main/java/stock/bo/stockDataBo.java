package stock.bo;

import stock.model.StockEntity;
import stock.utils.CommonUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@Component
public class stockDataBo {

    private static final String STOCK_DATA_URL = "http://quotes.money.163.com/service/chddata.html?code=%s&start=20180101&end=%s&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;VOTURNOVER;VATURNOVER";
    @Autowired
    private RestTemplate restTemplate;

    public void downloadFileFromUrl(String stockCode) {
        String urlStr = String.format(STOCK_DATA_URL, stockCode, CommonUtils.getCurrentDate("yyyyMMdd"));
        RestTemplate restTemplate1 = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate1.getForEntity(urlStr, String.class);
        String body = responseEntity.getBody();

    }

    public List<StockEntity> getStockVolatility(String code, String volatility, String startDate, String endDate){


    }

}
