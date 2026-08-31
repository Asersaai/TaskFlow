package com.asersaai.taskflowb.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @Size(min=3,max = 270)
        @NotBlank
        @Email
        String email,
        @Size(min = 6, max=220)
        @NotBlank
        String password
) {
}
