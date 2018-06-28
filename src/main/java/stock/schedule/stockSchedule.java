package stock.schedule;

import stock.utils.CommonUtils;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class stockSchedule {

    @Scheduled(cron = "0 0/1 * * * ?") // 每10分钟执行一次
    public void getToken() {
        System.out.println(CommonUtils.getCurrentDateTime());
    }
}
