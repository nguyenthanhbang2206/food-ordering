package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
