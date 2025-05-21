package com.dendroapp.service;

import com.dendroapp.model.ForestDensity;
import com.dendroapp.repository.ForestDensityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ForestDensityService {
    private final ForestDensityRepository repository;

    public ForestDensityService(ForestDensityRepository repository) {
        this.repository = repository;
    }

    public ForestDensity save(ForestDensity density) {
        return repository.save(density);
    }

    public List<ForestDensity> findAll() {
        return repository.findAll();
    }

    public ForestDensity findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public List<ForestDensity> saveAll(List<ForestDensity> trees) {
        return repository.saveAll(trees);
    }

    public List<ForestDensity> findBySpecies(String species) {
        return repository.findBySpeciesContainingIgnoreCase(species);
    }

    public List<ForestDensity> findByLocation(String location) {
        return repository.findByLocationNameContainingIgnoreCase(location);
    }

    public List<ForestDensity> findBySpeciesAndLocation(String species, String location) {
        return repository.findBySpeciesContainingIgnoreCaseAndLocationNameContainingIgnoreCase(species, location);
    }



    public ForestDensity updateDensity(Long id,ForestDensity updated){
        return repository.findById(id)
                        .map(existing -> {
            existing.setSpecies(updated.getSpecies());
            existing.setHeight(updated.getHeight());
            existing.setDiameter(updated.getDiameter());
            existing.setTreeCount(updated.getTreeCount());
            existing.setLocationName(updated.getLocationName());
            existing.setVolume(updated.getVolume());
            return repository.save(existing);
        })
                .orElseThrow(() -> new RuntimeException("Density record not found with ID: " + id));    }


    public void deleteInput(Long id){
        if (repository.existsById(id)){
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Input record not found with ID: " + id);
        }
    }
}
