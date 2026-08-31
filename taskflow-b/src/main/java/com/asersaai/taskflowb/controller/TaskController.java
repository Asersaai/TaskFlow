package com.asersaai.taskflowb.controller;

import com.asersaai.taskflowb.dto.request.CreateTaskRequest;
import com.asersaai.taskflowb.dto.response.AccessToken;
import com.asersaai.taskflowb.dto.response.TaskResponse;
import com.asersaai.taskflowb.dto.request.UpdateTaskRequest;
import com.asersaai.taskflowb.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {


    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }


    @GetMapping("/task")
    public List<TaskResponse> getTasks(){
        return taskService.getTasks();
    }



    @PostMapping("/task")
    public ResponseEntity<Void> saveTask(@Valid @RequestBody CreateTaskRequest request){
        taskService.saveTask(request.title(),request.description());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id){
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }


    @PatchMapping("/task/{id}")
    public ResponseEntity<Void> editTask(@Valid @RequestBody UpdateTaskRequest request, @PathVariable Integer id){
        taskService.updateTask(id,request.title(),request.description(),request.completed());
        return ResponseEntity.noContent().build();
    }

}
