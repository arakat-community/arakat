package io.github.arakat.arakatcommunity.job;

import io.github.arakat.arakatcommunity.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;
import org.quartz.JobExecutionContext;

import java.io.IOException;

@Component
public class DAGStatsCheckerJob extends QuartzJobBean {

    @Autowired
    private StatsService statsService;

    @Override
    public void executeInternal(JobExecutionContext jobExecutionContext) {
        try {
            System.err.println(statsService.getDAGStatsFromAirflow("1"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
