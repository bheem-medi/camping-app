package com.camping.repository;

import com.camping.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    
    // Find user by email (for login)
    Optional<User> findByEmail(String email);
    
    // Check if email already exists
    boolean existsByEmail(String email);
    
    // Find users by role
    List<User> findByRole(String role);
    
    // Find active users
    List<User> findByActiveTrue();
    
    // Search users by name
    @Query("{ 'firstName': { $regex: ?0, $options: 'i' } }")
    List<User> searchByFirstName(String firstName);
    
    // Find users who haven't logged in recently
    List<User> findByLastLoginBefore(LocalDateTime date);
}
