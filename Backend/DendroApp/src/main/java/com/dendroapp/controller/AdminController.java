package com.dendroapp.controller;

import com.dendroapp.entity.User;
import com.dendroapp.model.RegisterRequest;
import com.dendroapp.repository.UserRepository;
import com.dendroapp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;


    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@Valid @RequestBody RegisterRequest request , BindingResult result) {
        if (result.hasErrors()){
            String errorMessage = result.getAllErrors().get(0).getDefaultMessage();
            return ResponseEntity.badRequest().body(Map.of("message",errorMessage));
        }
          try {
              userService.createUser(request);
              return ResponseEntity.ok(Map.of("message","User created successfully"));
          } catch (IllegalArgumentException e) {
              return ResponseEntity.badRequest().body(Map.of("message",e.getMessage()));
          }
    }

    // ➤ READ all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // ➤ READ single user
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ➤ UPDATE user
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody RegisterRequest request) {
        try {
            userService.updateUser(id, request);
            return ResponseEntity.ok(Map.of("message","User updated successfully"));
        } catch (RuntimeException e){
            return  ResponseEntity.notFound().build();
        }

    }

    // ➤ DELETE user
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message","User delted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}