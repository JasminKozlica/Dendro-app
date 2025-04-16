package com.dendroapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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
}
