package com.asersaai.taskflowb.controller;

import com.asersaai.taskflowb.dto.request.PasswordRequest;
import com.asersaai.taskflowb.dto.request.UpdateUserRequest;
import com.asersaai.taskflowb.dto.response.LoginResponse;
import com.asersaai.taskflowb.dto.response.UserResponse;
import com.asersaai.taskflowb.entity.User;
import com.asersaai.taskflowb.service.JwtService;
import com.asersaai.taskflowb.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/account")
    public UserResponse userInfo(){
        return userService.getUserInfo();
    }

    @Autowired
    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @DeleteMapping("/account")
    public ResponseEntity<Void> userDelete(){
        userService.userDelete();
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/account")
    public LoginResponse userUpdateNameOrEmail(@Valid @RequestBody UpdateUserRequest updateUserRequest){
        User user = userService.userUpdateNameOrEmail(updateUserRequest);
        return new LoginResponse(
                jwtService.generateToken(user.getEmail()),
                jwtService.generateRefreshToken(user.getEmail())
        );
    }

    @PostMapping("/account")
    public void updatePassword(@Valid @RequestBody PasswordRequest passwordRequest){
        userService.updatePassword(passwordRequest);
    }

}
