package com.nguyenthanhbang.foodordering.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "orderitems")
@Where(clause = "active = true")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OrderItem extends BaseEntity{

    private int quantity;
    private long totalPrice;
    @ManyToOne
    private Food food;
    @ManyToOne
    @JsonIgnore
    private Order order;
}
