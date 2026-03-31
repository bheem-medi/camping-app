package com.camping.repository;

import com.camping.model.CampingPackage;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PackageRepository extends MongoRepository<CampingPackage, String> {
    List<CampingPackage> findByLocationContaining(String location);
}
