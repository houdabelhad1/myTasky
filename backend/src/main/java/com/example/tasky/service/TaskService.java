package com.example.tasky.service;

import com.example.tasky.entity.Task;
import com.example.tasky.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    // Injection de dépendance via le constructeur (recommandée)l

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Récupère toutes les tâches de la base de données.
     * @return Une liste de toutes les tâches.
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll(); // Utilise la méthode findAll() du JpaRepository
    }

    public Task getTaskById(Long taskId){
        return taskRepository.findById(taskId).orElse(null);
    }

    public Task createTask(Task task){
        return taskRepository.save(task);
    }

    public Task updateTask(Long id , Task taskDetails){
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()){
            Task existingTask = optionalTask.get();
            existingTask.setTitle(taskDetails.getTitle());
            existingTask.setDescription(taskDetails.getDescription());
            existingTask.setCompleted(taskDetails.isCompleted());
            return taskRepository.save(existingTask);
        }
        else{
            return null;
        }
    }
    public boolean deleteTask(Long id) {
        //Vérifier si la tâche existe avant de tenter de la supprimer
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id); //la méthode deleteById() du JpaRepository
            return true; // Indique que la suppression a réussi
        }
        return false; // Indique que la tâche n'a pas été trouvée
    }
}
