package stock.model;

import java.util.List;

public class StockDateDataEntity {
    private String stockCode;
    private String stockName;

    private List<StockDateDataUnit> stockDateDataUnitList;

    public String getStockCode() {
        return stockCode;
    }

    public void setStockCode(String stockCode) {
        this.stockCode = stockCode;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public List<StockDateDataUnit> getStockDateDataUnitList() {
        return stockDateDataUnitList;
    }

    public void setStockDateDataUnitList(List<StockDateDataUnit> stockDateDataUnitList) {
        this.stockDateDataUnitList = stockDateDataUnitList;
    }
}
