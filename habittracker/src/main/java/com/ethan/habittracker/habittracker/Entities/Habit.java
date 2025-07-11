package com.ethan.habittracker.habittracker.Entities;


import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Habit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private int frequency;
    private LocalTime startTime;
    
    @Column(name = "duration")
    private String duration;

    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "username")
    private User user;

    @ElementCollection
    @CollectionTable(name = "habit_scheduled_days", joinColumns = @JoinColumn(name = "habit_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week")
    private Set<DayOfWeek> scheduledDays = new HashSet<>();

    public Habit(){

    }
    public Habit(Long id, String name, String description, int frequency, String duration, LocalTime startTime, Set<DayOfWeek> scheduledDays) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.frequency = frequency;
        this.duration = duration;
        this.startTime = startTime;
        this.scheduledDays = scheduledDays;
    }
    public Set<DayOfWeek> getScheduledDays() {
        return scheduledDays;
    }
    public void setScheduledDays(Set<DayOfWeek> scheduledDays) {
        this.scheduledDays = scheduledDays;
    }
    public LocalTime getStartTime() {
        return startTime;
    }
    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public int getFrequency() {
        return frequency;
    }
    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }
    public String getDuration() {
        return duration;
    }
    public void setDuration(String duration) {
        this.duration = duration;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
        
}
