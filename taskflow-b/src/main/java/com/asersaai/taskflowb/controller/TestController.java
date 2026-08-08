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

    @GetMapping("/task")
    public List<Task> getTasks(){
        return taskService.getAllTasks();
    }

    public record CreateTaskRequest(String title, String description) {}

    @PostMapping("/task")
    public ResponseEntity<Void> saveTask(@RequestBody CreateTaskRequest request){
        taskService.saveTask(request.title(),request.description());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id){
        System.out.println("delete");
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
    public record PathTaskRequest(String title, String description,boolean completed) {}


    @PatchMapping("/task/{id}")
    public ResponseEntity<Void> editTask(@RequestBody PathTaskRequest request, @PathVariable Integer id){
        System.out.println("edit");
        System.out.println(request.title);
        System.out.println(request.description);
        System.out.println(request.completed);
        taskService.updateTask(id,request.title,request.description,request.completed);
        return ResponseEntity.noContent().build();
    }

}
