package com.dendroapp.controller;

import com.dendroapp.model.AuthRequest;
import com.dendroapp.model.AuthResponse;
import com.dendroapp.model.RegisterRequest;
import lombok.RequiredArgsConstructor;


import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.web.bind.annotation.*;
import com.dendroapp.service.AuthService;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return authService.authenticate(request);
    }


}
