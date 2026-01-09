package com.egroupbuy.services;

import com.egroupbuy.dao.GroupBuyEventEndDA;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class ScheduleService {
    private static final Logger log = (Logger) LoggerFactory.getLogger(ScheduleService.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    GroupBuyEventEndDA gbEventEndDA = new GroupBuyEventEndDA();;

//    @Scheduled(fixedRate = 50000)
    @Scheduled(fixedRate = 300000)  // 5 mins
    public void groupBuyEventEndProcess() {
        log.info("The product group buy event end process begin time is {}", dateFormat.format(new Date()));
        gbEventEndDA.productGroupBuyEventEndProcess();
        log.info("The product group buy event end process end time is {}", dateFormat.format(new Date()));

        log.info("The package group buy event end process begin time is {}", dateFormat.format(new Date()));
        gbEventEndDA.packageGroupBuyEventEndProcess();
        log.info("The package group buy event end process end time is {}", dateFormat.format(new Date()));

    }
}
