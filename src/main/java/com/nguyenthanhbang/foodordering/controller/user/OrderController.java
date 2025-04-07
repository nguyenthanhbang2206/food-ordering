package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.request.CreateCartItemRequest;
import com.nguyenthanhbang.foodordering.dto.request.CreateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.CartItem;
import com.nguyenthanhbang.foodordering.model.Order;
import com.nguyenthanhbang.foodordering.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    @PostMapping("/orders")
    public ResponseEntity<ApiResponse<Order>> placeOrder(@RequestBody CreateOrderRequest request) {
        Order order = orderService.createOrder(request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("Create order successfully")
                .data(order)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @GetMapping("/orders")
    public ResponseEntity<ApiResponse<List<Order>>> getOrderHistory() {
        List<Order> orders = orderService.getAllOrdersByUserLogin();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get order history successfully")
                .data(orders)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @GetMapping("/orders/{orderId}")
    public ResponseEntity<ApiResponse<Order>> getOrderById(@PathVariable Long orderId) {
        Order order = orderService.getOrderByIdAndUserId(orderId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get order successfully")
                .data(order)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
