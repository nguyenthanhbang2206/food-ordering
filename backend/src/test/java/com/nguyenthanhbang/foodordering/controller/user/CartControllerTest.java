package com.nguyenthanhbang.foodordering.controller.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.config.JwtFilter;
import com.nguyenthanhbang.foodordering.dto.request.CreateCartItemRequest;
import com.nguyenthanhbang.foodordering.dto.request.UpdateCartItemRequest;
import com.nguyenthanhbang.foodordering.model.Cart;
import com.nguyenthanhbang.foodordering.model.CartItem;
import com.nguyenthanhbang.foodordering.service.CartService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CartController.class)
@AutoConfigureMockMvc(addFilters = false)
public class CartControllerTest {

    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private UserDetailsService userDetailsService;
    @MockBean
    private JwtFilter jwtFilter;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CartService cartService;

    @Autowired
    private ObjectMapper objectMapper;

    private static final String PATH = "/api/v1/cart";

    private CartItem cartItem;
    private Cart cart;
    private CreateCartItemRequest createRequest;
    private UpdateCartItemRequest updateRequest;

    @BeforeEach
    void setUp() {
        cartItem = new CartItem();
        cartItem.setId(1L);
        cartItem.setQuantity(2);

        cart = new Cart();
        cart.setId(1L);
        cart.setSum(2);

        createRequest = new CreateCartItemRequest();
        createRequest.setFoodId(1L);
        createRequest.setQuantity(2);

        updateRequest = new UpdateCartItemRequest();
        updateRequest.setQuantity(3);
    }

    @Test
    void addCartItemToCart_validRequest_shouldAddCartItem() throws Exception {
        when(cartService.addCartItemToCart(any(CreateCartItemRequest.class))).thenReturn(cartItem);

        mockMvc.perform(post(PATH + "/cartItems")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.message").value("Add cartItem successfully"))
                .andExpect(jsonPath("$.data.quantity").value(2))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(cartService).addCartItemToCart(any(CreateCartItemRequest.class));
    }

    @Test
    void addCartItemToCart_invalidRequest_shouldReturnBadRequest() throws Exception {
        createRequest.setQuantity(-1);

        mockMvc.perform(post(PATH + "/cartItems")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isBadRequest());

        verify(cartService, never()).addCartItemToCart(any(CreateCartItemRequest.class));
    }

    @Test
    void addCartItemToCart_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(cartService.addCartItemToCart(any(CreateCartItemRequest.class)))
                .thenThrow(new EntityNotFoundException("Food not found"));

        mockMvc.perform(post(PATH + "/cartItems")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isNotFound());

        verify(cartService).addCartItemToCart(any(CreateCartItemRequest.class));
    }

    @Test
    void updateQuantityOfCartItem_validRequest_shouldUpdateCartItem() throws Exception {
        when(cartService.updateQuantityOfCartItem(eq(1L), anyInt())).thenReturn(cartItem);

        mockMvc.perform(put(PATH + "/cartItems/{cartItemId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Update cartItem successfully"))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(cartService).updateQuantityOfCartItem(eq(1L), anyInt());
    }

    @Test
    void updateQuantityOfCartItem_invalidRequest_shouldReturnBadRequest() throws Exception {
        updateRequest.setQuantity(-1);

        mockMvc.perform(put(PATH + "/cartItems/{cartItemId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isBadRequest());

        verify(cartService, never()).updateQuantityOfCartItem(eq(1L), anyInt());
    }

    @Test
    void updateQuantityOfCartItem_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(cartService.updateQuantityOfCartItem(eq(1L), anyInt()))
                .thenThrow(new EntityNotFoundException("CartItem not found"));

        mockMvc.perform(put(PATH + "/cartItems/{cartItemId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isNotFound());

        verify(cartService).updateQuantityOfCartItem(eq(1L), anyInt());
    }

    @Test
    void deleteCartItem_validRequest_shouldDeleteCartItem() throws Exception {
        doNothing().when(cartService).deleteCartItemFromCart(1L);

        mockMvc.perform(delete(PATH + "/cartItems/{cartItemId}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Delete cartItem successfully"))
                .andExpect(jsonPath("$.data").doesNotExist());

        verify(cartService).deleteCartItemFromCart(1L);
    }

    @Test
    void deleteCartItem_invalidPathVariable_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(delete(PATH + "/cartItems/invalid"))
                .andExpect(status().isBadRequest());

        verify(cartService, never()).deleteCartItemFromCart(anyLong());
    }

    @Test
    void deleteCartItem_serviceThrowsException_shouldReturnNotFound() throws Exception {
        doThrow(new EntityNotFoundException("CartItem not found")).when(cartService).deleteCartItemFromCart(999L);

        mockMvc.perform(delete(PATH + "/cartItems/{cartItemId}", 999L))
                .andExpect(status().isNotFound());

        verify(cartService).deleteCartItemFromCart(999L);
    }

    @Test
    void deleteCart_validRequest_shouldDeleteCart() throws Exception {
        doNothing().when(cartService).deleteCart();

        mockMvc.perform(delete(PATH))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Delete cart successfully"))
                .andExpect(jsonPath("$.data").doesNotExist());

        verify(cartService).deleteCart();
    }

    @Test
    void deleteCart_serviceThrowsException_shouldReturnNotFound() throws Exception {
        doThrow(new EntityNotFoundException("Cart not found")).when(cartService).deleteCart();

        mockMvc.perform(delete(PATH))
                .andExpect(status().isNotFound());

        verify(cartService).deleteCart();
    }

    @Test
    void getCarByUserLogin_shouldReturnCart() throws Exception {
        when(cartService.getCartByUserLogin()).thenReturn(cart);

        mockMvc.perform(get(PATH))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get cart successfully"))
                .andExpect(jsonPath("$.data.sum").value(2))
                .andExpect(jsonPath("$.data.id").value(1L));

        verify(cartService).getCartByUserLogin();
    }

    @Test
    void getCarByUserLogin_serviceThrowsException_shouldReturnNotFound() throws Exception {
        when(cartService.getCartByUserLogin()).thenThrow(new EntityNotFoundException("Cart not found"));

        mockMvc.perform(get(PATH))
                .andExpect(status().isNotFound());

        verify(cartService).getCartByUserLogin();
    }

    @Test
    void getAllCartItems_validRequest_shouldReturnList() throws Exception {
        List<CartItem> cartItems = Arrays.asList(cartItem);
        when(cartService.getCartItems()).thenReturn(cartItems);

        mockMvc.perform(get(PATH + "/cartItems"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(200))
                .andExpect(jsonPath("$.message").value("Get cart items successfully"))
                .andExpect(jsonPath("$.data[0].id").value(1L));

        verify(cartService).getCartItems();
    }

    @Test
    void getAllCartItems_noCartItem_shouldReturnEmptyList() throws Exception {
        when(cartService.getCartItems()).thenReturn(Collections.emptyList());

        mockMvc.perform(get(PATH + "/cartItems"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isEmpty());

        verify(cartService).getCartItems();
    }
}