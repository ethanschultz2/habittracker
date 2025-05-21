package com.ethan.habittracker.habittracker.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ethan.habittracker.habittracker.Entities.Habit;


public interface HabitRepository extends JpaRepository<Habit, Long>{
    Optional<Habit>findById(Long Id);
    Optional<Habit>findByName(String name);
    List<Habit>findByUserUsername(String username);
    void deleteByName(String name);
}
