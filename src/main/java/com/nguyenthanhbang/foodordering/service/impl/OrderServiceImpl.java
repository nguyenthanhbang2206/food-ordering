package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.CreateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.enums.OrderStatus;
import com.nguyenthanhbang.foodordering.model.*;
import com.nguyenthanhbang.foodordering.repository.AddressRepositoy;
import com.nguyenthanhbang.foodordering.repository.OrderItemRepository;
import com.nguyenthanhbang.foodordering.repository.OrderRepository;
import com.nguyenthanhbang.foodordering.repository.UserRepository;
import com.nguyenthanhbang.foodordering.service.CartService;
import com.nguyenthanhbang.foodordering.service.OrderService;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import com.nguyenthanhbang.foodordering.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserService userService;
    private final RestaurantService restaurantService;
    private final CartService cartService;
    private final AddressRepositoy addressRepositoy;
    private final UserRepository userRepository;

    @Override
    public Order createOrder(CreateOrderRequest request) {
        User user = userService.getUserLogin();
        Restaurant restaurant = restaurantService.getRestaurantById(request.getRestaurantId());
        Cart cart = cartService.getCartByUserLogin();
        if(cart == null) {
            throw new EntityNotFoundException("Cart is empty");
        }
        List<CartItem> cartItems = cart.getCartItems();
        List<Food> foods = cartItems.stream().map(cartItem -> cartItem.getFood()).collect(Collectors.toList());
        if(!fromOneRestaurant(foods, restaurant.getId())){
            throw new RuntimeException("All food must be from one restaurant");
        }
        Order order = new Order();
        order.setCustomer(user);
        order.setRestaurant(restaurant);
        order.setStatus(OrderStatus.PENDING);
        order.setTotalItems(cart.getSum());
        Address address = request.getDeliveryAddress();
        Optional<Address> existingAddressOpt = user.getDeliveryAddresses().stream()
                .filter(a -> a.getCity().equals(address.getCity()) &&
                        a.getDistrict().equals(address.getDistrict()) &&
                        a.getStreet().equals(address.getStreet()) &&
                        a.getWard().equals(address.getWard()) &&
                        a.getUser().getId().equals(user.getId()))
                .findFirst();
        Address savedAddress = null;
        if(!existingAddressOpt.isPresent()) {
            user.getDeliveryAddresses().add(address);
            userRepository.save(user);
            address.setUser(user);
            savedAddress = addressRepositoy.save(address);
        }else{
            savedAddress = existingAddressOpt.get();
        }
        order.setDeliveryAddress(savedAddress);
        order.setTotalPrice(cartService.calculateCartPrice(cart));
        order = orderRepository.save(order);
        for(CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setTotalPrice(cartItem.getTotalPrice());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setFood(cartItem.getFood());
            orderItem.setOrder(order);
            orderItem = orderItemRepository.save(orderItem);
        }
        restaurant.getOrders().add(order);
        return order;
    }

    @Override
    public Order updateOrder(Long orderId, UpdateOrderRequest request) {
        Order order = this.getOrderByIdAndRestaurantId(orderId);
        order.setStatus(request.getStatus());
        order = orderRepository.save(order);
        return order;
    }

    @Override
    public void deleteOrder(Long orderId) {

    }

    @Override
    public PaginationResponse getAllOrdersByUserLogin(Pageable pageable) {
        User user = userService.getUserLogin();
        Page<Order> orderPage = orderRepository.findByCustomerId(user.getId(), pageable);
        PaginationResponse.Pagination pagination = PaginationResponse.Pagination.builder()
                .page(pageable.getPageNumber() + 1)
                .size(pageable.getPageSize())
                .totalPages(orderPage.getTotalPages())
                .totalItems(orderPage.getTotalElements())
                .build();
        PaginationResponse paginationResponse = PaginationResponse.builder()
                .pagination(pagination)
                .items(orderPage.getContent())
                .build();
        return paginationResponse;    }

    @Override
    public PaginationResponse getAllOrdersByRestaurant(Pageable pageable) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Page<Order> orderPage = orderRepository.findByRestaurantId(restaurant.getId(), pageable);
        PaginationResponse.Pagination pagination = PaginationResponse.Pagination.builder()
                .page(pageable.getPageNumber() + 1)
                .size(pageable.getPageSize())
                .totalPages(orderPage.getTotalPages())
                .totalItems(orderPage.getTotalElements())
                .build();
        PaginationResponse paginationResponse = PaginationResponse.builder()
                .pagination(pagination)
                .items(orderPage.getContent())
                .build();
        return paginationResponse;
    }

    @Override
    public Order getOrderById(Long orderId) {

        return null;
    }

    @Override
    public Order getOrderByIdAndRestaurantId(Long orderId) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Order order = orderRepository.findByIdAndRestaurantId(orderId, restaurant.getId()).orElseThrow(() -> new EntityNotFoundException("Order not found"));
        return order;
    }

    @Override
    public Order getOrderByIdAndUserId(Long orderId) {
        User user = userService.getUserLogin();
        Order order = orderRepository.findByIdAndCustomerId(orderId, user.getId()).orElseThrow(() -> new EntityNotFoundException("Order not found"));
        return order;
    }

    @Override
    public boolean fromOneRestaurant(List<Food> foods, Long restaurantId) {
        boolean isValid = foods.stream().allMatch(food ->  food.getRestaurant().getId().equals(restaurantId));
        return isValid;
    }


}
