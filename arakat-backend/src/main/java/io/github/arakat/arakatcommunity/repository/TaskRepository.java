package io.github.arakat.arakatcommunity.repository;

import io.github.arakat.arakatcommunity.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends MongoRepository<Task, Long> {

    Task findByTaskId(Long id);
    Task findByTaskName(String taskName);
}
