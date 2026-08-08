package com.asersaai.taskflowb.service;

import com.asersaai.taskflowb.entity.Task;
import com.asersaai.taskflowb.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
        return taskRepository.findAllByOrderByIdAsc();
    }

    public void saveTask(String title,String description){
        taskRepository.save(new Task(title,description));
    }

    public void deleteTask(Integer id){
        taskRepository.deleteById(id);
    }

    @Transactional
    public void updateTask(Integer id, String title, String description,boolean completed) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        if(!(title==null)&&!(description==null)){
            task.setTitle(title);
            task.setDescription(description);
        }else{
            task.setCompleted(completed);
    }
    }

}
