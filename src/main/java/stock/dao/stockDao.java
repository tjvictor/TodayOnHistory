package stock.dao;

import stock.model.Stock.StockRegister;
import stock.model.Stock.StockVolatility;
import stock.model.StockDateDataEntity;
import stock.model.StockEntity;

import java.sql.SQLException;
import java.util.List;

public interface stockDao {
    StockDateDataEntity getStocksByVolatility(String stockCode, String volatility, String startDate, String endDate) throws SQLException;

    StockDateDataEntity getStocksByVolatilityByMonth(String stockCode, String volatility, String startDate, String endDate, String month) throws SQLException;

    List<StockVolatility> getStockVolatilityByCodeDateVolatility(String stockCode, String volatility, String startDate, String endDate) throws SQLException;

    void insertStockHistoryData(List<StockEntity> items) throws SQLException;
    void insertStockHistoryData(String tableName, List<StockEntity> items) throws SQLException;

    void createNewStockTable(String tableName) throws SQLException;

    boolean isTableExist(String tableName) throws SQLException;

    List<StockRegister> getAllStockRegisters() throws SQLException;

    void insertStockLastDate(String code, String name, String lastDate) throws SQLException;

    void updateStockLastDate(String code, String lastDate) throws SQLException;
}
