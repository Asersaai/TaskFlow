package com.asersaai.taskflowb.service;

import com.asersaai.taskflowb.dto.request.LoginRequest;
import com.asersaai.taskflowb.dto.request.PasswordRequest;
import com.asersaai.taskflowb.dto.request.RegisterRequest;
import com.asersaai.taskflowb.dto.request.UpdateUserRequest;
import com.asersaai.taskflowb.dto.response.UserResponse;
import com.asersaai.taskflowb.entity.Task;
import com.asersaai.taskflowb.entity.User;
import com.asersaai.taskflowb.repository.UserRepository;
import jakarta.transaction.Transactional;
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

    @Transactional
    public void userDelete(){
        userRepository.delete(getCurrentUser());
    }

    @Transactional
    public User userUpdateNameOrEmail(UpdateUserRequest request){
        User user=getCurrentUser();
        String email=request.email();
        String name=request.name();
        if(email != null && !email.equals(user.getEmail())){
            if (findUserByEmail(email).isPresent()) {
                throw new IllegalStateException("Email already exists");
            }
            user.setEmail(email);
        }
        if (name != null){
            user.setName(name);
        }
        return user;
    }

    @Transactional
    public void updatePassword(PasswordRequest request){
        User user=getCurrentUser();
        String password=request.password();
        if(password != null){
            String encodePassword=passwordEncoder.encode(password);
            user.setPassword(encodePassword);
        }
    }

    public UserResponse getUserInfo(){
        User user=getCurrentUser();
        return new UserResponse(
                user.getName(),
                user.getEmail(),
                (long) user.getTasks().size(),
                user.getTasks()
                        .stream()
                        .filter(Task::isCompleted)
                        .count(),
                user.getTasks()
                        .stream()
                        .filter(task -> !task.isCompleted())
                        .count());
    }


}
