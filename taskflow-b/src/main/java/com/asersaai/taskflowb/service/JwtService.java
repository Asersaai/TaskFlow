package com.asersaai.taskflowb.service;

import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Date;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

@Service
public class JwtService {

    private static final long  ACCESS_TOKEN_EX=15 * 60 * 1000;
    private static final long REFRESH_TOKEN_EX=7 * 24 * 60 * 60 * 1000;
    private final SecretKey secretKey;

    public JwtService(@Value("${jwt.secret}") String secret){
        this.secretKey=Keys.
                hmacShaKeyFor
                        (
                                secret.getBytes
                                        (
                                StandardCharsets.UTF_8
                        ));
    }

    public String generateToken(String email){
        Date now = new Date();
        return Jwts.builder()
                .subject(email)
                .claim("tokenType","ACCESS")
                .issuedAt(now)
                .expiration(new Date(now.getTime() + ACCESS_TOKEN_EX))
                .signWith(secretKey)
                .compact();
    }
    public String generateRefreshToken(String email){
        Date now=new Date();
        return Jwts.builder()
                .subject(email)
                .claim("tokenType","REFRESH")
                .issuedAt(now)
                .expiration(new Date(now.getTime()+REFRESH_TOKEN_EX))
                .signWith(secretKey)
                .compact();
    }
    public String extractEmail(String token){
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload().getSubject();
    }

    public String extractTokenType(String token){
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("tokenType", String.class);
    }


}
