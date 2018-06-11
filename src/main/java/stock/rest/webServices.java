package stock.rest;

import stock.dao.eventDao;
import stock.dao.staffDao;
import stock.model.AlertWord;
import stock.model.Event;
import stock.model.ResponseObject;
import stock.model.Staff;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.ws.rs.FormParam;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/websiteService")
public class webServices {
    //region private
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${file.MappingPath}")
    private String fileMappingPath;

    @Value("${file.MappingUrl}")
    private String fileMappingUrl;

    @Value("${image.MappingPath}")
    private String imageMappingPath;

    @Value("${image.MappingUrl}")
    private String imageMappingUrl;

    @Value("${audio.MappingPath}")
    private String audioMappingPath;

    @Value("${audio.MappingUrl}")
    private String audioMappingUrl;

    @Value("${video.MappingPath}")
    private String videoMappingPath;

    @Value("${video.MappingUrl}")
    private String videoMappingUrl;

    @Autowired
    private staffDao staffDaoImp;

    @Autowired
    private eventDao eventDaoImp;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ResponseObject login(@RequestParam(value = "sid") String sid,
                                @RequestParam(value = "password") String password) {

        try {
            Staff item = staffDaoImp.login(sid, password);
            if (org.apache.commons.lang3.StringUtils.isNotEmpty(item.getSid())) {

                return new ResponseObject("ok", "登录成功", item);
            }
            else
                return new ResponseObject("error", "用户不存在或密码错误!", "");
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/getAlertWords", method = RequestMethod.GET)
    public ResponseObject getAlertWords() {

        try {
            List<AlertWord> items = eventDaoImp.getAlertWords();
            return new ResponseObject("ok", "查询成功", items);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/getEvents", method = RequestMethod.GET)
    public ResponseObject getEvents(@RequestParam(value = "date", defaultValue = "", required = false) String date,
                                    @RequestParam(value = "title", defaultValue = "", required = false) String title,
                                    @RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
                                     @RequestParam(value = "pageSize", defaultValue = "0", required = false) int pageSize) {

        try {
            List<Event> items = eventDaoImp.getEvents(date, title, pageNumber, pageSize);
            return new ResponseObject("ok", "查询成功", items);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/getEventsTotalCount", method = RequestMethod.GET)
    public ResponseObject getEventsTotalCount(@RequestParam(value = "date", defaultValue = "", required = false) String date,
                                              @RequestParam(value = "title", defaultValue = "", required = false) String title) {

        try {
            int totalCount = eventDaoImp.getEventsTotalCount(date, title);
            return new ResponseObject("ok", "查询成功", totalCount);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/getEventById", method = RequestMethod.GET)
    public ResponseObject getEventById(@RequestParam(value = "eventId") String eventId) {

        try {
            Event item = eventDaoImp.getEventById(eventId);
            return new ResponseObject("ok", "查询成功", item);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/addAlertWord", method = RequestMethod.POST)
    public ResponseObject addAlertWord(@FormParam("content") String content) {

        AlertWord item = new AlertWord();
        String id = UUID.randomUUID().toString();
        item.setId(id);
        item.setContent(content);

        try {
            eventDaoImp.addAlertWord(item);
            return new ResponseObject("ok", "新增成功", item);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/updateAlertWord", method = RequestMethod.POST)
    public ResponseObject updateAlertWord(@FormParam("id") String id, @FormParam("content") String content) {


        AlertWord item = new AlertWord();
        item.setId(id);
        item.setContent(content);

        try {
            eventDaoImp.updateAlertWord(item);
            return new ResponseObject("ok", "修改成功", item);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/deleteAlertWord", method = RequestMethod.GET)
    public ResponseObject deleteAlertWord(@RequestParam("id") String id) {

        try {
            eventDaoImp.deleteAlertWord(id);
            return new ResponseObject("ok", "删除成功", id);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/addEvent", method = RequestMethod.POST)
    public ResponseObject addEvent(@FormParam("title") String title, @FormParam("content") String content,
                                   @FormParam("creatorId") String creatorId, @FormParam("date") String date,
                                   @FormParam("category") String category, @FormParam("location") String location,
                                   @FormParam("stockCode") String stockCode, @FormParam("tag") String tag) {

        Event item = new Event();
        String id = UUID.randomUUID().toString();
        item.setId(id);
        item.setTitle(title);
        item.setContent(content);
        item.setCreatorId(creatorId);
        item.setDate(date);
        item.setCategory(category);
        item.setLocation(location);
        item.setStockCode(stockCode);
        item.setTag(tag);

        try {
            eventDaoImp.addEvent(item);
            return new ResponseObject("ok", "新增成功", item);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/updateEvent", method = RequestMethod.POST)
    public ResponseObject updateEvent(@FormParam("id") String id,
                                      @FormParam("title") String title, @FormParam("content") String content,
                                      @FormParam("creatorId") String creatorId, @FormParam("date") String date,
                                      @FormParam("category") String category, @FormParam("location") String location,
                                      @FormParam("stockCode") String stockCode, @FormParam("tag") String tag) {


        Event item = new Event();
        item.setId(id);
        item.setTitle(title);
        item.setContent(content);
        item.setCreatorId(creatorId);
        item.setDate(date);
        item.setCategory(category);
        item.setLocation(location);
        item.setStockCode(stockCode);
        item.setTag(tag);

        try {
            eventDaoImp.updateEvent(item);
            return new ResponseObject("ok", "修改成功", item);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/deleteEvent", method = RequestMethod.GET)
    public ResponseObject deleteEvent(@RequestParam("id") String id) {

        try {
            eventDaoImp.deleteEvent(id);
            return new ResponseObject("ok", "删除成功", id);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }
}
