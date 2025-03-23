package com.nguyenthanhbang.foodordering.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "orderitems")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int quantity;
    private long totalPrice;
    @ManyToOne
    private Food food;
    @ManyToOne
    private Order order;
}
