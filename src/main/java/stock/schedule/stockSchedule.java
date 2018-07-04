package stock.schedule;

import stock.bo.stockDataBo;
import stock.dao.stockDao;
import stock.model.Stock.StockRegister;
import stock.utils.CommonUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

@Configuration
@EnableScheduling
public class stockSchedule {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private stockDao stockDaoImp;

    @Autowired
    private stockDataBo stockBo;

    @Scheduled(cron = "0 0 23 * * ?") // 每天23点执行一次
    public void syncRegisterStockDataByDaily() throws SQLException, IOException {
        Date today = new Date();
        if (CommonUtils.getDayOfWeek(today) > 5) {
            return ;
        }
        List<StockRegister> items = stockDaoImp.getAllStockRegisters();
        for (StockRegister item : items) {
            if(CommonUtils.dateAddDay(item.getLastDate(), 1).equals(CommonUtils.getCurrentDate())){
                return ;
            }
            stockBo.insertStockHistoryDataFromWeb(item.getCode(), (CommonUtils.dateAddDay(item.getLastDate(), 1)).replace("-", ""), CommonUtils.getCurrentDate("yyyyMMdd"));
            stockDaoImp.updateStockLastDate(item.getCode(), CommonUtils.getCurrentDate());
            logger.info(String.format("%s is updated to %s.", item.getCode(), CommonUtils.getCurrentDate()));
        }
    }
}
