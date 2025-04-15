package com.dendroapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.dendroapp.model.Tree;
import com.dendroapp.repository.TreeRepository;
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
}
