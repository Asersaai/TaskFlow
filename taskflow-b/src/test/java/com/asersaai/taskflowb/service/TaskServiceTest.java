package com.asersaai.taskflowb.service;
import com.asersaai.taskflowb.entity.Task;
import com.asersaai.taskflowb.entity.User;
import com.asersaai.taskflowb.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import jakarta.persistence.EntityNotFoundException;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {


    @Mock
    private TaskRepository taskRepository;

    @Mock
    private UserService userService;

    private TaskService taskService;

    @BeforeEach
    void setUp() {
        taskService = new TaskService(taskRepository, userService);
    }

    @Test
    void deleteTaskShouldRejectTaskOwnedByAnotherUser() {
        User user=new User();
        user.setId(1);
        User owner=new User();
        owner.setId(2);
        Task task=new Task();
        task.setId(1);
        task.setUser(owner);

        when(taskRepository.findById(1)).thenReturn(Optional.of(task));
        when(userService.getCurrentUser()).thenReturn(user);

        assertThrows(EntityNotFoundException.class,
                () -> taskService.deleteTask(1)
        );


        verify(taskRepository,
                never()).deleteById(1);

    }

    @Test
    void deleteTaskShouldThrowWhenTaskDoesNotExist(){

        when(taskRepository.findById(10)).thenReturn(Optional.empty());


        assertThrows(EntityNotFoundException.class,
        () -> taskService.deleteTask(10));

        verify(taskRepository,never()).deleteById(10);
    }
    @Test
    void updateTaskShouldRejectTaskOwnedByAnotherUser(){
        User user=new User();
        User owner=new User();
        user.setId(1);
        owner.setId(2);
        Task task=new Task();
        task.setId(1);
        task.setUser(owner);
        task.setTitle("Wake up");
        task.setDescription("at 8:00");
        task.setCompleted(true);

        when(userService.getCurrentUser()).thenReturn(user);
        when(taskRepository.findById(1)).thenReturn(Optional.of(task));


        assertThrows(EntityNotFoundException.class,
                () -> taskService.updateTask(task.getId(),"Go to sleep","at 21:30",false)
        );
       assertEquals("Wake up",task.getTitle());
       assertEquals("at 8:00",task.getDescription());
       assertTrue(task.isCompleted());
    }

    @Test
    void updateTaskShouldUpdateOnlyProvidedFieldsForOwner(){
        User owner=new User();
        owner.setId(1);
        Task task=new Task();
        task.setId(1);
        task.setUser(owner);
        task.setTitle("Waki Up");
        task.setDescription("at 7:00");
        task.setCompleted(false);
        String title="Wake up";
        boolean completed=true;

        when(userService.getCurrentUser()).thenReturn(owner);
        when(taskRepository.findById(1)).thenReturn(Optional.of(task));

        taskService.updateTask(task.getId(),title,null,completed);

        assertEquals(title,task.getTitle());
        assertEquals("at 7:00",task.getDescription());
        assertTrue(task.isCompleted());


    }

    @Test
    void deleteTaskShouldDeleteTaskOwnedByCurrentUser(){
        User owner=new User();
        owner.setId(1);
        Task task=new Task();
        task.setId(1);
        task.setUser(owner);

        when(userService.getCurrentUser()).thenReturn(owner);
        when(taskRepository.findById(1)).thenReturn(Optional.of(task));

        taskService.deleteTask(1);

        verify(taskRepository).deleteById(1);

    }

    @Test
    void updateTaskShouldThrowWhenTaskDoesNotExist(){

        assertThrows(EntityNotFoundException.class,
                () -> taskService.updateTask(99,null,null,true));

        verify(userService,never()).getCurrentUser();

    }





}
