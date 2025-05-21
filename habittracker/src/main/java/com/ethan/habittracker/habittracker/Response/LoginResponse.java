package com.ethan.habittracker.habittracker.Response;

import com.ethan.habittracker.habittracker.dtos.UserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;
    private long expiresIn;

    public LoginResponse(String token, long expiresIn) {
        this.token = token;
        this.expiresIn = expiresIn;
    }
}

