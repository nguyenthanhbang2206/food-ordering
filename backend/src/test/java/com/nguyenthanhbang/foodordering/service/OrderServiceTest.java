package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CreateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.response.OrderStatistic;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.dto.response.RevenueByMonth;
import com.nguyenthanhbang.foodordering.enums.OrderStatus;
import com.nguyenthanhbang.foodordering.model.*;
import com.nguyenthanhbang.foodordering.repository.*;
import com.nguyenthanhbang.foodordering.service.impl.OrderServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private OrderItemRepository orderItemRepository;
    @Mock
    private UserService userService;
    @Mock
    private RestaurantService restaurantService;
    @Mock
    private CartService cartService;
    @Mock
    private AddressRepository addressRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private FoodRepository foodRepository;
    @InjectMocks
    private OrderServiceImpl orderService;

    private User user;
    private Order order;
    private Restaurant restaurant;
    private Cart cart;
    private Address address;
    private Food food;
    private CartItem cartItem;
    private CreateOrderRequest request;

    @BeforeEach
    public void setUp() {
        user = User.builder()
                .fullName("Nguyen Van A")
                .deliveryAddresses(new ArrayList<>())
                .build();
        user.setId(1L);

        restaurant = Restaurant.builder()
                .name("restaurant")
                .orders(new ArrayList<>())
                .build();
        restaurant.setId(1L);
        food = Food.builder()
                .sold(0)
                .restaurant(restaurant)
                .build();
        food.setId(1L);


        cartItem = CartItem.builder()
                .food(food)
                .quantity(2)
                .totalPrice(200L)
                .build();

        cart = Cart.builder()
                .cartItems(Arrays.asList(cartItem))
                .customer(user)
                .build();
        cart.setId(1L);

        address = Address.builder()
                .ward("HN")
                .street("HN")
                .city("HN")
                .district("HN")
                .build();


        order = Order.builder()
                .customer(user)
                .restaurant(restaurant)
                .status(OrderStatus.PENDING)
                .orderItems(new ArrayList<>())
                .build();
        order.setId(1L);
        request = new CreateOrderRequest();
        request.setRestaurantId(1L);
        request.setDeliveryAddress(address);
    }

    @Test
    public void createOrder_success_shouldCreateOrder() {
        when(userService.getUserLogin()).thenReturn(user);
        when(restaurantService.getRestaurantById(1L)).thenReturn(restaurant);
        when(cartService.getCartByUserLogin()).thenReturn(cart);
        when(addressRepository.save(any(Address.class))).thenReturn(address);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(orderRepository.save(any(Order.class))).thenReturn(order);
        when(orderItemRepository.save(any(OrderItem.class))).thenReturn(new OrderItem());

        Order result = orderService.createOrder(request);

        assertNotNull(result);
        assertEquals(user, result.getCustomer());
        assertEquals(restaurant, result.getRestaurant());
        assertEquals(OrderStatus.PENDING, result.getStatus());
        verify(orderRepository).save(any(Order.class));
        verify(orderItemRepository).save(any(OrderItem.class));
        verify(addressRepository).save(any(Address.class));
    }

    @Test
    public void createOrder_emptyCart_shouldThrowsException() {

        when(userService.getUserLogin()).thenReturn(user);
        when(restaurantService.getRestaurantById(1L)).thenReturn(restaurant);
        when(cartService.getCartByUserLogin()).thenReturn(null);

        assertThrows(EntityNotFoundException.class, () -> orderService.createOrder(request));
    }

    @Test
    public void createOrder_foodFromDifferentRestaurant_shouldThrowsException() {
        CreateOrderRequest request2 = new CreateOrderRequest();
        request2.setRestaurantId(2L);

        Restaurant differentRestaurant = new Restaurant();
        differentRestaurant.setId(2L);

        when(userService.getUserLogin()).thenReturn(user);
        when(restaurantService.getRestaurantById(2L)).thenReturn(differentRestaurant);
        when(cartService.getCartByUserLogin()).thenReturn(cart);

        assertThrows(RuntimeException.class, () -> orderService.createOrder(request));
    }

    @Test
    public void createOrder_existAddress_useAddress(){
        address.setUser(user);
        user.setDeliveryAddresses(Arrays.asList(address));
        when(userService.getUserLogin()).thenReturn(user);
        when(restaurantService.getRestaurantById(1L)).thenReturn(restaurant);
        when(cartService.getCartByUserLogin()).thenReturn(cart);
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(orderItemRepository.save(any(OrderItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Order result = orderService.createOrder(request);

        assertNotNull(result);
        assertEquals(user, result.getCustomer());
        assertEquals(restaurant, result.getRestaurant());
        assertEquals(OrderStatus.PENDING, result.getStatus());
        verify(orderRepository).save(any(Order.class));
        verify(orderItemRepository).save(any(OrderItem.class));
        verify(addressRepository, never()).save(any(Address.class));

    }
    @Test
    public void updateOrder_success_shouldUpdateOrder() {
        UpdateOrderRequest request = new UpdateOrderRequest();
        request.setStatus(OrderStatus.PROCESSING);

        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(orderRepository.findByIdAndRestaurantId(1L, 1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Order result = orderService.updateOrder(1L, request);
        assertNotNull(result);
        assertEquals(user, result.getCustomer());
        assertEquals(restaurant, result.getRestaurant());
        assertEquals(OrderStatus.PROCESSING, result.getStatus());
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    public void updateOrder_delivered_shouldUpdateFood(){
        OrderItem orderItem = new OrderItem();
        orderItem.setFood(food);
        orderItem.setQuantity(3);
        order.setOrderItems(Arrays.asList(orderItem));

        UpdateOrderRequest request = new UpdateOrderRequest();
        request.setStatus(OrderStatus.DELIVERED);

        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(orderRepository.findByIdAndRestaurantId(1L, 1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(foodRepository.save(any(Food.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Order result = orderService.updateOrder(1L, request);

        assertNotNull(result);
        assertEquals(user, result.getCustomer());
        assertEquals(restaurant, result.getRestaurant());
        assertEquals(OrderStatus.DELIVERED, result.getStatus());
        assertEquals(3 , food.getSold());
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    public void updateOrder_orderNotFound_shouldThrowException() {
        UpdateOrderRequest request = new UpdateOrderRequest();
        request.setStatus(OrderStatus.DELIVERED);
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(orderRepository.findByIdAndRestaurantId(anyLong(), anyLong())).thenReturn(Optional.empty());
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, ()-> orderService.updateOrder(1L, request));

        assertEquals("Order not found", ex.getMessage());
    }

    @Test
    public void getAllOrdersByUserLogin_userNotFound_shouldThrowException() {
        Pageable pageable = PageRequest.of(0, 5);
        when(userService.getUserLogin()).thenThrow(new EntityNotFoundException("User not found"));

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, ()->orderService.getAllOrdersByUserLogin(pageable));
        assertEquals("User not found", ex.getMessage());

    }
    @Test
    public void getAllOrdersByUserLogin_success_shouldReturnPaginationResponse(){
        List<Order> orders = Arrays.asList(order);
        Pageable pageable = PageRequest.of(0, 5);
        Page<Order> pageOrder = new PageImpl<>(orders, pageable , 1);
        when(userService.getUserLogin()).thenReturn(user);
        when(orderRepository.findByCustomerId(user.getId(), pageable)).thenReturn(pageOrder);

        PaginationResponse result = orderService.getAllOrdersByUserLogin(pageable);
        assertNotNull(result);
        assertEquals(1, result.getPagination().getPage());
        assertEquals(5, result.getPagination().getSize());
        assertEquals(1, result.getPagination().getTotalPages());
        assertEquals(1, result.getPagination().getTotalItems());
        assertEquals(orders, result.getItems());
    }

    @Test
    public void getAllOrdersByRestaurant_success_shouldReturnPaginationResponse() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Order> orders = Arrays.asList(order);
        Page<Order> orderPage = new PageImpl<>(orders, pageable, 1);
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(orderRepository.findByRestaurantId(1L, pageable)).thenReturn(orderPage);

        PaginationResponse result = orderService.getAllOrdersByRestaurant(pageable);

        assertNotNull(result);
        assertEquals(1, result.getPagination().getPage());
        assertEquals(5, result.getPagination().getSize());
        assertEquals(1, result.getPagination().getTotalPages());
        assertEquals(1, result.getPagination().getTotalItems());
        assertEquals(orders, result.getItems());
    }
    @Test
    public void getOrderByIdAndRestaurantId_success_shouldReturnOrder() {
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(orderRepository.findByIdAndRestaurantId(1L, 1L)).thenReturn(Optional.of(order));

        Order result = orderService.getOrderByIdAndRestaurantId(1L);

        assertNotNull(result);
        assertEquals(order, result);
    }
    @Test
    public void getOrderByIdAndRestaurantId_NotFound_shouldThrowsException() {
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(orderRepository.findByIdAndRestaurantId(1L, 1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> orderService.getOrderByIdAndRestaurantId(1L));
    }

    @Test
    public void getOrderByIdAndUserId_Success() {
        when(userService.getUserLogin()).thenReturn(user);
        when(orderRepository.findByIdAndCustomerId(1L, 1L)).thenReturn(Optional.of(order));

        Order result = orderService.getOrderByIdAndUserId(1L);

        assertNotNull(result);
        assertEquals(order, result);
    }

    @Test
    public void getOrderByIdAndUserId_NotFound_ThrowsException() {
        when(userService.getUserLogin()).thenReturn(user);
        when(orderRepository.findByIdAndCustomerId(1L, 1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> orderService.getOrderByIdAndUserId(1L));
    }

    @Test
    public void fromOneRestaurant_allFromSameRestaurant_ReturnsTrue() {
        List<Food> foods = Arrays.asList(food, food);

        boolean result = orderService.fromOneRestaurant(foods, 1L);

        assertTrue(result);
    }

    @Test
    public void fromOneRestaurant_fromDifferentRestaurants_shouldReturnsFalse() {
        Food differentRestaurantFood = new Food();
        Restaurant differentRestaurant = new Restaurant();
        differentRestaurant.setId(2L);
        differentRestaurantFood.setRestaurant(differentRestaurant);

        List<Food> foods = Arrays.asList(food, differentRestaurantFood);

        boolean result = orderService.fromOneRestaurant(foods, 1L);

        assertFalse(result);
    }

    @Test
    public void countOrdersToday_success_shouldReturnCount() {
        when(orderRepository.countOrdersToday(any(Instant.class), any(Instant.class), eq(1L))).thenReturn(5L);

        Long result = orderService.countOrdersToday(1L);

        assertNotNull(result);
        assertEquals(5L, result);
        verify(orderRepository).countOrdersToday(any(Instant.class), any(Instant.class), eq(1L));
    }

    @Test
    public void revenueToday_success_shouldReturnRevenue() {
        when(orderRepository.revenueToday(any(Instant.class), any(Instant.class), eq(1L))).thenReturn(1000L);

        Long result = orderService.revenueToday(1L);

        assertNotNull(result);
        assertEquals(1000L, result);
        verify(orderRepository).revenueToday(any(Instant.class), any(Instant.class), eq(1L));
    }

    @Test
    public void countOrderByStatus_success_shouldReturnCount() {
        when(orderRepository.findByRestaurantId(1L)).thenReturn(Arrays.asList(order));
        when(orderRepository.countByRestaurantIdAndStatus(1L, OrderStatus.PENDING)).thenReturn(2L);
        when(orderRepository.countByRestaurantIdAndStatus(1L, OrderStatus.PROCESSING)).thenReturn(3L);
        when(orderRepository.countByRestaurantIdAndStatus(1L, OrderStatus.DELIVERED)).thenReturn(5L);
        when(orderRepository.countByRestaurantIdAndStatus(1L, OrderStatus.CANCELLED)).thenReturn(1L);

        List<OrderStatistic> result = orderService.countOrderByStatus(1L);

        assertNotNull(result);
        assertEquals(4, result.size());

        OrderStatistic pendingStats = result.stream()
                .filter(stats -> "PENDING".equals(stats.getName()))
                .findFirst()
                .orElse(null);
        assertNotNull(pendingStats);
        assertEquals(2L, pendingStats.getValue());

        OrderStatistic processingStats = result.stream()
                .filter(stats -> "PROCESSING".equals(stats.getName()))
                .findFirst()
                .orElse(null);
        assertNotNull(processingStats);
        assertEquals(3L, processingStats.getValue());

        OrderStatistic deliveredStats = result.stream()
                .filter(stats -> "DELIVERED".equals(stats.getName()))
                .findFirst()
                .orElse(null);
        assertNotNull(deliveredStats);
        assertEquals(5L, deliveredStats.getValue());

        OrderStatistic cancelledStats = result.stream()
                .filter(stats -> "CANCELLED".equals(stats.getName()))
                .findFirst()
                .orElse(null);
        assertNotNull(cancelledStats);
        assertEquals(1L, cancelledStats.getValue());
    }



    @Test
    public void getRevenueByMonth_Success() {
        List<RevenueByMonth> mockRevenue = Arrays.asList(new RevenueByMonth());
        when(orderRepository.revenueByMonth(1L)).thenReturn(mockRevenue);

        List<RevenueByMonth> result = orderService.getRevenueByMonth(1L);

        assertNotNull(result);
        assertEquals(mockRevenue, result);
        verify(orderRepository).revenueByMonth(1L);
    }

    @Test
    public void getRecentOrders_success_shouldReturnOrders() {

        List<Order> recentOrders = Arrays.asList(order);
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(orderRepository.findTop5ByRestaurantIdOrderByCreatedDateDesc(1L)).thenReturn(recentOrders);

        List<Order> result = orderService.getRecentOrders();

        assertNotNull(result);
        assertEquals(recentOrders, result);
        verify(orderRepository).findTop5ByRestaurantIdOrderByCreatedDateDesc(1L);
    }


}
