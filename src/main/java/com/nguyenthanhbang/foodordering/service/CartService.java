package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CreateCartItemRequest;
import com.nguyenthanhbang.foodordering.model.Cart;
import com.nguyenthanhbang.foodordering.model.CartItem;


public interface CartService {
    CartItem addCartItemToCart(CreateCartItemRequest request);
    CartItem updateQuantityOfCartItem(Long cartItemId, int quantity);
    CartItem getCartItemById(Long cartItemId);
    void deleteCartItemFromCart(Long cartItemId);
    long calculateCartPrice(Cart cart);
    Cart getCartById(Long cartId);
    Cart getCartByUserLogin();
    void deleteCart();
}
