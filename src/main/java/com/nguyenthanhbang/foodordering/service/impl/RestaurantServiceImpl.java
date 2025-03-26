package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.RestaurantRequest;
import com.nguyenthanhbang.foodordering.model.Address;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.AddressRepositoy;
import com.nguyenthanhbang.foodordering.repository.RestaurantRepository;
import com.nguyenthanhbang.foodordering.repository.UserRepository;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import com.nguyenthanhbang.foodordering.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final UserService userService;
    private final RestaurantRepository restaurantRepository;
    private final AddressRepositoy addressRepositoy;
    private final UserRepository userRepository;

    @Override
    public Restaurant createRestaurant(RestaurantRequest request) throws Exception {
        User user = userService.getUserLogin();
        Address address = addressRepositoy.save(request.getAddress());
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
    public Restaurant updateRestaurant(Long restaurantId, RestaurantRequest request) throws Exception {
        Restaurant restaurant = this.getRestaurantById(restaurantId);
        if(restaurant == null){
            throw new Exception("Restaurant with ID = " + restaurantId + " not found");
        }
        Address address = addressRepositoy.save(request.getAddress());
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
    public List<Restaurant> getAllRestaurants() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        return restaurants;
    }

    @Override
    public Restaurant getRestaurantById(Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() -> new Exception("Restaurant with ID = " + restaurantId + " not found"));
        return restaurant;
    }

    @Override
    public Restaurant getRestaurantOfUser() throws Exception {
        User user = userService.getUserLogin();
        return restaurantRepository.findByOwner(user);
    }

    @Override
    public Restaurant updateStatusOfRestaurant() throws Exception {
        Restaurant restaurant = this.getRestaurantOfUser();
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant addRestaurantToFavourites(Long restaurantId) throws Exception {
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
    public List<Restaurant> getFavouriteRestaurants() throws Exception {
        User user = userService.getUserLogin();
        return user.getFavourites();
    }

}
