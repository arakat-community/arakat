package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.model.*;
import io.github.arakat.arakatcommunity.model.response.AppResponse;
import io.github.arakat.arakatcommunity.model.response.TablePathResponse;
import io.github.arakat.arakatcommunity.repository.AppRepository;
import io.github.arakat.arakatcommunity.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppService {
    private final AppRepository appRepository;
    private final TaskRepository taskRepository;
    private final IdSequenceService idSequenceService;
    private final StatsService statsService;

    @Autowired
    public AppService(AppRepository appRepository, TaskRepository taskRepository, IdSequenceService idSequenceService,
                      StatsService statsService) {
        this.appRepository = appRepository;
        this.taskRepository = taskRepository;
        this.idSequenceService = idSequenceService;
        this.statsService = statsService;
    }

    public List<AppResponse> getAllAppResponses() throws IOException {
        List<App> apps = appRepository.findAll();
        List<AppResponse> appResponses = new ArrayList<>();

        for (App app : apps) {
            AppResponse appResponse = new AppResponse();
            List<Task> tasks = app.getTasks();

            for (Task task : tasks) {
                task.setTaskName(task.getTaskName().split("-")[0]);
            }

            appResponse.setApp(app);
            appResponse.setDagStats(statsService.getDAGStatsFromAirflow(app.getAppId()));
            appResponses.add(appResponse);
        }

        return appResponses;
    }

    public void saveApp(String appId, List<Task> tasksToSave) {
        if (appAlreadyExists(appId)) {
            return;
        }

        App appToSave = new App();

        appToSave.setId(idSequenceService.getNextSequence("App"));
        appToSave.setAppId(appId);
        appToSave.setTasks(tasksToSave);

        appRepository.save(appToSave);
    }

    public List<TablePathResponse> getAllAppsWithWrittenTables() {
        List<App> apps = appRepository.findAll();
        List<TablePathResponse> tablePathResponseList = new ArrayList<>();

        for (App app : apps) {
            TablePathResponse tablePathResponse = new TablePathResponse();
            List<TablePath> tablePathList = new ArrayList<>();

            for (Task task : app.getTasks()) {
                Optional<Task> optionalTask = taskRepository.findById(task.getTaskId());
                optionalTask.ifPresent(t -> tablePathList.addAll(t.getTablePaths()));
            }

            tablePathResponse.setAppId(app.getAppId());
            tablePathResponse.setTablePathList(tablePathList);
            tablePathResponseList.add(tablePathResponse);
        }

        return tablePathResponseList;
    }

    private boolean appAlreadyExists(String appId) {
        return appRepository.findByAppId(appId) != null;
    }
}
