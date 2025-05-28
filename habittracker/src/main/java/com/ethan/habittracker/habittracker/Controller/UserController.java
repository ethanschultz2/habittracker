package com.ethan.habittracker.habittracker.Controller;

import java.net.ResponseCache;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ethan.habittracker.habittracker.Entities.User;
import com.ethan.habittracker.habittracker.Repository.UserRepository;
import com.ethan.habittracker.habittracker.Response.LoginResponse;
import com.ethan.habittracker.habittracker.Service.JwtService;
import com.ethan.habittracker.habittracker.Service.UserService;
import com.ethan.habittracker.habittracker.dtos.UserDto;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(path = "api")
public class UserController{
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtUtil;
    private final UserService userService;

    @Autowired
    public UserController(UserRepository userRepository, PasswordEncoder encoder, JwtService jwtUtil, UserService userService){
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }
    
    @GetMapping("/users")
    public List<UserDto> getAllUsers(){
        return userRepository.findAll()
        .stream()
        .map(user -> new UserDto(user.getUsername(), user.getisActive(), user.getEmail())).toList();
    }

    @GetMapping("/users/name/{username}")
    public ResponseEntity<UserDto> getUser(@PathVariable String username){
        var user = userRepository.findByUsername(username).orElse(null);
        if(user == null){//RESTful api where return not found if null 
            return ResponseEntity.notFound().build();
        }
        var userDto = new UserDto(user.getUsername(),user.getisActive(), user.getEmail());
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/users/email/{email}")
    public ResponseEntity<UserDto> getEmail(@PathVariable String email){
        var userEmail = userRepository.findByEmail(email).orElse(null);
        if(userEmail == null){
            return ResponseEntity.notFound().build();
        }
        var emailDto = new UserDto(userEmail.getUsername(), userEmail.getisActive(), userEmail.getEmail());
        return ResponseEntity.ok(emailDto);
    }
}
