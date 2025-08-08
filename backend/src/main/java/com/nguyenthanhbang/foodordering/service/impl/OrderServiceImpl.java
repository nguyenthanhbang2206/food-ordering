package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.CreateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.response.OrderStatistic;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.dto.response.RevenueByMonth;
import com.nguyenthanhbang.foodordering.enums.OrderStatus;
import com.nguyenthanhbang.foodordering.model.*;
import com.nguyenthanhbang.foodordering.repository.*;
import com.nguyenthanhbang.foodordering.service.CartService;
import com.nguyenthanhbang.foodordering.service.OrderService;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import com.nguyenthanhbang.foodordering.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
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
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final FoodRepository foodRepository;
    private static final ZoneId ZONE = ZoneId.of("Asia/Bangkok");

    @Override
    public Order createOrder(CreateOrderRequest request) {
        User user = userService.getUserLogin();
        Restaurant restaurant = restaurantService.getRestaurantById(request.getRestaurantId());
        Cart cart = cartService.getCartByUserLogin();
        if(cart == null) {
            throw new EntityNotFoundException("Cart is empty");
        }
        List<CartItem> cartItems = cart.getCartItems().stream()
                .filter(item -> item.getFood().getRestaurant().getId().equals(request.getRestaurantId())).collect(Collectors.toList());
        List<Food> foods = cartItems.stream().map(cartItem -> cartItem.getFood()).collect(Collectors.toList());
        if(!fromOneRestaurant(foods, restaurant.getId())){
            throw new RuntimeException("All food must be from one restaurant");
        }
        Order order = new Order();
        order.setCustomer(user);
        order.setRestaurant(restaurant);
        order.setStatus(OrderStatus.PENDING);
        order.setTotalItems(cartItems.size());
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
            savedAddress = addressRepository.save(address);
        }else{
            savedAddress = existingAddressOpt.get();
        }
        order.setDeliveryAddress(savedAddress);
        long price = cartItems.stream().map(item -> item.getTotalPrice()).reduce(0L, (p1, p2) -> p1 + p2);
        order.setTotalPrice(price);
        order = orderRepository.save(order);
        for(CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setTotalPrice(cartItem.getTotalPrice());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setFood(cartItem.getFood());
            orderItem.setOrder(order);
            orderItem = orderItemRepository.save(orderItem);
            order.getOrderItems().add(orderItem);
        }
        restaurant.getOrders().add(order);
        return order;
    }

    @Override
    public Order updateOrder(Long orderId, UpdateOrderRequest request) {
        Order order = this.getOrderByIdAndRestaurantId(orderId);
        order.setStatus(request.getStatus());
        if(request.getStatus().equals(OrderStatus.DELIVERED)) {
            List<OrderItem> orderItems = order.getOrderItems();
            List<Food> foods = orderItems.stream().map(orderItem -> {
                Food food = orderItem.getFood();
                food.setSold(food.getSold() + orderItem.getQuantity());
                return foodRepository.save(food);
            }).collect(Collectors.toList());

        }
        order = orderRepository.save(order);
        return order;
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

    @Override
    public Long countOrdersToday(Long restaurantId) {
        LocalDate today = LocalDate.now();
        Instant startDay = today.atStartOfDay(ZONE).toInstant();
        Instant nextDay = today.plusDays(1).atStartOfDay(ZONE).toInstant();
        return orderRepository.countOrdersToday(startDay, nextDay, restaurantId);
    }

    @Override
    public Long revenueToday(Long restaurantId) {
        LocalDate today = LocalDate.now();
        Instant startDay = today.atStartOfDay(ZONE).toInstant();
        Instant nextDay = today.plusDays(1).atStartOfDay(ZONE).toInstant();
        return orderRepository.revenueToday(startDay, nextDay, restaurantId);
    }

    @Override
    public List<OrderStatistic> countOrderByStatus(Long restaurantId) {
        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);
        List<OrderStatistic> orderStatistics = new ArrayList<>();
        Long pending = orderRepository.countByRestaurantIdAndStatus(restaurantId, OrderStatus.PENDING);
        Long processing = orderRepository.countByRestaurantIdAndStatus(restaurantId, OrderStatus.PROCESSING);
        Long delivered = orderRepository.countByRestaurantIdAndStatus(restaurantId, OrderStatus.DELIVERED);
        Long cancelled = orderRepository.countByRestaurantIdAndStatus(restaurantId, OrderStatus.CANCELLED);
        if(pending != null && pending != 0){
            OrderStatistic orderStatistic = new OrderStatistic();
            orderStatistic.setName("PENDING");
            orderStatistic.setValue(pending);
            orderStatistics.add(orderStatistic);
        }
        if(processing != null && processing != 0){
            OrderStatistic orderStatistic = new OrderStatistic();
            orderStatistic.setName("PROCESSING");
            orderStatistic.setValue(processing);
            orderStatistics.add(orderStatistic);
        }
        if(delivered != null && delivered != 0){
            OrderStatistic orderStatistic = new OrderStatistic();
            orderStatistic.setName("DELIVERED");
            orderStatistic.setValue(delivered);
            orderStatistics.add(orderStatistic);
        }
        if(cancelled != null && cancelled != 0){
            OrderStatistic orderStatistic = new OrderStatistic();
            orderStatistic.setName("CANCELLED");
            orderStatistic.setValue(cancelled);
            orderStatistics.add(orderStatistic);
        }
        return orderStatistics;
    }

    @Override
    public List<RevenueByMonth> getRevenueByMonth(Long restaurantId) {
        return orderRepository.revenueByMonth(restaurantId);
    }

    @Override
    public List<Order> getRecentOrders() {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        return orderRepository.findTop5ByRestaurantIdOrderByCreatedDateDesc(restaurant.getId());
    }


}
