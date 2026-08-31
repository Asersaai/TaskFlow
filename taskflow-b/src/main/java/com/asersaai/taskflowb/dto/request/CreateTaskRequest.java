package com.asersaai.taskflowb.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateTaskRequest(
        @Size(min = 2, max=50)
        @NotBlank
        String title,
        @Size(max = 500)
        @NotBlank
        String description
) {}
