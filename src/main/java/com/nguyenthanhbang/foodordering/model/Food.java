package com.nguyenthanhbang.foodordering.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "foods")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private long price;
    private boolean available;
    @Column(length = 1000)
    @ElementCollection
    private List<String> images;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    @JsonIgnore
    private Restaurant restaurant;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category foodCategory;
    @ManyToMany
    @JoinTable(name = "food_ingredient",
        joinColumns = @JoinColumn(name = "food_id"), inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private List<Ingredient> ingredients = new ArrayList<>();

}
