package com.ethan.habittracker.habittracker.Controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.ethan.habittracker.habittracker.Service.JwtService;
import com.ethan.habittracker.habittracker.dtos.HabitDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

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
    // Retrieving all habits of a username
    @GetMapping("/user/{username}/habits")
    public List<HabitDto> getAllHabits(@PathVariable String username){
        return habitRepository.findByUser_Username(username)
        .stream()
        .map(habit -> new HabitDto(
            habit.getId(), 
            habit.getName(),
            habit.getDescription(), 
            habit.getFrequency(), 
            habit.getDuration(),
            habit.getUser().getUsername(),
            habit.getStartTime(),
            habit.getScheduledDays())
        ).toList();
    }
 
    //toDO Retrieving a specific habit by ID.

    // Adding a new habit for a user.
    @PostMapping("/create")
    public ResponseEntity<HabitDto> createHabit(@RequestBody HabitDto habitDto){
        Optional<User> userOptional = userRepository.findByUsername(habitDto.getUsername());


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
            habit.setStartTime(habitDto.getStartTime());
            habit.setScheduledDays(habitDto.getScheduledDays());

        Habit savedHabit = habitRepository.save(habit);

        HabitDto responsDto = new HabitDto(
            savedHabit.getId(), 
            savedHabit.getName(), 
            savedHabit.getDescription(), 
            savedHabit.getFrequency(), 
            savedHabit.getDuration(), 
            user.getUsername(),
            savedHabit.getStartTime(),
            savedHabit.getScheduledDays());

        System.out.println("Returning response: " + responsDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responsDto);
    }
    //toDo Putmapping Updating a habit.

    //toDo DeleteMappingDeleting a habit.
    @DeleteMapping("/delete/{id}")
    @Transactional  // Add this annotation
    public ResponseEntity<Void> deleteHabit(@PathVariable Long id){
        Optional<Habit> habit = habitRepository.findById(id);
        if(habit.isPresent()){
            this.habitRepository.delete(habit.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
