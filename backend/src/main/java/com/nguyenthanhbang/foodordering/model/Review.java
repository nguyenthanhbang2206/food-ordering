package com.nguyenthanhbang.foodordering.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "reviews")
@Where(clause = "active = true")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review extends BaseEntity{

    @ManyToOne
    private Restaurant restaurant;

    @ManyToOne
    private User user;
    private int rating;
}
