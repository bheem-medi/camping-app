package com.camping.controller;

import com.camping.model.User;
import com.camping.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
    
    // Create new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }
    
    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }
    
    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        User user = userService.authenticate(email, password);
        
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("message", "Login successful");
        
        // In production, generate and return JWT token here
        // response.put("token", jwtUtil.generateToken(user.getEmail()));
        
        return ResponseEntity.ok(response);
    }
    
    // Register new user
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        
        Map<String, Object> response = new HashMap<>();
        response.put("user", createdUser);
        response.put("message", "Registration successful");
        
        return ResponseEntity.ok(response);
    }
    
    // Change password
    @PutMapping("/{id}/password")
    public ResponseEntity<Map<String, String>> changePassword(
            @PathVariable String id,
            @RequestBody Map<String, String> passwords) {
        
        userService.changePassword(id, passwords.get("oldPassword"), passwords.get("newPassword"));
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Password changed successfully");
        
        return ResponseEntity.ok(response);
    }
    
    // Get admin users
    @GetMapping("/admins")
    public ResponseEntity<List<User>> getAdmins() {
        return ResponseEntity.ok(userService.getAdminUsers());
    }
    
    // Deactivate user
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateUser(@PathVariable String id) {
        userService.deactivateUser(id);
        return ResponseEntity.ok().build();
    }
    
    // Activate user
    @PutMapping("/{id}/activate")
    public ResponseEntity<Void> activateUser(@PathVariable String id) {
        userService.activateUser(id);
        return ResponseEntity.ok().build();
    }
}
