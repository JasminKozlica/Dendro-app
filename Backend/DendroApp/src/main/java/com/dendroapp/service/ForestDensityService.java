package com.dendroapp.service;

import com.dendroapp.DTO.ForestDensityDTO;
import com.dendroapp.DTO.RegisterRequest;
import com.dendroapp.model.ForestDensity;
import com.dendroapp.repository.ForestDensityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



@Service
public class ForestDensityService {

    private final ForestDensityRepository repository;


    public ForestDensityService(ForestDensityRepository repository) {
        this.repository = repository;
    }

    // ============================
    // CRUD metode
    // ============================
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

    public ForestDensity updateDensity(Long id, ForestDensity updated) {
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
                .orElseThrow(() -> new RuntimeException("Density record not found with ID: " + id));
    }

    public void deleteInput(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Input record not found with ID: " + id);
        }
    }

    // ============================
    // DTO metode
    // ============================
    public ForestDensityDTO toDTO(ForestDensity fd) {
        ForestDensityDTO dto = new ForestDensityDTO();
        dto.setId(fd.getId());
        dto.setSpecies(fd.getSpecies());
        dto.setHeight(fd.getHeight());
        dto.setDiameter(fd.getDiameter());
        dto.setTreeCount(fd.getTreeCount());
        dto.setLocationName(fd.getLocationName());
        dto.setVolume(fd.getVolume());
        dto.setCreatedAt(fd.getCreatedAt());

        if (fd.getCreatedBy() != null) {
            dto.setCreatedByName(fd.getCreatedBy().getFirstname() + " " + fd.getCreatedBy().getLastname());
        } else {
            dto.setCreatedByName("N/A");
        }

        return dto;
    }

    public List<ForestDensityDTO> toDTOList(List<ForestDensity> densities) {
        return densities.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}

