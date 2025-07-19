package com.example.tasky.service;

import com.example.tasky.entity.Task;
import com.example.tasky.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    private TaskRepository taskRepository;
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        taskRepository = mock(TaskRepository.class);
        taskService = new TaskService(taskRepository);
    }

    @Test
    void testGetAllTasks() {
        Task task1 = Task.builder().taskId(1L).title("Task 1").description("Desc 1").completed(false).build();
        Task task2 = Task.builder().taskId(2L).title("Task 2").description("Desc 2").completed(true).build();
        when(taskRepository.findAll()).thenReturn(Arrays.asList(task1, task2));

        List<Task> tasks = taskService.getAllTasks();

        assertEquals(2, tasks.size());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testGetTaskById_Found() {
        Task task = Task.builder().taskId(1L).title("Task").build();
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        Task result = taskService.getTaskById(1L);

        assertNotNull(result);
        assertEquals("Task", result.getTitle());
        verify(taskRepository, times(1)).findById(1L);
    }

    @Test
    void testGetTaskById_NotFound() {
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        Task result = taskService.getTaskById(1L);

        assertNull(result);
    }

    @Test
    void testCreateTask() {
        Task task = Task.builder().title("New Task").build();
        when(taskRepository.save(task)).thenReturn(task);

        Task created = taskService.createTask(task);

        assertEquals("New Task", created.getTitle());
        verify(taskRepository, times(1)).save(task);
    }

    @Test
    void testUpdateTask_Found() {
        Task existingTask = Task.builder().taskId(1L).title("Old").description("Old desc").completed(false).build();
        Task newDetails = Task.builder().title("New").description("New desc").completed(true).build();

        when(taskRepository.findById(1L)).thenReturn(Optional.of(existingTask));
        when(taskRepository.save(ArgumentMatchers.any(Task.class))).thenReturn(existingTask);

        Task updated = taskService.updateTask(1L, newDetails);

        assertNotNull(updated);
        assertEquals("New", updated.getTitle());
        assertTrue(updated.isCompleted());
    }

    @Test
    void testUpdateTask_NotFound() {
        Task newDetails = Task.builder().title("New").build();
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        Task result = taskService.updateTask(1L, newDetails);

        assertNull(result);
    }

    @Test
    void testDeleteTask_Found() {
        when(taskRepository.existsById(1L)).thenReturn(true);
        doNothing().when(taskRepository).deleteById(1L);

        boolean deleted = taskService.deleteTask(1L);

        assertTrue(deleted);
        verify(taskRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteTask_NotFound() {
        when(taskRepository.existsById(1L)).thenReturn(false);

        boolean deleted = taskService.deleteTask(1L);

        assertFalse(deleted);
        verify(taskRepository, never()).deleteById(1L);
    }
}
