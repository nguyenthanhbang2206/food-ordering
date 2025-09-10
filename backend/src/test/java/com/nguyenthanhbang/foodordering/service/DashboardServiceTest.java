package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.response.FoodStatistic;
import com.nguyenthanhbang.foodordering.dto.response.OrderStatistic;
import com.nguyenthanhbang.foodordering.dto.response.RevenueByMonth;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.FoodRepository;
import com.nguyenthanhbang.foodordering.repository.OrderRepository;
import com.nguyenthanhbang.foodordering.service.impl.DashboardServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@ExtendWith(MockitoExtension.class)
public class DashboardServiceTest {

    @Mock
    private FoodRepository foodRepository;
    @Mock
    private UserService userService;
    @Mock
    private RestaurantService restaurantService;
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private OrderService orderService;
    @Mock
    private FoodService foodService;
    @InjectMocks
    private DashboardServiceImpl dashboardService;
    private User user;
    private Restaurant restaurant;
    @BeforeEach
    public void setUp() {
        user = User.builder()
                .fullName("Nguyen Van A")
                .build();
        restaurant = Restaurant.builder()
                .name("restaurant")
                .owner(user)
                .build();
    }

    @Test
    public void statistic_userNotFound_shouldThrowException() {
        Mockito.when(userService.getUserLogin()).thenThrow(new EntityNotFoundException("User not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->dashboardService.statistic());
        Assertions.assertEquals("User not found", ex.getMessage());
    }
    @Test
    public void statistic_restaurantNotFound_shouldThrowException() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->dashboardService.statistic());
        Assertions.assertEquals("Restaurant not found", ex.getMessage());
    }
    @Test
    public void statistic_validRequest_shouldReturnStatistic() {
        OrderStatistic orderStatistic1 = new OrderStatistic();
        orderStatistic1.setName("PENDING");
        orderStatistic1.setValue(1);
        OrderStatistic orderStatistic2 = new OrderStatistic();
        orderStatistic2.setName("PROCESSING");
        orderStatistic2.setValue(1);
        OrderStatistic orderStatistic3 = new OrderStatistic();
        orderStatistic3.setName("DELIVERED");
        orderStatistic3.setValue(1);
        FoodStatistic foodStatistic1 = new FoodStatistic();
        foodStatistic1.setName("food1");
        foodStatistic1.setSold(1);
        FoodStatistic foodStatistic2 = new FoodStatistic();
        foodStatistic2.setName("food2");
        foodStatistic2.setSold(1);
        RevenueByMonth revenueByMonth1 = new RevenueByMonth();
        revenueByMonth1.setMonth(1);
        revenueByMonth1.setRevenue(1);

        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(foodRepository.countByRestaurantId(restaurant.getId())).thenReturn(1L);
        Mockito.when(orderRepository.countByRestaurantId(restaurant.getId())).thenReturn(1L);
        Mockito.when(orderRepository.totalRevenueByRestaurantId(restaurant.getId())).thenReturn(1L);
        Mockito.when(orderService.countOrdersToday(restaurant.getId())).thenReturn(1L);
        Mockito.when(orderService.revenueToday(restaurant.getId())).thenReturn(1L);
        Mockito.when(orderService.countOrderByStatus(restaurant.getId())).thenReturn(List.of(orderStatistic1, orderStatistic2, orderStatistic3));
        Mockito.when(foodService.getFoodStatistic(restaurant.getId())).thenReturn(List.of(foodStatistic1, foodStatistic2));
        Mockito.when(orderService.getRevenueByMonth(restaurant.getId())).thenReturn(List.of(revenueByMonth1));

        Map<String, Object> result = dashboardService.statistic();
        Assertions.assertNotNull(result);
        Assertions.assertEquals(1L, result.get("totalFoods"));
        Assertions.assertEquals(1L, result.get("totalOrders"));
        Assertions.assertEquals(1L, result.get("totalRevenue"));
        Assertions.assertEquals(1L, result.get("todayOrders"));
        Assertions.assertEquals(1L, result.get("todayRevenue"));
        Assertions.assertEquals(3L, ((List<?>)result.get("orderStatus")).size());
        Assertions.assertEquals(2L, ((List<?>)result.get("topFoods")).size());
        Assertions.assertEquals(1L, ((List<?>)result.get("revenueByMonth")).size());
        Mockito.verify(userService).getUserLogin();
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(foodRepository).countByRestaurantId(restaurant.getId());
        Mockito.verify(orderRepository).countByRestaurantId(restaurant.getId());
        Mockito.verify(orderRepository).totalRevenueByRestaurantId(restaurant.getId());
        Mockito.verify(orderService).countOrdersToday(restaurant.getId());
        Mockito.verify(orderService).revenueToday(restaurant.getId());
        Mockito.verify(orderService).countOrderByStatus(restaurant.getId());
        Mockito.verify(foodService).getFoodStatistic(restaurant.getId());
        Mockito.verify(orderService).getRevenueByMonth(restaurant.getId());

    }


}
