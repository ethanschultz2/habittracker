package com.ethan.habittracker.habittracker.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.ethan.habittracker.habittracker.Entities.Habit;

import jakarta.transaction.Transactional;


public interface HabitRepository extends JpaRepository<Habit, Long>{
    Optional<Habit>findById(Long Id);
    Optional<Habit>findByName(String name);
    Optional<Habit> findByNameAndUser_Email(String name, String email);
    List<Habit> findByUser_Username(String username);
    List<Habit> findByUser_Email(String email);

    @Modifying
    @Transactional
    void deleteByName(String name);
}
