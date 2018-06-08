package stock.dao.Imp;

import stock.dao.staffDao;
import stock.model.Staff;

import org.springframework.stereotype.Component;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class staffDaoImp extends BaseDao implements staffDao {
    @Override
    public Staff login(String sid, String password) throws SQLException {
        Staff item = new Staff();

        String selectSql = String.format("SELECT a.Id, a.Sid, a.Password, a.RoleId FROM Staff a where a.Sid = '%s' and a.Password= '%s' ", sid, password);

        try (Connection connection = DriverManager.getConnection(dbConnectString)) {
            try (Statement stmt = connection.createStatement()) {
                try (ResultSet rs = stmt.executeQuery(selectSql)) {
                    if (rs.next()) {
                        int i = 1;
                        item.setId(rs.getString(i++));
                        item.setSid(rs.getString(i++));
                        item.setPassword(rs.getString(i++));
                        item.setRoleId(rs.getString(i++));
                    }
                }
            }
        }

        return item;
    }
}
