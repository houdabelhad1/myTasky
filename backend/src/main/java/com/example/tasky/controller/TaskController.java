package com.example.tasky.controller;

import com.example.tasky.entity.Task;
import com.example.tasky.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tasks") // Chemin de base pour toutes les requêtes de ce contrôleur
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;

    // Injection de dépendance via le constructeur
    
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * Gère les requêtes GET à /api/tasks pour récupérer toutes les tâches.
     * @return Une ResponseEntity contenant la liste des tâches et le statut HTTP OK (200).
     */
    @GetMapping // Mappe cette méthode aux requêtes GET sur /api/tasks
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/task/{id}")
    public Task getTaskId(@PathVariable Long id){
        return taskService.getTaskById(id);
    }


    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task){
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}") // Mappe cette méthode aux requêtes PUT sur /api/tasks/{id}
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(id, taskDetails);
        if (updatedTask != null) {
            // Retourne la tâche mise à jour avec un statut HTTP 200 (OK)
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } else {
            // Si la tâche n'existe pas pour la mise à jour, retourne 404 (Not Found)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}") // Mappe cette méthode aux requêtes DELETE sur /api/tasks/{id}
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        boolean deleted = taskService.deleteTask(id);
        if (deleted) {
            // Statut HTTP 204 No Content : La requête a été traitée avec succès et il n'y a pas de contenu à retourner.
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // Statut HTTP 404 Not Found : La ressource à supprimer n'existe pas.
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}