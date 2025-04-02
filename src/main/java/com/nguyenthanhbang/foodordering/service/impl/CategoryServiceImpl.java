package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.dto.request.CategoryRequest;
import com.nguyenthanhbang.foodordering.model.Category;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.repository.CategoryRepository;
import com.nguyenthanhbang.foodordering.service.CategoryService;
import com.nguyenthanhbang.foodordering.service.RestaurantService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final RestaurantService restaurantService;
    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CategoryRequest request) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Optional<Category> opt = categoryRepository.findByNameAndRestaurantId(request.getName(), restaurant.getId());
        if(opt.isPresent()) {
            throw new EntityExistsException("Category already exists");
        }
        Category category = new Category();
        category.setName(request.getName());
        category.setRestaurant(restaurant);
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long categoryId,CategoryRequest request) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Category category = this.getCategoryByIdAndRestaurantId(categoryId);
        category.setName(request.getName());
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getCategoriesByRestaurant() {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        return categoryRepository.findByRestaurantId(restaurant.getId());
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category category = this.getCategoryByIdAndRestaurantId(categoryId);
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public Category getCategoryByIdAndRestaurantId(Long categoryId) {
        Restaurant restaurant = restaurantService.getRestaurantOfUser();
        Category category = categoryRepository.findByIdAndRestaurantId(categoryId, restaurant.getId()).orElseThrow(() -> new EntityNotFoundException("Category not found"));
        return category;
    }
}
