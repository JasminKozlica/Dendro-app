package com.dendroapp.controller;

import com.dendroapp.model.ForestDensity;
import com.dendroapp.service.ForestDensityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/density")

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

    @PostMapping("/bulk")
    public List<ForestDensity> saveAll(@RequestBody List<ForestDensity> trees) {
        return densityService.saveAll(trees);
    }
    @GetMapping("/search")
    public List<ForestDensity> search(
            @RequestParam(required = false) String species,
            @RequestParam(required = false) String location){
        if (species !=null && location !=null){
            return densityService.findBySpeciesAndLocation(species, location);
        } else if (species != null){
            return densityService.findBySpecies(species);
        } else if ( location != null ) {
            return densityService.findByLocation(location);
        } else {
            return densityService.findAll();
        }
    }
}
