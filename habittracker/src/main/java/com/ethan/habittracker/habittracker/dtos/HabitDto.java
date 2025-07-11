package com.ethan.habittracker.habittracker.dtos;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Set;

public class HabitDto {
    private Long id;
    private String name;
    private String description;
    private int frequency;
    private String duration;
    private String username;
    private LocalTime startTime;
    private Set<DayOfWeek> scheduledDays;
    private String status;

    public HabitDto(){

    }

    public HabitDto(Long id, String name, String description, int frequency, String duration, String username, LocalTime startTime, Set<DayOfWeek> scheduledDays, String status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.frequency = frequency;
        this.duration = duration;
        this.startTime = startTime;
        this.scheduledDays = scheduledDays;
        this.username = username;
        this.status = status;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
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

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}
