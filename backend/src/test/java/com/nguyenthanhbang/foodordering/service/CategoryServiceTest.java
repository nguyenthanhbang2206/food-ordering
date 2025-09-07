package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.CategoryRequest;
import com.nguyenthanhbang.foodordering.model.Category;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.repository.CategoryRepository;
import com.nguyenthanhbang.foodordering.service.impl.CategoryServiceImpl;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.checkerframework.checker.units.qual.A;
import org.checkerframework.checker.units.qual.N;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {
    @Mock
    private RestaurantService restaurantService;
    @Mock
    private CategoryRepository categoryRepository;
    @InjectMocks
    private CategoryServiceImpl categoryService;
    private Restaurant restaurant;
    private Category category;
    private CategoryRequest request;
    @BeforeEach
    public void setUp() {
        restaurant = Restaurant.builder()
                .name("restaurant name")
                .open(true)
                .description("restaurant description")
                .build();
        restaurant.setId(1L);

        category = Category.builder()
                .name("category name")
                .restaurant(restaurant)
                .build();
        category.setId(1L);
        request = new CategoryRequest();
        request.setName("request name");
    }

    @Test
    public void createCategory_restaurantNotFound_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->categoryService.createCategory(request));
        Assertions.assertEquals("Restaurant not found", ex.getMessage());
        Mockito.verify(categoryRepository, Mockito.never()).save(Mockito.any(Category.class));
    }
    @Test
    public void createCategory_categoryExists_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(categoryRepository.findByNameAndRestaurantId(request.getName(), restaurant.getId())).thenReturn(Optional.of(category));
        EntityExistsException ex = Assertions.assertThrows(EntityExistsException.class, ()->categoryService.createCategory(request));
        Assertions.assertEquals("Category already exists",ex.getMessage());
        Mockito.verify(categoryRepository, Mockito.never()).save(Mockito.any(Category.class));
    }
    @Test
    public void createCategory_validRequest_shouldCreateCategory() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(categoryRepository.findByNameAndRestaurantId(request.getName(), restaurant.getId())).thenReturn(Optional.empty());
        Mockito.when(categoryRepository.save(Mockito.any(Category.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Category result = categoryService.createCategory(request);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(request.getName(), result.getName());
        Mockito.verify(categoryRepository, Mockito.times(1)).save(Mockito.any(Category.class));
    }
    @Test
    public void updateCategory_categoryNotFound_shouldThrowException() {
        Long categoryId = 999L;
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(categoryRepository.findByIdAndRestaurantId(categoryId, restaurant.getId())).thenReturn(Optional.empty());
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->categoryService.updateCategory(categoryId,request));
        Assertions.assertEquals(ex.getMessage(), "Category not found");
        Mockito.verify(categoryRepository, Mockito.never()).save(Mockito.any(Category.class));
    }
    @Test
    public void updateCategory_restaurantNotFound_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->categoryService.updateCategory(category.getId(), request));
        Assertions.assertEquals(ex.getMessage(), "Restaurant not found");
        Mockito.verify(categoryRepository, Mockito.never()).save(Mockito.any(Category.class));
    }
    @Test
    public void updateCategory_validRequest_shouldUpdate() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(categoryRepository.findByIdAndRestaurantId(category.getId(), restaurant.getId())).thenReturn(Optional.of(category));
        Mockito.when(categoryRepository.save(Mockito.any(Category.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Category result = categoryService.updateCategory(category.getId(), request);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(request.getName(), result.getName());
        Mockito.verify(categoryRepository, Mockito.times(1)).save(Mockito.any(Category.class));
    }
    @Test
    public void getCategoriesByRestaurant_restaurantNotFound_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->categoryService.updateCategory(category.getId(), request));
        Assertions.assertEquals(ex.getMessage(), "Restaurant not found");
        Mockito.verify(categoryRepository, Mockito.never()).findByRestaurantId(Mockito.anyLong());
    }
    @Test
    public void getCategoriesByRestaurant_validRequest_shouldReturnCategories() {
        Category category1 = Category.builder()
                .name("category1")
                .restaurant(restaurant)
                .build();
        Category category2 = Category.builder()
                .name("category2")
                .restaurant(restaurant)
                .build();
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(categoryRepository.findByRestaurantId(restaurant.getId())).thenReturn(Arrays.asList(category1, category2));
        List<Category> result = categoryService.getCategoriesByRestaurant();
        Assertions.assertNotNull(result);
        Assertions.assertEquals(2, result.size());
        Mockito.verify(categoryRepository, Mockito.times(1)).findByRestaurantId(restaurant.getId());
    }
    @Test
    public void deleteCategory_categoryNotFound_shouldThrowException() {
        Long categoryId = 999L;
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(categoryRepository.findByIdAndRestaurantId(categoryId, restaurant.getId())).thenReturn(Optional.empty());
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->categoryService.deleteCategory(categoryId));
        Assertions.assertEquals("Category not found", ex.getMessage());
    }
    @Test
    public void deleteCategory_validRequest_shouldDeleteCategory() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(categoryRepository.findByIdAndRestaurantId(category.getId(), restaurant.getId())).thenReturn(Optional.of(category));
        categoryService.deleteCategory(category.getId());
        Mockito.verify(categoryRepository).save(Mockito.any(Category.class));
    }
    @Test
    public void getCategoryByIdAndRestaurantId_restaurantNotFound_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->categoryService.getCategoryByIdAndRestaurantId(category.getId()));
        Assertions.assertEquals("Restaurant not found", ex.getMessage());
        Mockito.verify(categoryRepository, Mockito.never()).findByIdAndRestaurantId(Mockito.anyLong(), Mockito.anyLong());
    }
    @Test
    public void getCategoryByIdAndRestaurantId_categoryNotFound_shouldThrowException() {
        Long categoryId = 999L;
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(categoryRepository.findByIdAndRestaurantId(categoryId, restaurant.getId())).thenReturn(Optional.empty());
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->categoryService.getCategoryByIdAndRestaurantId(categoryId));
        Assertions.assertEquals("Category not found", ex.getMessage());
    }
    @Test
    public void getCategoryByIdAndRestaurantId_validRequest_shouldReturnCategory() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(categoryRepository.findByIdAndRestaurantId(category.getId(), restaurant.getId())).thenReturn(Optional.of(category));
        Category result = categoryService.getCategoryByIdAndRestaurantId(category.getId());
        Assertions.assertNotNull(result);
        Assertions.assertEquals(category.getName(), result.getName());
        Mockito.verify(categoryRepository, Mockito.times(1)).findByIdAndRestaurantId(Mockito.anyLong(), Mockito.anyLong());
    }
    @Test
    public void getCategoriesByRestaurantId_restaurantNotFound_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->categoryService.getCategoryByIdAndRestaurantId(category.getId()));
        Assertions.assertEquals("Restaurant not found", ex.getMessage());
        Mockito.verify(categoryRepository,Mockito.never()).findByRestaurantId(Mockito.anyLong());
    }
    @Test
    public void getCategoriesByRestaurantId_validRequest_shouldReturnCategories() {
        Category category1 = Category.builder()
                .name("category1")
                .restaurant(restaurant)
                .build();
        Category category2 = Category.builder()
                .name("category2")
                .restaurant(restaurant)
                .build();
        Mockito.when(restaurantService.getRestaurantById(restaurant.getId())).thenReturn(restaurant);
        Mockito.when(categoryRepository.findByRestaurantId(restaurant.getId())).thenReturn(Arrays.asList(category1, category2));
        List<Category> result = categoryService.getCategoriesByRestaurantId(restaurant.getId());
        Assertions.assertNotNull(result);
        Assertions.assertEquals(2, result.size());
        Mockito.verify(categoryRepository, Mockito.times(1)).findByRestaurantId(restaurant.getId());
    }
}
