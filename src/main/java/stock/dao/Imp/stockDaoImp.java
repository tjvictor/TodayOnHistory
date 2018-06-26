package stock.dao.Imp;

import stock.dao.stockDao;
import stock.model.Stock.StockVolatility;
import stock.model.StockDateDataEntity;
import stock.model.StockDateDataUnit;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Component
public class stockDaoImp extends BaseDao implements stockDao {
    @Override
    public StockDateDataEntity getStocksByVolatility(String stockCode, String volatility, String startDate, String endDate) throws SQLException {
        StockDateDataEntity item = new StockDateDataEntity();
        item.setStockCode(stockCode);
        int volatility_num = Math.abs(Integer.parseInt(volatility));
        String whereSql = String.format(" where ABS(pchg) > %s", volatility);
        if(StringUtils.isNotEmpty(startDate) && StringUtils.isNotEmpty(endDate)){
            whereSql += String.format(" and date >= '%s' and date <= '%s'", startDate, endDate);
        }

        String selectSql = String.format("select date, tclose, high, low, topen, lclose, chg, pchg, voturnover, vaturnover from s%s %s", stockCode, whereSql);

        try (Connection connection = DriverManager.getConnection(dbConnectString)) {
            try (Statement stmt = connection.createStatement()) {
                try (ResultSet rs = stmt.executeQuery(selectSql)) {
                    while (rs.next()) {
                        int i = 1;
                        StockDateDataUnit unit = new StockDateDataUnit();
                        unit.setDate(rs.getString(i++));
                        unit.setTclose(rs.getString(i++));
                        unit.setHigh(rs.getString(i++));
                        unit.setLow(rs.getString(i++));
                        unit.setTopen(rs.getString(i++));
                        unit.setLclose(rs.getString(i++));
                        unit.setChg(rs.getString(i++));
                        unit.setPchg(rs.getString(i++));
                        unit.setVoturnover(rs.getString(i++));
                        unit.setVaturnover(rs.getString(i++));
                        item.getStockDateDataUnitList().add(unit);
                    }
                }
            }
        }

        return item;
    }

    @Override
    public StockDateDataEntity getStocksByVolatilityByMonth(String stockCode, String volatility, String startDate, String endDate, String month) throws SQLException {
        StockDateDataEntity sdde = getStocksByVolatility(stockCode, volatility, startDate, endDate);
        StockDateDataEntity item = new StockDateDataEntity();
        item.setStockCode(stockCode);
        for(StockDateDataUnit unit : sdde.getStockDateDataUnitList()){
            if(unit.getDate().split("-")[1].equals(month))
                item.getStockDateDataUnitList().add(unit);
        }
        return item;
    }

    @Override
    public List<StockVolatility> getStockVolatilityByCodeDateVolatility(String stockCode, String volatility, String startDate, String endDate) throws SQLException {
        List<StockVolatility> items = new ArrayList<StockVolatility>();

        StockDateDataEntity sdde = getStocksByVolatility(stockCode, volatility, startDate, endDate);
        for(StockDateDataUnit temp : sdde.getStockDateDataUnitList()){
            StockVolatility item = new StockVolatility();
            item.setDate(temp.getDate());
            item.setVolatility(temp.getPchg());
            items.add(item);
        }

        return items;

    }
}
