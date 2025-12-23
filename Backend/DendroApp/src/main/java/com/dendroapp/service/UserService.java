package com.dendroapp.service;

import com.dendroapp.entity.User;
import com.dendroapp.model.RegisterRequest;
import com.dendroapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    // CREATE
    public void createUser(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = User.builder()
                .username(request.getUsername())
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER") // admin uvijek pravi USER account
                .build();

        userRepository.save(user);
    }

    // READ all
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // READ single
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // UPDATE
    public  void updateUser(Long id, RegisterRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        user.setUsername(request.getUsername());
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
          userRepository.save(user);

    }

    // DELETE
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with ID: " + id);
        }
        userRepository.deleteById(id);
    }
}