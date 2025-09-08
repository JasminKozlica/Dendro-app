package com.dendroapp.model;

import com.dendroapp.entity.User;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class ForestDensity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String species;
    private double height;
    private double diameter;
    private int treeCount;
    private String locationName;
    private double volume;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by_id")
    private User createdBy;
    private LocalDateTime createdAt;

    public Long getId(){ return id; }
    public void setId(Long id) { this.id = id; }

    public String getSpecies() { return species; }
    public void setSpecies( String species) { this.species = species;}

    public double getHeight() { return height; }
    public void setHeight(double height ) {this.height = height; }

    public double getDiameter() { return diameter; }
    public void setDiameter( double diameter) {this.diameter = diameter; }

    public int getTreeCount(){ return treeCount; }
    public void setTreeCount(int treeCount) {this.treeCount=treeCount;}

    public String getLocationName(){ return locationName;}
    public void setLocationName(String LocationName) {this.locationName=LocationName;}

    public double getVolume() {
        return volume;
    }

    public void setVolume(double volume) {
        this.volume = volume;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}
