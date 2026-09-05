package com.asersaai.taskflowb.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(
        @Size(min = 3,max = 100)
        String name,
        @Size(min=3,max = 270)
        @Email
        String email
) {
}
