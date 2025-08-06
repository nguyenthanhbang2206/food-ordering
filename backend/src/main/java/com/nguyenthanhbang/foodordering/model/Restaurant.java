package com.nguyenthanhbang.foodordering.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "restaurants")
@Where(clause = "active = true")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Restaurant extends BaseEntity{

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
    private User owner;

    @OneToOne
    private Address address;
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Food> foods = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Order> orders = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();
    private int reviewCount;
    private double averageRating;
}
