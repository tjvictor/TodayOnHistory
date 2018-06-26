package stock.dao;

import stock.model.Stock.StockVolatility;
import stock.model.StockDateDataEntity;

import java.sql.SQLException;
import java.util.List;

public interface stockDao {
    StockDateDataEntity getStocksByVolatility(String stockCode, String volatility, String startDate, String endDate) throws SQLException;

    StockDateDataEntity getStocksByVolatilityByMonth(String stockCode, String volatility, String startDate, String endDate, String month) throws SQLException;

    List<StockVolatility> getStockVolatilityByCodeDateVolatility(String stockCode, String volatility, String startDate, String endDate) throws SQLException;
}
