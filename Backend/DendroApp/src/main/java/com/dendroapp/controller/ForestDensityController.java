package com.dendroapp.controller;

import com.dendroapp.DTO.ForestDensityDTO;
import com.dendroapp.entity.User;
import com.dendroapp.model.ForestDensity;
import com.dendroapp.repository.UserRepository;
import com.dendroapp.service.ForestDensityService;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;



@RestController
@RequestMapping("/api/density")
@CrossOrigin(origins = "*")
public class ForestDensityController {

    private final ForestDensityService densityService;
    private final UserRepository userRepository;

    public ForestDensityController(ForestDensityService densityService, UserRepository userRepository) {
        this.densityService = densityService;
        this.userRepository = userRepository;
    }

    // ============================
    // CREATE
    // ============================
    @PostMapping
    public ForestDensityDTO createDensity(@RequestBody ForestDensity density,
                                          @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        density.setCreatedBy(user);
        density.setCreatedAt(LocalDateTime.now());
        ForestDensity saved = densityService.save(density);
        return densityService.toDTO(saved);
    }

    // ============================
    // READ ALL (DTO)
    // ============================
    @GetMapping
    public List<ForestDensityDTO> getAllDensities() {
        return densityService.toDTOList(densityService.findAll());
    }

    // ============================
    // READ BY ID (DTO)
    // ============================
    @GetMapping("/{id}")
    public ResponseEntity<ForestDensityDTO> getDensityById(@PathVariable Long id) {
        ForestDensity density = densityService.findById(id);
        if (density != null) {
            return ResponseEntity.ok(densityService.toDTO(density));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ============================
    // BULK CREATE
    // ============================
    @PostMapping("/bulk")
    public List<ForestDensityDTO> saveAll(@RequestBody List<ForestDensity> trees,
                                          @AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        trees.forEach(tree -> {
            tree.setCreatedBy(user);
            tree.setCreatedAt(LocalDateTime.now());
        });

        List<ForestDensity> saved = densityService.saveAll(trees);
        return densityService.toDTOList(saved);
    }

    // ============================
    // SEARCH
    // ============================
    @GetMapping("/search")
    public List<ForestDensityDTO> search(
            @RequestParam(required = false) String species,
            @RequestParam(required = false) String location) {

        List<ForestDensity> densities;

        if (species != null && location != null) {
            densities = densityService.findBySpeciesAndLocation(species, location);
        } else if (species != null) {
            densities = densityService.findBySpecies(species);
        } else if (location != null) {
            densities = densityService.findByLocation(location);
        } else {
            densities = densityService.findAll();
        }

        return densityService.toDTOList(densities);
    }

    // ============================
    // UPDATE
    // ============================
    @PutMapping("/{id}")
    public ResponseEntity<ForestDensityDTO> updateDensity(@PathVariable Long id,
                                                          @RequestBody ForestDensity updated) {
        try {
            ForestDensity updatedDensity = densityService.updateDensity(id, updated);
            return ResponseEntity.ok(densityService.toDTO(updatedDensity));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ============================
    // DELETE
    // ============================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDensity(@PathVariable Long id) {
        try {
            densityService.deleteInput(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
