package com.asersaai.taskflowb.service;

import com.asersaai.taskflowb.dto.response.TaskResponse;
import com.asersaai.taskflowb.entity.Task;
import com.asersaai.taskflowb.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserService userService;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userService = userService;

    }

    public List<TaskResponse> getTasks( ){

        return taskRepository.findTasksByUserOrderByIdAsc(userService.getCurrentUser());
    }

    public void saveTask(String title,String description){

        taskRepository.save(new Task(title,description,userService.getCurrentUser()));
    }

    public void deleteTask(Integer id){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        if(!task.getUser().getId().equals(userService.getCurrentUser().getId())){
            throw new EntityNotFoundException("Task not found");
        }
        taskRepository.deleteById(id);

    }

    @Transactional
    public void updateTask(Integer id, String title, String description,Boolean completed) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        if(!task.getUser().getId().equals(userService.getCurrentUser().getId())){
            throw new EntityNotFoundException("Task not found");}
        if (title != null) {
            task.setTitle(title);
        }
        if (description != null) {
            task.setDescription(description);
        }
        if (completed != null) {
            task.setCompleted(completed);

        }
    }

}
