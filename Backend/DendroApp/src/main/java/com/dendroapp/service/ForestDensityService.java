package com.dendroapp.service;

import com.dendroapp.model.ForestDensity;
import com.dendroapp.repository.ForestDensityRepository;

import java.util.List;

public class ForestDensityService {
    private final ForestDensityRepository repository;

    public ForestDensityService(ForestDensityRepository repository){
        this.repository = repository;
    }
    public ForestDensity save( ForestDensity density){
        return repository.save(density);
    }

    public List<ForestDensity> findAll(){
        return repository.findAll();
    }

    public ForestDensity findById(Long id){
        return repository.findById(id).orElse(null);
    }
    public void deleteById(Long id){
        repository.deleteById(id);
    }
}
