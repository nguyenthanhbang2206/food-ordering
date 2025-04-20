package com.nguyenthanhbang.foodordering.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nguyenthanhbang.foodordering.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    private int totalItems;
    private long totalPrice;
    @ManyToOne
    @JsonIgnore
    private User customer;
    @ManyToOne
    private Address deliveryAddress;

    @ManyToOne
    @JsonIgnore
    private Restaurant restaurant;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();
}
