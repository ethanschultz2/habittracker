package com.ethan.habittracker.habittracker.Controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ethan.habittracker.habittracker.Entities.Habit;
import com.ethan.habittracker.habittracker.Entities.User;
import com.ethan.habittracker.habittracker.Repository.HabitRepository;
import com.ethan.habittracker.habittracker.Repository.UserRepository;
import com.ethan.habittracker.habittracker.dtos.HabitDto;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(path = "api/habit")
public class HabitController {
    private final HabitRepository habitRepository;
    private final UserRepository userRepository;

    @Autowired
    public HabitController(HabitRepository habitRepository, UserRepository userRepository){
        this.habitRepository = habitRepository;
        this.userRepository = userRepository;
    }
    // Retrieving all habits of a user.
    @GetMapping("/user/{username}/habits")
    public List<HabitDto> getAllHabits(@PathVariable String username){
        return habitRepository.findByUserUsername(username)
        .stream()
        .map(habit -> new HabitDto(
            habit.getId(), 
            habit.getName(),
            habit.getDescription(), 
            habit.getFrequency(), 
            habit.getDuration(),
            habit.getUser().getUsername()))
            .toList();
    }
 
    //toDO Retrieving a specific habit by ID.

    // Adding a new habit for a user.
    @PostMapping("/create")
    public ResponseEntity<HabitDto> createHabit(@RequestBody HabitDto habitDto){
        Optional<User> userOptional = userRepository.findByUsername(habitDto.getUsername());

        System.out.println("=== HABIT CREATION REQUEST ===");
        System.out.println("Received HabitDto: " + habitDto);
        System.out.println("Username: " + habitDto.getUsername());
        System.out.println("Name: " + habitDto.getName());
        System.out.println("Description: " + habitDto.getDescription());
        System.out.println("Frequency: " + habitDto.getFrequency());
        System.out.println("Duration: " + habitDto.getDuration());


        if(userOptional.isEmpty()){
            return ResponseEntity.badRequest().body(new HabitDto());
        }

        User user = userOptional.get();

        Habit habit = new Habit();
            // habit.setId(habitDto.getId());
            habit.setName(habitDto.getName());
            habit.setDescription(habitDto.getDescription());
            habit.setFrequency(habitDto.getFrequency());
            habit.setDuration(habitDto.getDuration());
            habit.setUser(user);

        Habit savedHabit = habitRepository.save(habit);

        HabitDto responsDto = new HabitDto(
            savedHabit.getId(), 
            savedHabit.getName(), 
            savedHabit.getDescription(), 
            savedHabit.getFrequency(), 
            savedHabit.getDuration(), 
            user.getUsername());

        System.out.println("Returning response: " + responsDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responsDto);
    }
    //toDo PutmappingUpdating a habit.

    //toDo DeleteMappingDeleting a habit.
}
