package com.asersaai.taskflowb.service;

import com.asersaai.taskflowb.entity.Task;
import com.asersaai.taskflowb.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    public void saveTask(String title,String description){
        taskRepository.save(new Task(title,description));
    }
}
