package com.asersaai.taskflowb.dto.request;

import jakarta.validation.constraints.Size;

public record UpdateTaskRequest(
    @Size(min = 2, max=50)
    String title,

    @Size(max = 500)
    String description,

    Boolean completed
) { }