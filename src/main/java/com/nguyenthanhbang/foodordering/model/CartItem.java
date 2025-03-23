package com.nguyenthanhbang.foodordering.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cartitems")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private long totalPrice;

    @ManyToOne
    private Cart cart;

    @ManyToOne
    private Food food;
}
