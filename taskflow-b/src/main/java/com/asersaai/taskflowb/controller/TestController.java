package com.asersaai.taskflowb.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    @GetMapping("/tasks")
    public List<String> getTasks(){

        return List.of(
                "Hello",
                "WTFFF",
                "FKKKK"
        );
    }

}
