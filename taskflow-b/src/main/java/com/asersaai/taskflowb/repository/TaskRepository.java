package com.asersaai.taskflowb.repository;

import com.asersaai.taskflowb.dto.response.TaskResponse;
import com.asersaai.taskflowb.entity.Task;
import com.asersaai.taskflowb.entity.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {

    Page<TaskResponse> findTasksByUser(User user, Pageable pageable);

}
