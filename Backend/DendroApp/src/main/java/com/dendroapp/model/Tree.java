package com.dendroapp.model;

import jakarta.persistence.*;

@Entity
public class Tree {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String species; 
    private double height;  
    private double diameter;
    //private double totalVolume;
    
    // Getter  , setter

    //public double getTotalVolume() { return totalVolume;}
    //public void setTotalVolume(double totalVolume) { this.totalVolume = totalVolume;}

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getSpecies() { 
        return species; 
    }
    public void setSpecies(String species) { 
        this.species = species; 
    }

    public double getHeight() { 
        return height; 
    }
    public void setHeight(double height) { 
        this.height = height; 
    }

    public double getDiameter() { 
        return diameter; 
    }
    public void setDiameter(double diameter) { 
        this.diameter = diameter; 
    }
}

