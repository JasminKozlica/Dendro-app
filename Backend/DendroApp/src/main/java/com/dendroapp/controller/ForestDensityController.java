package com.dendroapp.controller;

import com.dendroapp.model.ForestDensity;
import com.dendroapp.service.ForestDensityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController


@CrossOrigin(origins = "*")
public class ForestDensityController {

    private final ForestDensityService densityService;

    public ForestDensityController(ForestDensityService densityService) {
        this.densityService = densityService;
    }

    @PostMapping
    public ForestDensity createDensity(@RequestBody ForestDensity density) {
        return densityService.save(density);
    }

    @GetMapping
    public List<ForestDensity> getAllDensities() {
        return densityService.findAll();
    }

    @GetMapping("/{id}")
    public ForestDensity getDensityById(@PathVariable Long id) {
        return densityService.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteDensity(@PathVariable Long id) {
        densityService.deleteById(id);
    }
}
