package com.nguyenthanhbang.foodordering.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nguyenthanhbang.foodordering.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Where(clause = "active = true")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Order extends BaseEntity{

    @Enumerated(EnumType.STRING)
    private OrderStatus status;
    private int totalItems;
    private long totalPrice;
    @ManyToOne
    private User customer;
    @ManyToOne
    private Address deliveryAddress;

    @ManyToOne
    @JsonIgnore
    private Restaurant restaurant;
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();
}
