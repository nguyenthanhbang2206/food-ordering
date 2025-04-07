package com.nguyenthanhbang.foodordering.controller.admin;

import com.nguyenthanhbang.foodordering.dto.request.UpdateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.Order;
import com.nguyenthanhbang.foodordering.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminOrderController {
    private final OrderService orderService;
    @GetMapping("/restaurants/orders")
    public ResponseEntity<ApiResponse<List<Order>>> getOrdersByRestaurant() throws Exception {
        List<Order> orders = orderService.getAllOrdersByRestaurant();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get orders by restaurant successfully")
                .data(orders)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @PutMapping("/restaurants/orders/{orderId}")
    public ResponseEntity<ApiResponse<Order>> updateOrder(@PathVariable Long orderId, @RequestBody UpdateOrderRequest request) throws Exception {
        Order order = orderService.updateOrder(orderId,request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Update order successfully")
                .data(order)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }

}
