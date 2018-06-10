package stock.dao;

import stock.model.Staff;

import java.sql.SQLException;

public interface staffDao {
    Staff login(String sid, String password) throws SQLException;

}
