package stock.bo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.io.IOException;
import java.sql.SQLException;

@RunWith(SpringRunner.class)
@SpringBootTest
public class stockDataBoTest {

    @Autowired
    private stockDataBo sd;

    @Test
    public void testDownloadFileFromUrl() throws IOException, SQLException {
        sd.downloadFileFromUrl("600600");
    }
}