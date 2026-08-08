package com.asersaai.taskflowb.repository;

import com.asersaai.taskflowb.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {


    List<Task> findAllByOrderByIdAsc();
}
