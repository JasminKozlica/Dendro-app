package com.dendroapp.service;

import com.dendroapp.model.Tree;
import com.dendroapp.repository.TreeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreeService{
    private final TreeRepository repository;
    public TreeService(TreeRepository repository){
        this.repository=repository;
    }

    public Tree save (Tree tree){
      return repository.save(tree);  
    }
    public List<Tree> findAll(){
        return repository.findAll();
    }
   
}