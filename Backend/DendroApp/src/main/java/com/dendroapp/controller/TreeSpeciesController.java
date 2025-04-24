package com.dendroapp.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/species")
public class TreeSpeciesController {
    @GetMapping("/top")
    public List<Map<String, Object>> getTopTreeSpecies(){
        return List.of(
             Map.of("species", "Bukva", "description", "Visokokvalitetno drvo, tvrdo, često korišteno za ogrjev."),
            Map.of("species", "Hrast", "description", "Izuzetno čvrsto drvo, koristi se u gradnji i namještaju."),
            Map.of("species", "Jela", "description", "Meko drvo, često se koristi za građu."),
            Map.of("species", "Smreka", "description", "Slično jeli, često se koristi za papir."),
            Map.of("species", "Kesten", "description", "Otporno drvo, koristi se i za prehranu."),
            Map.of("species", "Javor", "description", "Dekorativno i korisno za instrumente."),
            Map.of("species", "Topola", "description", "Lagano drvo, brzo raste."),
            Map.of("species", "Bor", "description", "Meko drvo, široka upotreba."),
            Map.of("species", "Grab", "description", "Tvrdo i teško drvo, koristi se za ogrjev i alatne drške."),
                Map.of("species", "Bjela breza", "description", "Lijepo dekorativno drvo, koristi se za furnir i ogrjev."),
            Map.of("species", "Vrba", "description", "Fleksibilno drvo, koristi se za košare.")
        );
    }
}