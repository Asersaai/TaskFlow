package com.asersaai.taskflowb.dto.response;

public record UserResponse(
        String name,
        String email,
        Long quantityTasks,
        Long completedTasks,
        Long notcompletedTasks
) {
}
