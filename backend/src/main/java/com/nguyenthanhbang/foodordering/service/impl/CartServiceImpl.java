package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.CreateCartItemRequest;
import com.nguyenthanhbang.foodordering.model.Cart;
import com.nguyenthanhbang.foodordering.model.CartItem;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.CartItemRepository;
import com.nguyenthanhbang.foodordering.repository.CartRepository;
import com.nguyenthanhbang.foodordering.service.CartService;
import com.nguyenthanhbang.foodordering.service.FoodService;
import com.nguyenthanhbang.foodordering.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserService userService;
    private final FoodService foodService;
    @Override
    public CartItem addCartItemToCart(CreateCartItemRequest request) {
        User user = userService.getUserLogin();
        Optional<Cart> opt = cartRepository.findByCustomerId(user.getId());
        Food food = foodService.getFoodById(request.getFoodId());
        Cart cart;
        if(opt.isPresent()) {
            cart = opt.get();
        }else {
            cart = new Cart();
            cart.setSum(0);
            cart.setCustomer(user);
        }
        cartRepository.save(cart);
        CartItem cartItem;
        Optional<CartItem> cartItemOptional = cartItemRepository.findByCartAndFood(cart, food);
        if(cartItemOptional.isPresent()) {
           cartItem = cartItemOptional.get();
           cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
           cartItem.setTotalPrice(cartItem.getTotalPrice() + request.getQuantity() * food.getPrice());
        }else {
            cart.setSum(cart.getSum() + 1);
            cartItem = new CartItem();
            cartItem.setQuantity(request.getQuantity());
            cartItem.setFood(food);
            cart = cartRepository.save(cart);
            cartItem.setCart(cart);
            cartItem.setTotalPrice(request.getQuantity() * food.getPrice());
        }
        cartItem = cartItemRepository.save(cartItem);
        return cartItem;
    }

    @Override
    public CartItem updateQuantityOfCartItem(Long cartItemId, int quantity) {
        CartItem cartItem = this.getCartItemById(cartItemId);
        Food food = cartItem.getFood();
        if(food != null) {
            cartItem.setQuantity(quantity);
            cartItem.setTotalPrice(cartItem.getQuantity() * food.getPrice());
        }else {
            throw new EntityNotFoundException("Food not found");
        }
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem getCartItemById(Long cartItemId) {
        Cart cart = this.getCartByUserLogin();
        if(cart == null) {
            throw new EntityNotFoundException("Cart is empty");
        }
        CartItem cartItem = cartItemRepository.findByIdAndCartId(cartItemId, cart.getId()).orElseThrow(() -> new EntityNotFoundException("Cart item not found"));
        return cartItem;
    }

    @Override
    public void deleteCartItemFromCart(Long cartItemId) {
        Cart cart = this.getCartByUserLogin();
        if(cart == null){
            throw new EntityNotFoundException("Cart not found");
        }
        CartItem cartItem = this.getCartItemById(cartItemId);
        cart.getCartItems().remove(cartItem);
        cart.setSum(cart.getSum() - 1);
        cart.setTotalPrice(calculateCartPrice(cart));
        cartRepository.save(cart);
    }

    @Override
    public long calculateCartPrice(Cart cart) {
        if(cart == null) {
            throw new EntityNotFoundException("Cart not found");
        }
        long totalPrice = 0;
        for(CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getTotalPrice();
        }
        return totalPrice;
    }

    @Override
    public Cart getCartById(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new EntityNotFoundException("Cart not found"));
        return cart;
    }

    @Override
    public Cart getCartByUserLogin() {
        User user = userService.getUserLogin();
        Cart cart = cartRepository.findByCustomerId(user.getId()).orElse(null);
        if(cart != null){
            cart.setTotalPrice(calculateCartPrice(cart));
        }
        else{
            return null;
        }
        cart = cartRepository.save(cart);
        return cart;
    }

    @Override
    public void deleteCart() {
        Cart cart = this.getCartByUserLogin();
        if(cart == null) {
            throw new EntityNotFoundException("Cart not found");
        }
        cartRepository.delete(cart);
    }


}
