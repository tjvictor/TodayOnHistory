package stock.bo;

import junit.framework.TestCase;

import java.io.IOException;

public class stockDataBoTest extends TestCase {

    public void testDownloadFileFromUrl() throws IOException {
        stockDataBo sd = new stockDataBo();
        sd.downloadFileFromUrl("600600");
    }
}