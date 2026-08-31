package com.asersaai.taskflowb.dto.response;

public record TaskResponse(
        Integer id,
        String title,
        String description,
        Boolean completed
) {
}
