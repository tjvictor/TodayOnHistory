package stock.dao.Imp;

import stock.dao.eventDao;

import org.springframework.stereotype.Component;
import stock.model.AlertWord;
import stock.model.Event;
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

    @Override
    public List<Event> getEventsByDate(String date, int pageNumber, int pageSize) throws SQLException {
        List<Event> items = new ArrayList<Event>();

        String limitSql = "";
        if(pageNumber != 0 && pageSize != 0)
            limitSql = String.format(" limit %s,%s", (pageNumber-1)*pageSize, pageSize);
        String selectSql = String.format("SELECT Id, Title, Content, Date, Category, Location, StockCode, Tag FROM Event where Date = '%s' order by Date asc %s; ", date, limitSql);

        try (Connection connection = DriverManager.getConnection(dbConnectString)) {
            try (Statement stmt = connection.createStatement()) {
                try (ResultSet rs = stmt.executeQuery(selectSql)) {
                    while (rs.next()) {
                        int i = 1;
                        Event item = new Event();
                        item.setId(rs.getString(i++));
                        item.setTitle(rs.getString(i++));
                        item.setContent(rs.getString(i++));
                        item.setDate(rs.getString(i++));
                        item.setCategory(rs.getString(i++));
                        item.setLocation(rs.getString(i++));
                        item.setStockCode(rs.getString(i++));
                        item.setTag(rs.getString(i++));
                        items.add(item);
                    }
                }
            }
        }

        return items;
    }

    @Override
    public int getEventsTotalCountByDate(String date) throws SQLException {

        String selectSql = String.format("SELECT count(0) FROM Event where Date = '%s'; ", date);

        try (Connection connection = DriverManager.getConnection(dbConnectString)) {
            try (Statement stmt = connection.createStatement()) {
                try (ResultSet rs = stmt.executeQuery(selectSql)) {
                    if (rs.next()) {
                        return rs.getInt(1);
                    }
                }
            }
        }

        return 0;
    }
}
