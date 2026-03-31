package com.camping.service;

import com.camping.model.CampingPackage;
import com.camping.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PackageService {
    
    @Autowired
    private PackageRepository packageRepository;
    
    public List<CampingPackage> getAllPackages() {
        return packageRepository.findAll();
    }
    
    public CampingPackage getPackageById(String id) {
        return packageRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Package not found"));
    }
    
    public CampingPackage createPackage(CampingPackage campingPackage) {
        return packageRepository.save(campingPackage);
    }
    
    public CampingPackage updatePackage(String id, CampingPackage packageDetails) {
        packageDetails.setId(id);
        return packageRepository.save(packageDetails);
    }
    
    public void deletePackage(String id) {
        packageRepository.deleteById(id);
    }
    
    public List<CampingPackage> searchByLocation(String location) {
        return packageRepository.findByLocationContaining(location);
    }
}
