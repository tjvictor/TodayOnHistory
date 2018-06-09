package stock.dao;

import stock.model.AlertWord;

import java.sql.SQLException;
import java.util.List;

public interface eventDao {

    List<AlertWord> getAlertWords() throws SQLException;

}
