package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.RestaurantRequest;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Address;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.AddressRepository;
import com.nguyenthanhbang.foodordering.repository.RestaurantRepository;
import com.nguyenthanhbang.foodordering.repository.UserRepository;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import com.nguyenthanhbang.foodordering.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final UserService userService;
    private final RestaurantRepository restaurantRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    @Override
    public List<Restaurant> searchRestaurants(String keyword) {
        return restaurantRepository.search(keyword);
    }


    @Override
    public Restaurant createRestaurant(RestaurantRequest request){
        User user = userService.getUserLogin();
        Address address = addressRepository.save(request.getAddress());
        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setImages(request.getImages());
        restaurant.setDescription(request.getDescription());
        restaurant.setContactInformation(request.getContactInformation());
        restaurant.setOpeningHours(request.getOpeningHours());
        restaurant.setOpen(false);
        restaurant.setOwner(user);
        restaurant.setAddress(address);
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(RestaurantRequest request) {
        Restaurant restaurant = this.getRestaurantOfUser();
        Address address = addressRepository.save(request.getAddress());
        restaurant.setName(request.getName());
        restaurant.setAddress(request.getAddress());
        restaurant.setImages(request.getImages());
        restaurant.setDescription(request.getDescription());
        restaurant.setContactInformation(request.getContactInformation());
        restaurant.setOpeningHours(request.getOpeningHours());
        restaurant.setAddress(address);
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) {
        restaurantRepository.deleteById(restaurantId);
    }

    @Override
    public PaginationResponse getAllRestaurants(Pageable pageable) {
        Page<Restaurant> restaurantPage = restaurantRepository.findAll(pageable);
        PaginationResponse.Pagination pagination = PaginationResponse.Pagination.builder()
                .page(pageable.getPageNumber() + 1)
                .size(pageable.getPageSize())
                .totalPages(restaurantPage.getTotalPages())
                .totalItems(restaurantPage.getTotalElements())
                .build();
        PaginationResponse paginationResponse = PaginationResponse.builder()
                .pagination(pagination)
                .items(restaurantPage.getContent())
                .build();
        return paginationResponse;
    }

    @Override
    public Restaurant getRestaurantById(Long restaurantId)  {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() -> new EntityNotFoundException("Restaurant with ID = " + restaurantId + " not found"));
        return restaurant;
    }

    @Override
    public Restaurant getRestaurantOfUser() {
        User user = userService.getUserLogin();
        Restaurant restaurant = restaurantRepository.findByOwner(user).orElseThrow(() -> new EntityNotFoundException("Restaurant not found"));
        return restaurant;
    }

    @Override
    public Restaurant updateStatusOfRestaurant()  {
        Restaurant restaurant = this.getRestaurantOfUser();
        if(restaurant == null){
            throw new EntityNotFoundException("Restaurant not found");
        }
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant addRestaurantToFavourites(Long restaurantId) {
        Restaurant restaurant = this.getRestaurantById(restaurantId);
        User user = userService.getUserLogin();
        if(user.getFavourites().contains(restaurant)){
            user.getFavourites().remove(restaurant);
        }else {
            user.getFavourites().add(restaurant);
        }
        user = userRepository.save(user);
        return restaurant;
    }

    @Override
    public List<Restaurant> getFavouriteRestaurants() {
        User user = userService.getUserLogin();
        return user.getFavourites();
    }

}
