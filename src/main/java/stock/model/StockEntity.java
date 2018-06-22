package stock.model;

public class StockEntity {
    private String date;
    private String code;
    private String name;
    private String tclose;
    private String high;
    private String low;
    private String topen;
    private String lclose;
    private String chg;
    private String pchg;
    private String voturnover;
    private String vaturnover;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTclose() {
        return tclose;
    }

    public void setTclose(String tclose) {
        this.tclose = tclose;
    }

    public String getHigh() {
        return high;
    }

    public void setHigh(String high) {
        this.high = high;
    }

    public String getLow() {
        return low;
    }

    public void setLow(String low) {
        this.low = low;
    }

    public String getTopen() {
        return topen;
    }

    public void setTopen(String topen) {
        this.topen = topen;
    }

    public String getLclose() {
        return lclose;
    }

    public void setLclose(String lclose) {
        this.lclose = lclose;
    }

    public String getChg() {
        return chg;
    }

    public void setChg(String chg) {
        this.chg = chg;
    }

    public String getPchg() {
        return pchg;
    }

    public void setPchg(String pchg) {
        this.pchg = pchg;
    }

    public String getVoturnover() {
        return voturnover;
    }

    public void setVoturnover(String voturnover) {
        this.voturnover = voturnover;
    }

    public String getVaturnover() {
        return vaturnover;
    }

    public void setVaturnover(String vaturnover) {
        this.vaturnover = vaturnover;
    }
}
