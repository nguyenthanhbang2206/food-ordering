package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.ResetPasswordToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResetPasswordTokenRepository extends JpaRepository<ResetPasswordToken, Long> {
    Optional<ResetPasswordToken> findByToken(String token);
}
