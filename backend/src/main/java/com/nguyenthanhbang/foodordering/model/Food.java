package com.nguyenthanhbang.foodordering.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "foods")
@Where(clause = "active = true")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Food extends BaseEntity{
    private long sold = 0;
    private String name;
    private String description;
    private long price;
    private boolean available;
    private String cuisine;
    private boolean vegetarian;
    private boolean spicy;
    @Column(length = 1000)
    @ElementCollection
    private List<String> images;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
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
