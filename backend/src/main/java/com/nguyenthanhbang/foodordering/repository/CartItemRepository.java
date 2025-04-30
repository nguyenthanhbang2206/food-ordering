package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Cart;
import com.nguyenthanhbang.foodordering.model.CartItem;
import com.nguyenthanhbang.foodordering.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndFood(Cart cart, Food food);
    Optional<CartItem> findByIdAndCartId(Long id, Long cartId);
    List<CartItem> findByCart_Id(Long cartId);
}
