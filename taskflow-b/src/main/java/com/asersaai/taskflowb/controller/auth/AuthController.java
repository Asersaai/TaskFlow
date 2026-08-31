package com.asersaai.taskflowb.controller.auth;

import com.asersaai.taskflowb.dto.request.LoginRequest;
import com.asersaai.taskflowb.dto.request.RegisterRequest;
import com.asersaai.taskflowb.dto.response.LoginResponse;
import com.asersaai.taskflowb.dto.request.RefreshTokenRequest;
import com.asersaai.taskflowb.entity.User;
import com.asersaai.taskflowb.service.JwtService;
import com.asersaai.taskflowb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;

    @Autowired
    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public LoginResponse register(@RequestBody RegisterRequest request){
        User user=userService.register(request);
        return new LoginResponse(jwtService.generateToken(user.getEmail()), jwtService.generateRefreshToken(user.getEmail()));

    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        User user=userService.findUser(request);
        return new LoginResponse(jwtService.generateToken(user.getEmail()), jwtService.generateRefreshToken(user.getEmail()));
    }
    @PostMapping("/refresh")
    public LoginResponse refresh(@RequestBody RefreshTokenRequest refresh){
        String tokenType=jwtService.extractTokenType(refresh.refreshToken());

        if(!"REFRESH".equals(tokenType)){
            throw new RuntimeException("поддельный токен");
        }

        String email=jwtService.extractEmail(refresh.refreshToken());

       return new LoginResponse(jwtService.generateToken(email), /*jwtService.generateRefreshToken(email)*/ refresh.refreshToken());
    }




}
