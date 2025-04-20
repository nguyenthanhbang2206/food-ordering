package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.InvalidToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvalidTokenRepository extends JpaRepository<InvalidToken, String> {
    boolean existsByToken(String token);
}
