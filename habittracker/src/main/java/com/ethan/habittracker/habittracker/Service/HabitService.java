package com.ethan.habittracker.habittracker.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import com.ethan.habittracker.habittracker.Entities.Habit;
import com.ethan.habittracker.habittracker.Repository.HabitRepository;
import com.ethan.habittracker.habittracker.dtos.HabitDto;

import jakarta.transaction.Transactional;

@Component
public class HabitService {
    private final HabitRepository habitRepository;

    public HabitService(HabitRepository habitRepository){
        this.habitRepository = habitRepository;
    }
    // Retrieving all habits of a user.
    public List<HabitDto> getHabits(){
        List<Habit> habits = habitRepository.findAll();
        List<HabitDto> habitsDto = habits.stream()
        .map(habit -> new HabitDto(
         habit.getId(), 
         habit.getName(),
         habit.getDescription(),
         habit.getFrequency(),  
         habit.getDuration(),
         habit.getUser().getUsername()))
         .collect(Collectors.toList());
        return habitsDto;
    }
     // Retrieving a specific habit by ID.
     public Optional<HabitDto> getHabitById(Long id){
         return habitRepository.findById(id)
         .map(habit -> new HabitDto(
            habit.getId(), 
            habit.getName(), 
            habit.getDescription(), 
            habit.getFrequency(), 
            habit.getDuration(),
            habit.getUser().getUsername()));
     }
     // Adding a new habit for a user.
     public Habit addHabit(Habit habit){
        habitRepository.save(habit);
        return habit;
     }
     // Updating a habit.
     public Optional<HabitDto> updateHabit(Habit updatedeHabit){
        Optional<Habit> exisitingHabit = habitRepository.findByName(updatedeHabit.getName());

        if(exisitingHabit.isPresent()){
                Habit habitToUpdate = exisitingHabit.get();
                habitToUpdate.setId(updatedeHabit.getId());
                habitToUpdate.setName(updatedeHabit.getName());
                habitToUpdate.setDescription(updatedeHabit.getDescription());
                habitToUpdate.setFrequency(updatedeHabit.getFrequency());
                habitToUpdate.setDuration(updatedeHabit.getDuration());

                Habit savedHabit = habitRepository.save(habitToUpdate);

            return Optional.of(new HabitDto(
               savedHabit.getId(), 
               savedHabit.getName(), 
               savedHabit.getDescription(), 
               savedHabit.getFrequency(), 
               savedHabit.getDuration(),
               savedHabit.getUser().getUsername()));
        }
        return Optional.empty();//if null return empty
     }
     // Deleting a habit.
     @Transactional
     void deleteHabit(Habit habit){
        habitRepository.delete(habit);
     }
}
