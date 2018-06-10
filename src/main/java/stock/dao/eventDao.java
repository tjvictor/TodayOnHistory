package stock.dao;

import stock.model.AlertWord;
import stock.model.Event;

import java.sql.SQLException;
import java.util.List;

public interface eventDao {

    List<AlertWord> getAlertWords() throws SQLException;

    List<Event> getEventsByDate(String date, int pageNumber, int pageSize) throws SQLException;

    int getEventsTotalCountByDate(String date) throws SQLException;

}
