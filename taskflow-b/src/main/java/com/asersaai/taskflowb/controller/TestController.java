package com.asersaai.taskflowb.controller;

import com.asersaai.taskflowb.entity.Task;
import com.asersaai.taskflowb.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    private final TaskService taskService;

    @Autowired
    public TestController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public List<Task> getTasks(){
        return taskService.getAllTasks();
    }

    public record CreateTaskRequest(String title, String description) {}

    @PostMapping("/task")
    public ResponseEntity<Void> saveTask(@RequestBody CreateTaskRequest request){
        taskService.saveTask(request.title(),request.description());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
