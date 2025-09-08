package com.dendroapp.service;

import com.dendroapp.entity.User;
import com.dendroapp.repository.UserRepository;
import com.dendroapp.model.*;
import com.dendroapp.jwt.JwtUtill;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtill jwtUtil;
    private final AuthenticationManager authManager;
    

    public AuthResponse authenticate(AuthRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword())
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);

        return new AuthResponse(accessToken, refreshToken);
    }
}
