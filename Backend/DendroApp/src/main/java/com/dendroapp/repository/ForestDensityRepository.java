package com.dendroapp.repository;

import com.dendroapp.model.ForestDensity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ForestDensityRepository extends JpaRepository<ForestDensity, Long> {
    List<ForestDensity> findBySpeciesContainingIgnoreCase(String species);
    List<ForestDensity> findByLocationNameContainingIgnoreCase(String location);
    List<ForestDensity> findBySpeciesContainingIgnoreCaseAndLocationNameContainingIgnoreCase(String species, String location);
    List<ForestDensity> findByLocationNameOrderByLocationName(String location);
}
