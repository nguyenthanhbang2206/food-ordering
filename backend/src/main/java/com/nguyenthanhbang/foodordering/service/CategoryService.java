package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CategoryRequest;
import com.nguyenthanhbang.foodordering.model.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryRequest request);
    Category updateCategory(Long categoryId, CategoryRequest request);
    List<Category> getCategoriesByRestaurant();
    void deleteCategory(Long categoryId);
    Category getCategoryByIdAndRestaurantId(Long categoryId);
    List<Category> getCategoriesByRestaurantId(Long restaurantId);
}
