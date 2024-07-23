package com.example.performance_tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.performance_tracker.model.User;
import com.example.performance_tracker.security.JwtResponse;
import com.example.performance_tracker.security.JwtUtil;
import com.example.performance_tracker.service.UserDetailsServiceImpl;
import com.example.performance_tracker.service.UserService;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Optional<User> optionalUser = userService.findByUsername(user.getUsername());

            if (optionalUser.isPresent()) {
                User existingUser = optionalUser.get();
                if (userService.checkPassword(existingUser, user.getPassword())) {
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
                    final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
                    final String jwt = jwtUtil.generateToken(userDetails, existingUser.getName(), existingUser.getSurname(), existingUser.getImage(),existingUser.getAgentid());
                    return ResponseEntity.ok(new JwtResponse(jwt));
                } else {
                    return ResponseEntity.status(401).body("Invalid credentials");
                }
            } else {
                logger.error("User not found: {}", user.getUsername());
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (Exception e) {
            logger.error("Authentication failed for user: {}", user.getUsername(), e);
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
