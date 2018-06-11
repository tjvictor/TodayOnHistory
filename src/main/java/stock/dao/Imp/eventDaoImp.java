package stock.dao.Imp;

import stock.dao.eventDao;
import stock.model.AlertWord;
import stock.model.Event;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
    public List<Event> getEvents(String date, String title, int pageNumber, int pageSize) throws SQLException {
        List<Event> items = new ArrayList<Event>();

        String limitSql = "";
        String whereSql = "where 1=1 ";
        if(pageNumber != 0 && pageSize != 0)
            limitSql = String.format(" limit %s,%s", (pageNumber-1)*pageSize, pageSize);
        if(StringUtils.isNotEmpty(date)){
            whereSql += String.format(" and Date = '%s' ", date);
        }
        if(StringUtils.isNotEmpty(title)){
            whereSql += String.format(" and Title like '%s' ", title);
        }

        String selectSql = String.format("SELECT Id, Title, Content, Date, Category, Location, StockCode, Tag FROM Event %s order by Date asc %s; ", whereSql, limitSql);

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
    public int getEventsTotalCount(String date, String title) throws SQLException {

        String whereSql = "where 1=1 ";
        if(StringUtils.isNotEmpty(date)){
            whereSql += String.format(" and Date = '%s' ", date);
        }
        if(StringUtils.isNotEmpty(title)){
            whereSql += String.format(" and Title like '%s' ", title);
        }
        String selectSql = String.format("SELECT count(0) FROM Event %s; ", whereSql);

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

    @Override
    public Event getEventById(String eventId) throws SQLException {
        Event item = new Event();
        String selectSql = String.format("SELECT e.Id, e.Title, e.Content, e.CreatorId, e.Date, e.Category, e.Location, e.StockCode, e.Tag, s.Name FROM Event e left join Staff s on e.CreatorId = s.Id where e.Id = '%s'; ", eventId);

        try (Connection connection = DriverManager.getConnection(dbConnectString)) {
            try (Statement stmt = connection.createStatement()) {
                try (ResultSet rs = stmt.executeQuery(selectSql)) {
                    if (rs.next()) {
                        int i = 1;
                        item.setId(rs.getString(i++));
                        item.setTitle(rs.getString(i++));
                        item.setContent(rs.getString(i++));
                        item.setCreatorId(rs.getString(i++));
                        item.setDate(rs.getString(i++));
                        item.setCategory(rs.getString(i++));
                        item.setLocation(rs.getString(i++));
                        item.setStockCode(rs.getString(i++));
                        item.setTag(rs.getString(i++));
                        item.setCreator(rs.getString(i++));
                    }
                }
            }
        }

        return item;
    }

    @Override
    public void addAlertWord(AlertWord item) throws SQLException {
        try (Connection connection = DriverManager.getConnection(dbConnectString)){
            String insertSql = "insert into AlertWord values(?,?);";
            try(PreparedStatement ps = connection.prepareStatement(insertSql)) {
                int i = 1;
                ps.setString(i++, item.getId());
                ps.setString(i++, item.getContent());
                ps.executeUpdate();
            }
        }
    }

    @Override
    public void updateAlertWord(AlertWord item) throws SQLException {
        try (Connection connection = DriverManager.getConnection(dbConnectString)){
            String insertSql = "update AlertWord set Content=? where Id=?;";
            try(PreparedStatement ps = connection.prepareStatement(insertSql)) {
                int i = 1;
                ps.setString(i++, item.getContent());
                ps.setString(i++, item.getId());
                ps.executeUpdate();
            }
        }
    }

    @Override
    public void deleteAlertWord(String id) throws SQLException {
        String deleteSql = String.format("delete from AlertWord where id = '%s'", id);
        delete(deleteSql);
    }

    @Override
    public void addEvent(Event item) throws SQLException {
        try (Connection connection = DriverManager.getConnection(dbConnectString)){
            String insertSql = "insert into Event values(?,?,?,?,?,?,?,?,?);";
            try(PreparedStatement ps = connection.prepareStatement(insertSql)) {
                int i = 1;
                ps.setString(i++, item.getId());
                ps.setString(i++, item.getTitle());
                ps.setString(i++, item.getContent());
                ps.setString(i++, item.getCreatorId());
                ps.setString(i++, item.getDate());
                ps.setString(i++, item.getCategory());
                ps.setString(i++, item.getLocation());
                ps.setString(i++, item.getStockCode());
                ps.setString(i++, item.getTag());
                ps.executeUpdate();
            }
        }
    }

    @Override
    public void updateEvent(Event item) throws SQLException {
        try (Connection connection = DriverManager.getConnection(dbConnectString)){
            String insertSql = "update Event set Title=?, Content=?, CreatorId=?, Date=?, Category=?, Location=?, StockCode=?, Tag=? where Id=?;";
            try(PreparedStatement ps = connection.prepareStatement(insertSql)) {
                int i = 1;
                ps.setString(i++, item.getTitle());
                ps.setString(i++, item.getContent());
                ps.setString(i++, item.getCreatorId());
                ps.setString(i++, item.getDate());
                ps.setString(i++, item.getCategory());
                ps.setString(i++, item.getLocation());
                ps.setString(i++, item.getStockCode());
                ps.setString(i++, item.getTag());
                ps.setString(i++, item.getId());
                ps.executeUpdate();
            }
        }
    }

    @Override
    public void deleteEvent(String id) throws SQLException {
        String deleteSql = String.format("delete from Event where id = '%s'", id);
        delete(deleteSql);
    }
}
