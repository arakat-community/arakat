package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.model.*;
import io.github.arakat.arakatcommunity.repository.AppRepository;
import io.github.arakat.arakatcommunity.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppService {
    private final AppRepository appRepository;
    private final TaskRepository taskRepository;
    private final IdSequenceService idSequenceService;

    @Autowired
    public AppService(AppRepository appRepository, TaskRepository taskRepository, IdSequenceService idSequenceService) {
        this.appRepository = appRepository;
        this.taskRepository = taskRepository;
        this.idSequenceService = idSequenceService;
    }

    public void saveApp(String appId, List<Task> tasksToSave) {
        App appToSave = new App();

        appToSave.setId(idSequenceService.getNextSequence("App"));
        appToSave.setAppId(appId);
        appToSave.setTasks(tasksToSave);

        appRepository.save(appToSave);
    }

    public List<TablePathResponse> getAllAppsWithWrittenTables() {
        List<App> apps = appRepository.findAll();
        List<TablePathResponse> tablePathResponseList = new ArrayList<>();

        for(App app : apps) {
            TablePathResponse tablePathResponse = new TablePathResponse();
            List<TablePath> tablePathList = new ArrayList<>();

            for(Task task : app.getTasks()) {
                Optional<Task> optionalTask = taskRepository.findById(task.getTaskId());
                optionalTask.ifPresent(t -> tablePathList.addAll(t.getTablePaths()));
            }

            tablePathResponse.setAppId(app.getAppId());
            tablePathResponse.setTablePathList(tablePathList);
            tablePathResponseList.add(tablePathResponse);
        }

        return tablePathResponseList;
    }
}
