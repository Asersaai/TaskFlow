package com.asersaai.taskflowb.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasswordRequest(
        @Size(min = 6, max=220)
        @NotBlank
        String password
) {
}
