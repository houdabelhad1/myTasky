package com.example.tasky.repository;

import com.example.tasky.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // JpaRepository fournit déjà des méthodes comme findAll(), findById(), save(), delete(), etc.
    // Pas besoin d'ajouter de méthodes ici pour getAllTasks().
}