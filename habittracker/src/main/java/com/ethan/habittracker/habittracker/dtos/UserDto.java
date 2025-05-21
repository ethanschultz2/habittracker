package com.ethan.habittracker.habittracker.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserDto {
    public String username;
    public boolean is_active;
    public String email;
}
