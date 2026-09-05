package com.asersaai.taskflowb.service;

import com.asersaai.taskflowb.dto.request.LoginRequest;
import com.asersaai.taskflowb.dto.request.RegisterRequest;
import com.asersaai.taskflowb.dto.response.LoginResponse;
import com.asersaai.taskflowb.entity.User;
import com.asersaai.taskflowb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
    public User findUser(LoginRequest request) {
        User user = findUserByEmail(request.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        return user;
    }
    public User getCurrentUser(){
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return findUserByEmail(email).orElseThrow();
    }

    public User register(RegisterRequest request){
        if (findUserByEmail(request.email()).isPresent()){
            throw new IllegalStateException("Email already exists");
        }

        String encodePassword=passwordEncoder.encode(request.password());
        User user=new User(request.name(),request.email(),encodePassword);
        return userRepository.save(user);

    }


}
