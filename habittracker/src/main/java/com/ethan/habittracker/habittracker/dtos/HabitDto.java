package com.ethan.habittracker.habittracker.dtos;

import java.time.Duration;

public class HabitDto {
    private Long id;
    private String name;
    private String description;
    private int frequency;

    private Duration duration;

    private String username;

    public HabitDto(){

    }

    public HabitDto(Long id, String name, String description, int frequency, Duration duration, String username) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.frequency = frequency;
        this.duration = duration;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
}
