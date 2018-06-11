package stock.dao;

import stock.model.AlertWord;
import stock.model.Event;

import java.sql.SQLException;
import java.util.List;

public interface eventDao {

    List<AlertWord> getAlertWords() throws SQLException;

    List<Event> getEvents(String date, String title, int pageNumber, int pageSize) throws SQLException;

    int getEventsTotalCount(String date, String title) throws SQLException;

    Event getEventById(String eventId) throws SQLException;

    void addAlertWord(AlertWord item) throws SQLException;

    void updateAlertWord(AlertWord item) throws SQLException;

    void deleteAlertWord(String id) throws SQLException;

    void addEvent(Event item) throws SQLException;

    void updateEvent(Event item) throws SQLException;

    void deleteEvent(String id) throws SQLException;
}
