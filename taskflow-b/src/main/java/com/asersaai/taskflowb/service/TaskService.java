package com.asersaai.taskflowb.service;

import com.asersaai.taskflowb.entity.Task;
import com.asersaai.taskflowb.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskDao;

    @Autowired
    public TaskService(TaskRepository taskDao) {
        this.taskDao = taskDao;
    }

    public List<Task> getAllTasks(){
        return taskDao.findAll();
    }
}
