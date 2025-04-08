package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByRefreshTokenAndEmail(String refreshToken, String email);
    boolean existsByEmail(String email);
}
