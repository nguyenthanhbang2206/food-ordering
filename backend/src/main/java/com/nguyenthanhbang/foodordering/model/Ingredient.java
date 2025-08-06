package com.nguyenthanhbang.foodordering.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ingredients")
@Where(clause = "active = true")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Ingredient extends BaseEntity{

    private String name;

    @ManyToMany(mappedBy = "ingredients")
    @JsonIgnore
    private List<Food> foods = new ArrayList<>();

    @ManyToOne
    @JsonIgnore
    private Restaurant restaurant;
}
