package stock.dao;

import stock.model.StockDateDataEntity;

import java.sql.SQLException;

public interface stockDao {
    StockDateDataEntity getStocksByVolatility(String stockCode, String volatility, String startDate, String endDate) throws SQLException;
}
