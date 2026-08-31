package com.asersaai.taskflowb.dto.response;


public record LoginResponse (
        String accessToken,
        String refreshToken
){}
