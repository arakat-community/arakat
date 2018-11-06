package io.github.arakat.arakatcommunity.service;

import io.github.arakat.arakatcommunity.model.TablePath;
import io.github.arakat.arakatcommunity.model.Task;
import io.github.arakat.arakatcommunity.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private IdSequenceService idSequenceService;
    private TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, IdSequenceService idSequenceService) {
        this.taskRepository = taskRepository;
        this.idSequenceService = idSequenceService;
    }

    public Task saveAndGetTask(String taskName, List<TablePath> tablesToSave) {
        if (taskAlreadyExists(taskName)) {
            return getTaskByName(taskName);
        }

        Task taskToSave = new Task();

        taskToSave.setTaskId(idSequenceService.getNextSequence("Task"));
        taskToSave.setTaskName(taskName);
        taskToSave.setTablePaths(tablesToSave);
        taskRepository.save(taskToSave);

        return taskToSave;
    }

    private boolean taskAlreadyExists(String taskName) {
        return getTaskByName(taskName) != null;
    }

    private Task getTaskByName(String taskName) {
        return taskRepository.findByTaskName(taskName);
    }
}
