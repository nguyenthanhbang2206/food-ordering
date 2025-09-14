package com.nguyenthanhbang.foodordering.controller.admin;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.model.Order;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.dto.request.UpdateOrderRequest;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.service.OrderService;

import jakarta.persistence.EntityNotFoundException;

import java.util.*;
import java.util.Collections;


@WebMvcTest(AdminOrderController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AdminOrderControllerTest {

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

    private static final String PATH = "/api/v1/admin/restaurants/orders";

    private Order order;

    @BeforeEach
    void setUp() {
        order = new Order();
        order.setId(1L);
    }

    @Test
    void getOrdersByRestaurant_validRequest_shouldReturnPaginationResponse() throws Exception {
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
        when(orderService.getAllOrdersByRestaurant(any(Pageable.class))).thenReturn(response);

        mockMvc.perform(get(PATH)
                        .param("page", "1")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get orders by restaurant successfully"))
                .andExpect(jsonPath("$.data.pagination.page").value(1))
                .andExpect(jsonPath("$.data.pagination.size").value(5))
                .andExpect(jsonPath("$.data.pagination.totalItems").value(1))
                .andExpect(jsonPath("$.data.pagination.totalPages").value(1))
                .andExpect(jsonPath("$.data.items[0].id").value(1L));

        verify(orderService).getAllOrdersByRestaurant(any(Pageable.class));
    }


    @Test
    void getOrdersByRestaurant_noOrder_shouldReturnEmptyList() throws Exception {
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

        when(orderService.getAllOrdersByRestaurant(any(Pageable.class))).thenReturn(response);

        mockMvc.perform(get(PATH)
                        .param("page", "1")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.items").isEmpty());
    }

    @Test
    void getRecentOrder_validRequest_shouldReturnList() throws Exception {
        List<Order> orders = Arrays.asList(order);

        when(orderService.getRecentOrders()).thenReturn(orders);

        mockMvc.perform(get(PATH + "/recently"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get recent orders successfully"))
                .andExpect(jsonPath("$.data[0].id").value(1L));

        verify(orderService).getRecentOrders();
    }

    @Test
    void getRecentOrder_noOrder_shouldReturnEmptyList() throws Exception {
        when(orderService.getRecentOrders()).thenReturn(Collections.emptyList());

        mockMvc.perform(get(PATH + "/recently"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isEmpty());
    }

    @Test
    void updateOrder_validRequest_shouldUpdateOrder() throws Exception {
        UpdateOrderRequest request = new UpdateOrderRequest();
        when(orderService.updateOrder(eq(1L), any(UpdateOrderRequest.class))).thenReturn(order);

        mockMvc.perform(put(PATH + "/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Update order successfully"))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(orderService).updateOrder(eq(1L), any(UpdateOrderRequest.class));
    }

    @Test
    void updateOrder_serviceThrows_shouldReturnNotFound() throws Exception {
        UpdateOrderRequest request = new UpdateOrderRequest();
        when(orderService.updateOrder(eq(1L), any(UpdateOrderRequest.class)))
                .thenThrow(new EntityNotFoundException("Order not found"));

        mockMvc.perform(put(PATH + "/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
        verify(orderService).updateOrder(eq(1L), any(UpdateOrderRequest.class));
    }

    @Test
    void updateOrder_invalidRequestBody_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(put(PATH + "/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

        verify(orderService, never()).updateOrder(anyLong(), any(UpdateOrderRequest.class));
    }

    @Test
    void updateOrder_invalidPathVariable_shouldReturnBadRequest() throws Exception {
        UpdateOrderRequest request = new UpdateOrderRequest();
        mockMvc.perform(put(PATH + "/invalid")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
        verify(orderService, never()).updateOrder(anyLong(), any(UpdateOrderRequest.class));
    }
}
