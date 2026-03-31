package com.camping.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDateTime;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String email;
    
    private String password;
    private String firstName;
    private String lastName;
    private String phone;
    private String role; // "ADMIN" or "USER"
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    
    // Constructor for new users
    public User() {
        this.active = true;
        this.createdAt = LocalDateTime.now();
        this.role = "USER";
    }
    
    // Helper method to check if admin
    public boolean isAdmin() {
        return "ADMIN".equals(this.role);
    }
}
