package com.dendroapp.service;

import com.dendroapp.model.ForestDensity;
import com.dendroapp.repository.ForestDensityRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    // New method to get an overview of forest density by location
    public List<ForestDensity> getOverviewByLocation(String location) {
        // You can modify this part based on how you want to aggregate the data
        List<ForestDensity> densities = repository.findByLocationNameOrderByLocationName(location);

        // Example: Aggregate data (tree count, volume) per location
        return densities.stream()
                .collect(Collectors.groupingBy(ForestDensity::getLocationName))
                .values()
                .stream()
                .map(group -> {
                    // Aggregate volume, tree count, etc.
                    double totalVolume = group.stream().mapToDouble(ForestDensity::getVolume).sum();
                    int totalTrees = group.stream().mapToInt(ForestDensity::getTreeCount).sum();
                    String mostCommonSpecies = group.stream()
                            .collect(Collectors.groupingBy(ForestDensity::getSpecies, Collectors.counting()))
                            .entrySet()
                            .stream()
                            .max((entry1, entry2) -> Long.compare(entry1.getValue(), entry2.getValue()))
                            .map(entry -> entry.getKey())
                            .orElse("Unknown");

                    ForestDensity summary = new ForestDensity();
                    summary.setLocationName(location);
                    summary.setTreeCount(totalTrees);
                    summary.setVolume(totalVolume);
                    summary.setSpecies(mostCommonSpecies);  // Most common species
                    return summary;
                })
                .collect(Collectors.toList());
    }
}
