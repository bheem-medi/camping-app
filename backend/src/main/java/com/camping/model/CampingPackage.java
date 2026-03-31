package com.camping.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "packages")
public class CampingPackage {
    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private int duration;
    private String location;
    private double latitude;
    private double longitude;
    private List<String> images;
    private List<String> availableDates;
}
