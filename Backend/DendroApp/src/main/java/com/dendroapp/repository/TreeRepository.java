package com.dendroapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dendroapp.model.Tree;

public interface TreeRepository extends JpaRepository<Tree, Long> {
}
