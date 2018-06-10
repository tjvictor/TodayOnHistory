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
import java.sql.SQLException;
import java.util.List;

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

    @RequestMapping(value = "/getEventsByDate", method = RequestMethod.GET)
    public ResponseObject getEventsByDate(@RequestParam(value = "date", defaultValue = "", required = false) String date,
                                          @RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
                                          @RequestParam(value = "pageSize", defaultValue = "0", required = false) int pageSize) {

        try {
            List<Event> items = eventDaoImp.getEventsByDate(date, pageNumber, pageSize);
            return new ResponseObject("ok", "查询成功", items);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }

    @RequestMapping(value = "/getEventsTotalCountByDate", method = RequestMethod.GET)
    public ResponseObject getEventsTotalCountByDate(@RequestParam(value = "date") String date) {

        try {
            int totalCount = eventDaoImp.getEventsTotalCountByDate(date);
            return new ResponseObject("ok", "查询成功", totalCount);
        } catch (SQLException e) {
            logger.error(e.getMessage(), e);
            return new ResponseObject("error", "系统错误，请联系系统管理员");
        }
    }


}
