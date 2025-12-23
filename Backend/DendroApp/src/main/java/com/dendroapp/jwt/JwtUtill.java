package com.dendroapp.jwt;

import com.dendroapp.entity.User;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Signature;
import java.util.Date;

@Component
public class JwtUtill {

    private final SecretKey secretKey;

    // Trajanje tokena
    private final long ACCESS_TOKEN_EXPIRATION = 1000L * 60 * 60; // 1 sat
    private final long REFRESH_TOKEN_EXPIRATION = 1000L * 60 * 60 * 24 * 7; // 7 dana

    public JwtUtill(@Value("${jwt.secret}") String secret) {
        this.secretKey = io.jsonwebtoken.security.Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Generiši Access token
    public String generateAccessToken(User user) {
        return generateToken(user, ACCESS_TOKEN_EXPIRATION);
    }

    // Generiši Refresh token
    public String generateRefreshToken(User user) {
        return generateToken(user, REFRESH_TOKEN_EXPIRATION);
    }

    private String generateToken(User user, long expirationMillis) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    // Izvuci username iz tokena
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Validacija tokena (ako je istekao -> false)
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            return false; // token je istekao
        } catch (Exception e) {
            return false; // nevažeći token
        }
    }
}