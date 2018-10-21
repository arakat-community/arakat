package io.github.arakat.arakatcommunity.controller;

import io.github.arakat.arakatcommunity.config.AppPropertyValues;
import io.github.arakat.arakatcommunity.job.DAGStatsCheckerJob;
import io.github.arakat.arakatcommunity.service.StatsService;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
public class StatsController {

    private StatsService statsService;
    private Scheduler scheduler;
    private AppPropertyValues appPropertyValues;

    @Autowired
    public StatsController(StatsService statsService, Scheduler scheduler, AppPropertyValues appPropertyValues) {
        this.statsService = statsService;
        this.scheduler = scheduler;
        this.appPropertyValues = appPropertyValues;
    }

    @RequestMapping(value = "/get-dag-stats-from-airflow/{dagId}", method = RequestMethod.GET)
    public ResponseEntity<String> getDagStats(@PathVariable("dagId") String dagId) throws IOException {

        return new ResponseEntity<>(statsService.getDAGStatsFromAirflow(dagId).toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/get-dag-logs-from-airflow/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<String> getTaskStats(@PathVariable("taskId") String taskId) throws IOException {

        return new ResponseEntity<>(statsService.getTaskStatsFromAirflow(taskId).toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/get-task-logs-from-airflow/{dagId}/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<Map<String, String>> getTaskLogs(@PathVariable("dagId") String dagId,
                                           @PathVariable("taskId") String taskId) throws IOException {

        return new ResponseEntity<>(statsService.getDagLogsFromAirflow(dagId, taskId), HttpStatus.OK);
    }

    // TODO: decide how to send periodically send status info.
    @RequestMapping(value = "/set-periodic-dag-stats-checker", method = RequestMethod.GET)
    public void setPeriodicDAGStatsChecker() throws SchedulerException {
        JobDetail jobDetail = createJobDetail("dag-stat-jobs", "Get DAG Stats Job");
        Trigger trigger = createTrigger(jobDetail, "dag-stat-triggers", "Get DAG Stats Trigger");

        scheduler.scheduleJob(jobDetail, trigger);
    }

    @RequestMapping(value = "/set-periodic-task-stats-checker", method = RequestMethod.GET)
    public void setPeriodicTaskStatsChecker() throws SchedulerException {
        JobDetail jobDetail = createJobDetail("task-stat-jobs", "Get task Stats Job");
        Trigger trigger = createTrigger(jobDetail, "task-stat-triggers", "Get task Stats Trigger");

        scheduler.scheduleJob(jobDetail, trigger);
    }

    private JobDetail createJobDetail(String group, String description) {
        return JobBuilder.newJob(DAGStatsCheckerJob.class)
                .withIdentity(UUID.randomUUID().toString(), group)
                .withDescription(description)
                .storeDurably()
                .build();
    }

    private Trigger createTrigger(JobDetail jobDetail, String group, String description) {
        return TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity(jobDetail.getKey().getName(), group)
                .startNow()
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInSeconds(Integer.parseInt(appPropertyValues.getQuartzJobIntervalInSeconds()))
                        .repeatForever())
                .withDescription(description)
                .build();
    }
}
