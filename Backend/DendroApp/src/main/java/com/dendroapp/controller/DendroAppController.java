package com.dendroapp.controller;

import com.dendroapp.service.TreeService;

import org.springframework.web.bind.annotation.*;
import com.dendroapp.model.Tree;

import java.util.List;

@RestController
@RequestMapping("/api/trees")
@CrossOrigin(origins="*")
public class DendroAppController {

    private final TreeService service;
    
    public DendroAppController(TreeService service) {
        this.service = service;
    }
   
    @PostMapping
    public Tree createTree(@RequestBody Tree tree){
        return service.save(tree);
    }
    @GetMapping 
    public List<Tree> getAllTrees(){
        return service.findAll();
    }
@GetMapping
    public String test(){
        return "Backend radi";
}
}

