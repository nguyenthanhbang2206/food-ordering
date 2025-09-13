package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.RestaurantRequest;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.enums.Role;
import com.nguyenthanhbang.foodordering.model.Address;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.*;
import com.nguyenthanhbang.foodordering.service.impl.RestaurantServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.*;

import static org.hamcrest.Matchers.any;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RestaurantServiceTest {
    @Mock
    private UserService userService;
    @Mock
    private RestaurantRepository restaurantRepository;
    @Mock
    private AddressRepository addressRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private FoodRepository foodRepository;
    @Mock
    private OrderRepository orderRepository;
    @InjectMocks
    private RestaurantServiceImpl restaurantService;

    private User user;
    private Restaurant restaurant;
    private RestaurantRequest request;
    private Address address;

    @BeforeEach
    public void setUp() {
        user = User.builder()
                .fullName("Nguyen Van A")
                .role(Role.RESTAURANT_OWNER)
                .email("a@gmail.com")
                .favourites(new ArrayList<>())
                .build();
        user.setId(1L);

        restaurant = Restaurant.builder()
                .name("restaurant")
                .owner(user)
                .open(true)
                .build();
        restaurant.setId(1L);

        address = Address.builder()
                .city("HN")
                .district("HN")
                .street("HN")
                .ward("HN")
                .build();
        address.setId(1L);

        request = new RestaurantRequest();
        request.setName("request");
        request.setAddress(address);
    }

    @Test
    public void searchRestaurants_NoRestaurant_shouldReturnEmptyList() {
        when(restaurantRepository.search("keyword")).thenReturn(Collections.emptyList());
        List<Restaurant> restaurants = restaurantService.searchRestaurants("keyword");
        verify(restaurantRepository, Mockito.times(1)).search("keyword");
    }
    @Test
    public void searchRestaurants_RestaurantFound_shouldReturnRestaurantList() {
        when(restaurantRepository.search("restaurant")).thenReturn(List.of(restaurant));
        List<Restaurant> result = restaurantService.searchRestaurants("restaurant");
        assertEquals(1, result.size());
        assertEquals(restaurant, result.get(0));
        verify(restaurantRepository, Mockito.times(1)).search("restaurant");
    }
    @Test
    public void createRestaurant_userNotFound_shouldThrowException() {
        when(userService.getUserLogin()).thenThrow(new EntityNotFoundException("User not found"));
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.createRestaurant(request));
        assertEquals("User not found", ex.getMessage());
        verify(userService, Mockito.times(1)).getUserLogin();
        verify(restaurantRepository, Mockito.never()).save(restaurant);
        verify(addressRepository, Mockito.never()).save(Mockito.any(Address.class));
    }
    @Test
    public void createRestaurant_validRequest_shouldCreateRestaurant() {
        when(userService.getUserLogin()).thenReturn(user);
        when(addressRepository.save(request.getAddress())).thenAnswer(i->i.getArgument(0));
        when(restaurantRepository.save(Mockito.any(Restaurant.class))).thenAnswer(i->i.getArgument(0));
        Restaurant result = restaurantService.createRestaurant(request);
        Assertions.assertNotNull(result);
        assertEquals("request", result.getName());
        verify(userService, Mockito.times(1)).getUserLogin();
        verify(restaurantRepository, Mockito.times(1)).save(Mockito.any(Restaurant.class));
        verify(addressRepository, Mockito.times(1)).save(Mockito.any(Address.class));
    }
    @Test
    public void updateRestaurant_restaurantNotFound_shouldThrowException() {
        when(userService.getUserLogin()).thenReturn(user);
        when(restaurantRepository.findByOwner(user)).thenReturn(Optional.empty());
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.updateRestaurant(request));
        assertEquals("Restaurant not found", ex.getMessage());
        verify(userService, Mockito.times(1)).getUserLogin();
        verify(restaurantRepository, Mockito.times(1)).findByOwner(user);
        verify(restaurantRepository, Mockito.never()).save(Mockito.any(Restaurant.class));
    }
    @Test
    public void updateRestaurant_userNotFound_shouldThrowException() {
        when(userService.getUserLogin()).thenThrow(new EntityNotFoundException("User not found"));
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.updateRestaurant(request));
        assertEquals("User not found", ex.getMessage());
        verify(userService, Mockito.times(1)).getUserLogin();
        verify(restaurantRepository, Mockito.never()).findById(999L);
        verify(restaurantRepository, Mockito.never()).save(Mockito.any(Restaurant.class));
    }
    @Test
    public void updateRestaurant_validRequest_shouldUpdateRestaurant() {
        when(userService.getUserLogin()).thenReturn(user);
        when(restaurantRepository.findByOwner(user)).thenReturn(Optional.of(restaurant));
        when(addressRepository.save(request.getAddress())).thenReturn(address);
        when(restaurantRepository.save(Mockito.any(Restaurant.class))).thenAnswer(i->i.getArgument(0));
        Restaurant result = restaurantService.updateRestaurant(request);
        assertNotNull(result);
        assertEquals("request", result.getName());
        verify(userService, Mockito.times(1)).getUserLogin();
        verify(restaurantRepository, Mockito.times(1)).findByOwner(user);
        verify(addressRepository, Mockito.times(1)).save(Mockito.any(Address.class));
        verify(restaurantRepository, Mockito.times(1)).save(Mockito.any(Restaurant.class));
    }


    @Test
    public void deleteRestaurant_restaurantNotFound_shouldThrowException() {
        when(restaurantRepository.findById(999L)).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.deleteRestaurant(999L));
        assertEquals("Restaurant not found", ex.getMessage());
        verify(userService, Mockito.never()).getUserLogin();
        verify(restaurantRepository, Mockito.times(1)).findById(999L);
        verify(restaurantRepository, Mockito.never()).save(Mockito.any(Restaurant.class));
    }

    @Test
    public void deleteRestaurant_userNotFound_shouldThrowException() {
        when(restaurantRepository.findById(1L)).thenReturn(Optional.of(restaurant));
        when(userService.getUserLogin()).thenThrow(new EntityNotFoundException("User not found"));
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.deleteRestaurant(1L));
        assertEquals("User not found", ex.getMessage());
        verify(userService, Mockito.times(1)).getUserLogin();
        verify(restaurantRepository, Mockito.times(1)).findById(1L);
        verify(restaurantRepository, Mockito.never()).save(Mockito.any(Restaurant.class));
    }

    @Test
    public void deleteRestaurant_userNotOwner_shouldDeleteRestaurant() {
        User user2 = new User();
        user2.setId(2L);
        restaurant.setOwner(user2);
        when(restaurantRepository.findById(1L)).thenReturn(Optional.of(restaurant));
        when(userService.getUserLogin()).thenReturn(user);
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.deleteRestaurant(1L));
        assertEquals("Restaurant not found", ex.getMessage());
    }

    @Test
    public void deleteRestaurant_validRequest_shouldDeleteRestaurant() {
        when(restaurantRepository.findById(1L)).thenReturn(Optional.of(restaurant));
        when(userService.getUserLogin()).thenReturn(user);
        restaurantService.deleteRestaurant(1L);
        verify(restaurantRepository, Mockito.times(1)).findById(1L);
        verify(restaurantRepository, Mockito.times(1)).save(Mockito.any(Restaurant.class));
        verify(userService, Mockito.times(1)).getUserLogin();
    }

    @Test
    void getAllRestaurants_ShouldReturnPaginationResponse() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Restaurant> restaurants = Arrays.asList(restaurant);
        Page<Restaurant> restaurantPage = new PageImpl<>(restaurants, pageable, 1);

        when(restaurantRepository.findAll(pageable)).thenReturn(restaurantPage);

        PaginationResponse result = restaurantService.getAllRestaurants(pageable);

        assertNotNull(result);
        assertNotNull(result.getPagination());
        assertEquals(1, result.getPagination().getPage());
        assertEquals(5, result.getPagination().getSize());
        assertEquals(1, result.getPagination().getTotalPages());
        assertEquals(1L, result.getPagination().getTotalItems());
        assertEquals(restaurants, result.getItems());
        verify(restaurantRepository).findAll(pageable);
    }

    @Test
    void getRestaurantById_WhenRestaurantExists_ShouldReturnRestaurant() {
        Long restaurantId = 1L;
        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.of(restaurant));

        Restaurant result = restaurantService.getRestaurantById(restaurantId);

        assertNotNull(result);
        assertEquals(restaurant, result);
        verify(restaurantRepository).findById(restaurantId);
    }

    @Test
    void getRestaurantById_WhenRestaurantNotFound_ShouldThrowException() {
        Long restaurantId = 999L;
        when(restaurantRepository.findById(restaurantId)).thenReturn(Optional.empty());

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.getRestaurantById(restaurantId));
        assertEquals("Restaurant with ID = 999 not found", ex.getMessage());
    }

    @Test
    void getRestaurantOfUser_WhenRestaurantExists_ShouldReturnRestaurant() {
        when(userService.getUserLogin()).thenReturn(user);
        when(restaurantRepository.findByOwner(user)).thenReturn(Optional.of(restaurant));

        Restaurant result = restaurantService.getRestaurantOfUser();

        assertNotNull(result);
        assertEquals(restaurant, result);
        verify(userService).getUserLogin();
        verify(restaurantRepository).findByOwner(user);
    }

    @Test
    void getRestaurantOfUser_WhenRestaurantNotFound_ShouldThrowException() {
        when(userService.getUserLogin()).thenReturn(user);
        when(restaurantRepository.findByOwner(user)).thenReturn(Optional.empty());

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.getRestaurantOfUser());
        assertEquals("Restaurant not found", ex.getMessage());
    }



    @Test
    public void updateStatusOfRestaurant_restaurantNotFound_shouldThrowException() {
        when(userService.getUserLogin()).thenReturn(user);
        when(restaurantRepository.findByOwner(user)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> restaurantService.updateStatusOfRestaurant());
        verify(restaurantRepository, Mockito.times(1)).findByOwner(user);
        verify(userService, Mockito.times(1)).getUserLogin();
        verify(restaurantRepository, Mockito.never()).save(Mockito.any(Restaurant.class));
    }

    @Test
    public void updateStatusOfRestaurant_validRequest_shouldToggleStatus() {
        restaurant.setOpen(false);
        when(userService.getUserLogin()).thenReturn(user);
        when(restaurantRepository.findByOwner(user)).thenReturn(Optional.of(restaurant));
        when(restaurantRepository.save(Mockito.any(Restaurant.class))).thenAnswer(i -> i.getArgument(0));

        Restaurant result = restaurantService.updateStatusOfRestaurant();

        assertNotNull(result);
        assertTrue(restaurant.isOpen());
        verify(restaurantRepository).save(restaurant);
    }

    @Test
    public void addRestaurantToFavourites_restaurantNotFound_shouldThrowException() {
        when(restaurantRepository.findById(999L)).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.addRestaurantToFavourites(999L));
        assertEquals("Restaurant not found", ex.getMessage());
        verify(userService, Mockito.never()).getUserLogin();
        verify(restaurantRepository, Mockito.times(1)).findById(999L);
        verify(userRepository, Mockito.never()).save(Mockito.any(User.class));
    }

    @Test
    public void addRestaurantToFavourites_userNotFound_shouldThrowException() {
        when(restaurantRepository.findById(1L)).thenReturn(Optional.of(restaurant));
        when(userService.getUserLogin()).thenThrow(new EntityNotFoundException("User not found"));
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.addRestaurantToFavourites(1L));
        assertEquals("User not found", ex.getMessage());
        verify(restaurantRepository, Mockito.times(1)).findById(1L);
        verify(userService, Mockito.times(1)).getUserLogin();
        verify(userRepository, Mockito.never()).save(Mockito.any(User.class));
    }

    @Test
    public void addRestaurantToFavourites_notInFavourite_shouldAddRestaurant() {
        when(restaurantRepository.findById(1L)).thenReturn(Optional.of(restaurant));
        when(userService.getUserLogin()).thenReturn(user);
        when(userRepository.save(Mockito.any(User.class))).thenAnswer(i->i.getArgument(0));
        Restaurant result = restaurantService.addRestaurantToFavourites(1L);
        assertNotNull(result);
        assertTrue(user.getFavourites().contains(result));
        assertEquals(restaurant, result);
    }
    @Test
    public void addRestaurantToFavourites_inFavourite_shouldRemoveRestaurant() {
        user.getFavourites().add(restaurant);
        when(restaurantRepository.findById(1L)).thenReturn(Optional.of(restaurant));
        when(userService.getUserLogin()).thenReturn(user);
        when(userRepository.save(Mockito.any(User.class))).thenAnswer(i->i.getArgument(0));
        Restaurant result = restaurantService.addRestaurantToFavourites(1L);
        assertNotNull(result);
        assertFalse(user.getFavourites().contains(result));
        assertEquals(restaurant, result);
    }
    @Test
    public void getFavouriteRestaurants_userNotFound_shouldThrowException() {
        when(userService.getUserLogin()).thenThrow(new EntityNotFoundException("User not found"));
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> restaurantService.getFavouriteRestaurants());
        assertEquals("User not found", ex.getMessage());

    }
    @Test
    public void getFavouriteRestaurants_noRestaurant_shouldReturnEmptyList() {
        user.setFavourites(new ArrayList<>());
        when(userService.getUserLogin()).thenReturn(user);
        List<Restaurant> result = restaurantService.getFavouriteRestaurants();
        assertNotNull(result);
        assertEquals(0, result.size());
        verify(userService, Mockito.times(1)).getUserLogin();
    }
    @Test
    public void getFavouriteRestaurants_validRequest_shouldReturnRestaurants() {
        user.setFavourites(Arrays.asList(restaurant));
        when(userService.getUserLogin()).thenReturn(user);
        List<Restaurant> result = restaurantService.getFavouriteRestaurants();
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(userService, Mockito.times(1)).getUserLogin();
    }
}
