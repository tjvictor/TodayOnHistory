package stock.bo;

import junit.framework.TestCase;

public class stockDataBoTest extends TestCase {

    public void testDownloadFileFromUrl() {
        stockDataBo sd = new stockDataBo();
        sd.downloadFileFromUrl("600600");
    }
}