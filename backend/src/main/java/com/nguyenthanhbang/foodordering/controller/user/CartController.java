package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.request.CreateCartItemRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateCartItemRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.Cart;
import com.nguyenthanhbang.foodordering.model.CartItem;
import com.nguyenthanhbang.foodordering.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;
    @PostMapping("/cart/cartItems")
    public ResponseEntity<ApiResponse<CartItem>> addCartItemToCart(@Valid @RequestBody CreateCartItemRequest request) {
        CartItem cartItem = cartService.addCartItemToCart(request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("Add cartItem successfully")
                .data(cartItem)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @PutMapping("/cart/cartItems/{cartItemId}")
    public ResponseEntity<ApiResponse<CartItem>> updateQuantityOfCartItem(@PathVariable Long cartItemId,@Valid @RequestBody UpdateCartItemRequest request) {
        CartItem cartItem = cartService.updateQuantityOfCartItem(cartItemId, request.getQuantity());
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Update cartItem successfully")
                .data(cartItem)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @DeleteMapping("/cart/cartItems/{cartItemId}")
    public ResponseEntity<ApiResponse<Void>> deleteCartItem(@PathVariable Long cartItemId) {
        cartService.deleteCartItemFromCart(cartItemId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Delete cartItem successfully")
                .data(null)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @DeleteMapping("/cart")
    public ResponseEntity<ApiResponse<Void>> deleteCart() {
        cartService.deleteCart();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Delete cart successfully")
                .data(null)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping("/cart")
    public ResponseEntity<ApiResponse<Cart>> getCarByUserLogin() {
        Cart cart = cartService.getCartByUserLogin();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get cart successfully")
                .data(cart)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping("/cart/cartItems")
    public ResponseEntity<ApiResponse<List<CartItem>>> getAllCartItems() {
        List<CartItem> cartItems = cartService.getCartItems();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get cart items successfully")
                .data(cartItems)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
