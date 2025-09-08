package com.dendroapp.controller;

import com.dendroapp.DTO.UpdateProfileRequest;
import com.dendroapp.entity.User;
import com.dendroapp.jwt.JwtUtill;
import com.dendroapp.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasRole( 'USER' ) ")
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtill jwtUtill;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, JwtUtill jwtUtill , PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtill = jwtUtill;
        this.passwordEncoder = passwordEncoder;
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfil(@Valid @RequestBody UpdateProfileRequest request,
                                          @RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }
        String token = authHeader.substring(7);
        String username = jwtUtill.extractUsername(token);
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if(optionalUser.isEmpty()) {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        User user = optionalUser.get();
        user.setFirstname(request.getFirstName());
        user.setLastname(request.getLastname());
        user.setUsername(request.getUsername());

        if(request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));

    }
}
