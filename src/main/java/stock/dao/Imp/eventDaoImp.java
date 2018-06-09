package stock.dao.Imp;

import stock.dao.eventDao;

import org.springframework.stereotype.Component;
import stock.model.AlertWord;
import stock.model.Staff;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class eventDaoImp extends BaseDao implements eventDao {
    @Override
    public List<AlertWord> getAlertWords() throws SQLException {
        List<AlertWord> items = new ArrayList<AlertWord>();

        String selectSql = String.format("SELECT Id, Content FROM AlertWord;");

        try (Connection connection = DriverManager.getConnection(dbConnectString)) {
            try (Statement stmt = connection.createStatement()) {
                try (ResultSet rs = stmt.executeQuery(selectSql)) {
                    while (rs.next()) {
                        int i = 1;
                        AlertWord item = new AlertWord();
                        item.setId(rs.getString(i++));
                        item.setContent(rs.getString(i++));
                        items.add(item);
                    }
                }
            }
        }

        return items;
    }
}
