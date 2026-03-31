package com.camping.controller;

import com.camping.model.CampingPackage;
import com.camping.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*")
public class PackageController {
    
    @Autowired
    private PackageService packageService;
    
    @GetMapping
    public List<CampingPackage> getAllPackages() {
        return packageService.getAllPackages();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CampingPackage> getPackageById(@PathVariable String id) {
        return ResponseEntity.ok(packageService.getPackageById(id));
    }
    
    @PostMapping
    public ResponseEntity<CampingPackage> createPackage(@RequestBody CampingPackage campingPackage) {
        return new ResponseEntity<>(packageService.createPackage(campingPackage), HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CampingPackage> updatePackage(@PathVariable String id, 
                                                         @RequestBody CampingPackage packageDetails) {
        return ResponseEntity.ok(packageService.updatePackage(id, packageDetails));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable String id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public List<CampingPackage> searchPackages(@RequestParam String location) {
        return packageService.searchByLocation(location);
    }
}
