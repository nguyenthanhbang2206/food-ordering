package com.nguyenthanhbang.foodordering.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;
    private String ward;
    private String district;
    private String city;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
