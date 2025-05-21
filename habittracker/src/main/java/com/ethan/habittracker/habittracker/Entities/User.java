package com.ethan.habittracker.habittracker.Entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User implements UserDetails{
    @Id
    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "is_active")
    private boolean isActive;
    //Cascade updates habits if anything from user is changed
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)//if a habit is removed from the habits list and its not linked to an other user it will be deleted
    private List<Habit> habits = new ArrayList<>();

     @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "verification_expiration")
    private LocalDateTime verificationCodeExpiresAt;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean enabled;

    public User(){

    }
    public User(String username, String password, String email,  boolean isActive, List<Habit> habits, boolean enabled){
        this.username = username;
        this.password = password;
        this.email = email;
        this.isActive = isActive;
        this.habits = habits;
        this.enabled = false;
    }

    public String getVerificationCode() {
        return verificationCode;
    }
    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }
    public LocalDateTime getVerificationCodeExpiresAt() {
        return verificationCodeExpiresAt;
    }
    public void setVerificationCodeExpiresAt(LocalDateTime verificationCodeExpiresAt) {
        this.verificationCodeExpiresAt = verificationCodeExpiresAt;
    }
    public boolean isEnabled() {
        return enabled;
    }
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
    public List<Habit> getHabits() {
        return habits;
    }
    public void setHabits(List<Habit> habits) {
        this.habits = habits;
    }
    //Getters and setters 
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public boolean getisActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    
}
