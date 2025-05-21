package com.ethan.habittracker.habittracker.Entities;


import java.time.Duration;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    @Column(name = "duration")
    private Duration duration;

    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "username")
    private User user;

    public Habit(){

    }
    public Habit(Long id, String name, String description, int frequency, Duration duration){
        this.id = id;
        this.name = name;
        this.description = description;
        this.frequency = frequency;
        this.duration = duration;
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
    public Duration getDuration() {
        return duration;
    }
    public void setDuration(Duration duration) {
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
