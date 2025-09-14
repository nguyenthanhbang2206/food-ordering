package com.nguyenthanhbang.foodordering.controller.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.dto.request.CreateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Address;
import com.nguyenthanhbang.foodordering.model.Order;
import com.nguyenthanhbang.foodordering.service.OrderService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(OrderController.class)
@AutoConfigureMockMvc(addFilters = false)
public class OrderControllerTest {
    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtFilter jwtFilter;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String PATH = "/api/v1/orders";

    private Order order;
    private CreateOrderRequest createOrderRequest;

    @BeforeEach
    void setUp() {
        order = new Order();
        order.setId(1L);

        Address address = new Address();
        address.setCity("HN");
        address.setWard("HN");
        address.setDistrict("HN");
        address.setStreet("HN");
        createOrderRequest = new CreateOrderRequest();
        createOrderRequest.setRestaurantId(1L);
        createOrderRequest.setDeliveryAddress(address);
    }

    @Test
    void placeOrder_validRequest_shouldCreateOrder() throws Exception {
        when(orderService.createOrder(any(CreateOrderRequest.class))).thenReturn(order);

        mockMvc.perform(post(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createOrderRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.message").value("Create order successfully"))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(orderService).createOrder(any(CreateOrderRequest.class));
    }

    @Test
    void placeOrder_invalidRequest_shouldReturnBadRequest() throws Exception {
        createOrderRequest.setRestaurantId(null);

        mockMvc.perform(post(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createOrderRequest)))
                .andExpect(status().isBadRequest());

        verify(orderService, never()).createOrder(any(CreateOrderRequest.class));
    }

    @Test
    void placeOrder_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(orderService.createOrder(any(CreateOrderRequest.class)))
                .thenThrow(new EntityNotFoundException("Restaurant not found"));

        mockMvc.perform(post(PATH)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createOrderRequest)))
                .andExpect(status().isNotFound());

        verify(orderService).createOrder(any(CreateOrderRequest.class));
    }

    @Test
    void getOrderHistory__validRequest_shouldReturnPaginationResponse() throws Exception {
        PaginationResponse.Pagination pagination = PaginationResponse.Pagination.builder()
                .totalItems(1)
                .size(5)
                .totalPages(1)
                .page(1)
                .build();
        PaginationResponse response = PaginationResponse.builder()
                .pagination(pagination)
                .items(Arrays.asList(order))
                .build();

        Pageable pageable = PageRequest.of(0, 5);
        when(orderService.getAllOrdersByUserLogin(any(Pageable.class))).thenReturn(response);

        mockMvc.perform(get(PATH)
                        .param("page", "1")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get order history successfully"))
                .andExpect(jsonPath("$.data.pagination.page").value(1))
                .andExpect(jsonPath("$.data.items[0].id").value(1L));
        verify(orderService).getAllOrdersByUserLogin(any(Pageable.class));
    }

    @Test
    void getOrderHistory_noFood_shouldReturnEmptyList() throws Exception {
        PaginationResponse.Pagination pagination = PaginationResponse.Pagination.builder()
                .totalItems(0)
                .size(5)
                .totalPages(0)
                .page(1)
                .build();
        PaginationResponse response = PaginationResponse.builder()
                .pagination(pagination)
                .items(Collections.emptyList())
                .build();

        when(orderService.getAllOrdersByUserLogin(any(Pageable.class))).thenReturn(response);

        mockMvc.perform(get(PATH)
                        .param("page", "1")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.items").isEmpty());
    }

    @Test
    void getOrderById__validRequest_shouldReturnOrder() throws Exception {
        when(orderService.getOrderByIdAndUserId(1L)).thenReturn(order);

        mockMvc.perform(get(PATH + "/{orderId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get order successfully"))
                .andExpect(jsonPath("$.data.id").value(1L));
        verify(orderService).getOrderByIdAndUserId(1L);
    }

    @Test
    void getOrderById_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(orderService.getOrderByIdAndUserId(999L)).thenThrow(new EntityNotFoundException("Order not found"));

        mockMvc.perform(get(PATH + "/{orderId}", 999L))
                .andExpect(status().isNotFound());
        verify(orderService).getOrderByIdAndUserId(999L);
    }

    @Test
    void getOrderById_invalidPathVariable_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(get(PATH + "/invalid"))
                .andExpect(status().isBadRequest());
        verify(orderService, never()).getOrderByIdAndUserId(anyLong());
    }
}