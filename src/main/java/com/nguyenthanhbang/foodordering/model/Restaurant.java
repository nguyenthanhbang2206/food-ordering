package com.nguyenthanhbang.foodordering.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "restaurants")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String openingHours;
    private boolean open;
    @Embedded
    private ContactInformation contactInformation;
    @Column(length = 1000)
    @ElementCollection
    private List<String> images;

    @OneToOne
    @JsonIgnore
    private User owner;

    @OneToOne
    private Address address;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Food> foods = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Order> orders = new ArrayList<>();
}
