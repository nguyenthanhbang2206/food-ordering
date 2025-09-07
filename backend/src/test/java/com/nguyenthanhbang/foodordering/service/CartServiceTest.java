package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CreateCartItemRequest;
import com.nguyenthanhbang.foodordering.enums.Role;
import com.nguyenthanhbang.foodordering.model.Cart;
import com.nguyenthanhbang.foodordering.model.CartItem;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.CartItemRepository;
import com.nguyenthanhbang.foodordering.repository.CartRepository;
import com.nguyenthanhbang.foodordering.service.impl.CartServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class CartServiceTest {

    @Mock
    private UserService userService;
    @Mock
    private CartRepository cartRepository;
    @Mock
    private CartItemRepository cartItemRepository;
    @Mock
    private FoodService foodService;
    @InjectMocks
    private CartServiceImpl cartService;

    private User user;
    private Food food;
    private Cart cart;
    private CartItem cartItem;
    private CreateCartItemRequest request;
    @BeforeEach
    public void setUp() {
        user = User.builder()
                .fullName("Nguyen Van A")
                .role(Role.CUSTOMER)
                .email("a@gmail.com")
                .password("123")
                .build();
        user.setId(1L);
        food = Food.builder()
                .name("Pizza")
                .price(10)
                .sold(1)
                .build();
        food.setId(1L);
        cart = Cart.builder()
                .totalPrice(20)
                .sum(1)
                .cartItems(new ArrayList<>())
                .customer(user)
                .build();
        cart.setId(1L);
        cartItem = CartItem.builder()
                .food(food)
                .cart(cart)
                .quantity(2)
                .totalPrice(20)
                .build();
        cartItem.setId(1L);
        cart.getCartItems().add(cartItem);
        request = CreateCartItemRequest.builder()
                .foodId(1L)
                .quantity(1)
                .build();
    }
    @Test
    public void addCartItemToCart_CartNotExists_shouldCreateNewCart(){
        // given
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.empty());
        Mockito.when(foodService.getFoodById(request.getFoodId())).thenReturn(food);
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenReturn(cart);
        Mockito.when(cartItemRepository.findByCartAndFood(Mockito.any(Cart.class), Mockito.any(Food.class))).thenReturn(Optional.empty());
        Mockito.when(cartItemRepository.save(Mockito.any(CartItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        //when
        CartItem result = cartService.addCartItemToCart(request);

        //then
        Assertions.assertNotNull(result);
        Assertions.assertEquals(1, result.getQuantity());
        Assertions.assertEquals(10, result.getTotalPrice());
        Mockito.verify(cartRepository, Mockito.times(2)).save(Mockito.any(Cart.class));
        Mockito.verify(cartItemRepository, Mockito.times(1)).save(Mockito.any(CartItem.class));
    }
    @Test
    public void addCartItemToCart_CartExistsAndCartItemNotExists_shouldCreateNewCartItem(){
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(foodService.getFoodById(request.getFoodId())).thenReturn(food);
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenReturn(cart);
        Mockito.when(cartItemRepository.findByCartAndFood(Mockito.any(Cart.class), Mockito.any(Food.class))).thenReturn(Optional.empty());
        Mockito.when(cartItemRepository.save(Mockito.any(CartItem.class))).thenAnswer(invocation -> invocation.getArgument(0));

        //when
        CartItem result = cartService.addCartItemToCart(request);

        //then
        Assertions.assertNotNull(result);
        Assertions.assertEquals(1, result.getQuantity());
        Assertions.assertEquals(10, result.getTotalPrice());
        Mockito.verify(cartRepository, Mockito.times(2)).save(Mockito.any(Cart.class));
        Mockito.verify(cartItemRepository, Mockito.times(1)).save(Mockito.any(CartItem.class));
    }
    @Test
    public void addCartItemToCart_CartExistsAndCartItemExists_shouldUpdateQuantity(){
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(foodService.getFoodById(request.getFoodId())).thenReturn(food);
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenReturn(cart);
        Mockito.when(cartItemRepository.findByCartAndFood(cart, food)).thenReturn(Optional.of(cartItem));
        Mockito.when(cartItemRepository.save(Mockito.any(CartItem.class))).thenReturn(cartItem);

        //when
        CartItem result = cartService.addCartItemToCart(request);

        //then
        Assertions.assertNotNull(result);
        Assertions.assertEquals(3, result.getQuantity());
        Assertions.assertEquals(30, result.getTotalPrice());
        Mockito.verify(cartRepository, Mockito.times(1)).save(Mockito.any(Cart.class));
        Mockito.verify(cartItemRepository, Mockito.times(1)).save(Mockito.any(CartItem.class));
    }
    @Test
    public void updateQuantityOfCartItem_cartItemDoesNotExists_shouldThrowException(){
        Long cartItemId = 999L;
        int quantity = 1;

        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Mockito.when(cartItemRepository.findByIdAndCartId(cartItemId, cart.getId())).thenReturn(Optional.empty());

        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, () -> cartService.updateQuantityOfCartItem(cartItemId, quantity));
        Assertions.assertEquals("Cart item not found", ex.getMessage());
        Mockito.verify(cartItemRepository, Mockito.never()).save(Mockito.any(CartItem.class));
    }
    @Test
    public void updateQuantityOfCartItem_cartItemExistsAndFoodFound_shouldUpdateQuantity(){
        int newQuantity = 1;

        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(cartItemRepository.findByIdAndCartId(cartItem.getId(), cart.getId())).thenReturn(Optional.of(cartItem));
        Mockito.when(cartItemRepository.save(Mockito.any(CartItem.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenAnswer(invocation -> invocation.getArgument(0));

        CartItem result = cartService.updateQuantityOfCartItem(cartItem.getId(), newQuantity);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(newQuantity, result.getQuantity());
        Assertions.assertEquals(newQuantity * food.getPrice(), result.getTotalPrice());
        Mockito.verify(cartItemRepository, Mockito.times(1)).save(Mockito.any(CartItem.class));
    }
    @Test
    public void updateQuantityOfCartItem_cartItemExistsAndFoodNotFound_shouldThrowException() {
        cartItem.setFood(null);

        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(cartItemRepository.findByIdAndCartId(cartItem.getId(), cart.getId())).thenReturn(Optional.of(cartItem));
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenAnswer(invocation -> invocation.getArgument(0));

        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class,()-> cartService.updateQuantityOfCartItem(cartItem.getId(), 1));
        Assertions.assertEquals("Food not found", ex.getMessage());
        Mockito.verify(cartItemRepository, Mockito.never()).save(Mockito.any(CartItem.class));
    }
    @Test
    public void getCartItemById_cartEmpty_shouldThrowException() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.empty());

        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class,()-> cartService.getCartItemById(1L));
        Assertions.assertEquals("Cart is empty", ex.getMessage());
        Mockito.verify(cartItemRepository, Mockito.never()).findByIdAndCartId(Mockito.anyLong(), Mockito.anyLong());
    }
    @Test
    public void getCartItemById_cartItemDoesNotExists_shouldThrowException() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Mockito.when(cartItemRepository.findByIdAndCartId(999L, cart.getId())).thenReturn(Optional.empty());

        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class,()-> cartService.getCartItemById(999L));
        Assertions.assertEquals("Cart item not found", ex.getMessage());
        Mockito.verify(cartItemRepository, Mockito.times(1)).findByIdAndCartId(Mockito.anyLong(), Mockito.anyLong());
    }
    @Test
    public void getCartItemById_cartItemExists_shouldReturnCartItem() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Mockito.when(cartItemRepository.findByIdAndCartId(cartItem.getId(), cart.getId())).thenReturn(Optional.of(cartItem));

        CartItem result = cartService.getCartItemById(cartItem.getId());
        Assertions.assertNotNull(result);
        Assertions.assertEquals(cartItem.getId(), result.getId());
        Assertions.assertEquals(cartItem.getQuantity(), result.getQuantity());
        Assertions.assertEquals(cartItem.getTotalPrice(), result.getTotalPrice());
        Mockito.verify(cartItemRepository, Mockito.times(1)).findByIdAndCartId(Mockito.anyLong(), Mockito.anyLong());
    }
    @Test
    public void deleteCartItemFromCart_cartNotFound_shouldThrowException() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.empty());

        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class,()-> cartService.deleteCartItemFromCart(cartItem.getId()));
        Assertions.assertEquals("Cart not found", ex.getMessage());
        Mockito.verify(cartRepository, Mockito.never()).save(Mockito.any(Cart.class));
    }
    @Test
    public void deleteCartItemFromCart_cartItemNotFound_shouldThrowException() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Mockito.when(cartItemRepository.findByIdAndCartId(cartItem.getId(), cart.getId())).thenReturn(Optional.empty());

        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()-> cartService.deleteCartItemFromCart(cartItem.getId()));
        Assertions.assertEquals("Cart item not found", ex.getMessage());
    }
    @Test
    public void deleteCartItemFromCart_cartItemFound_shouldDeleteCartItem() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Mockito.when(cartItemRepository.findByIdAndCartId(cartItem.getId(), cart.getId())).thenReturn(Optional.of(cartItem));

        cartService.deleteCartItemFromCart(cartItem.getId());
        Mockito.verify(cartRepository, Mockito.times(3)).save(Mockito.any(Cart.class));
    }
    @Test
    public void calculateCartPrice_cartNotFound_shouldThrowException() {
        cart = null;
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->cartService.calculateCartPrice(cart));
        Assertions.assertEquals("Cart not found", ex.getMessage());
    }
    @Test
    public void calculateCartPrice_validRequest_shouldReturnPrice() {
        long result = cartService.calculateCartPrice(cart);
        Assertions.assertEquals(cart.getTotalPrice(), result);
    }
    @Test
    public void getCartById_cartNotFound_shouldThrowException() {
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->cartService.getCartById(999L));
        Assertions.assertEquals("Cart not found", ex.getMessage());
    }
    @Test
    public void getCartById_cartFound_shouldReturnCart() {
        Mockito.when(cartRepository.findById(cart.getId())).thenReturn(Optional.of(cart));
        Cart result = cartService.getCartById(cart.getId());
        Assertions.assertNotNull(result);
        Assertions.assertEquals(cart.getId(), result.getId());
        Assertions.assertEquals(cart.getTotalPrice(), result.getTotalPrice());
    }
    @Test
    public void getCartByUserLogin_cartNotFound_shouldReturnNull() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.empty());
        Cart result = cartService.getCartByUserLogin();
        Assertions.assertNull(result);
        Mockito.verify(cartRepository, Mockito.never()).save(Mockito.any(Cart.class));
    }
    @Test
    public void getCartByUserLogin_cartFound_shouldReturnCart() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Cart result = cartService.getCartByUserLogin();
        Assertions.assertNotNull(result);
        Assertions.assertEquals(cart.getId(), result.getId());
        Mockito.verify(cartRepository, Mockito.times(1)).save(Mockito.any(Cart.class));
    }
    @Test
    public void deleteCart_cartNotFound_shouldThrowException() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.empty());
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->cartService.deleteCart());
        Cart result = cartService.getCartByUserLogin();
        Assertions.assertEquals("Cart not found", ex.getMessage());
        Assertions.assertNull(result);
        Mockito.verify(cartRepository, Mockito.never()).save(Mockito.any(Cart.class));
    }
    @Test
    public void deleteCart_cartFound_shouldDeleteCart() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenAnswer(invocation -> invocation.getArgument(0));
        cartService.deleteCart();
        Mockito.verify(cartRepository).delete(Mockito.any(Cart.class));
    }
    @Test
    public void getCartItems_cartNotFound_shouldThrowException() {
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.empty());
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->cartService.getCartItems());
        Assertions.assertEquals("Cart not found", ex.getMessage());
        Mockito.verify(cartItemRepository, Mockito.never()).findByCart_Id(Mockito.anyLong());
    }
    @Test
    public void getCartItems_cartFound_shouldReturnCartItems() {
        CartItem cartItem2 = CartItem.builder()
                .quantity(2)
                .food(food)
                .cart(cart)
                .totalPrice(20)
                .build();
        cart.getCartItems().add(cartItem2);
        Mockito.when(userService.getUserLogin()).thenReturn(user);
        Mockito.when(cartRepository.findByCustomerId(user.getId())).thenReturn(Optional.of(cart));
        Mockito.when(cartRepository.save(Mockito.any(Cart.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Mockito.when(cartItemRepository.findByCart_Id(cart.getId())).thenReturn(cart.getCartItems());
        List<CartItem> result = cartService.getCartItems();
        Assertions.assertNotNull(result);
        Assertions.assertEquals(2, result.size());

    }



}
