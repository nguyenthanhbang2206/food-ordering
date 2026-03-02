package com.nguyenthanhbang.foodordering.model;

import com.nguyenthanhbang.foodordering.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;
    @ElementCollection
    @CollectionTable(name = "payment_orders", joinColumns = @JoinColumn(name = "payment_id"))
    @Column(name = "order_id")
    private List<Long> orderIds;
    private Long amount;
    private String method;
    private String transactionNo;
    private LocalDateTime createdAt;
}
