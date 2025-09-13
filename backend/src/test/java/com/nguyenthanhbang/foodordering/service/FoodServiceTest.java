package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.FoodCriteria;
import com.nguyenthanhbang.foodordering.dto.request.FoodRequest;
import com.nguyenthanhbang.foodordering.dto.response.FoodStatistic;
import com.nguyenthanhbang.foodordering.dto.response.PaginationResponse;
import com.nguyenthanhbang.foodordering.model.Category;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.model.Ingredient;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.repository.FoodRepository;
import com.nguyenthanhbang.foodordering.repository.IngredientRepository;
import com.nguyenthanhbang.foodordering.service.impl.FoodServiceImpl;
import jakarta.persistence.EntityNotFoundException;
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
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FoodServiceTest {
    @Mock
    private FoodRepository foodRepository;
    @Mock
    private RestaurantService restaurantService;
    @Mock
    private CategoryService categoryService;
    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private FoodServiceImpl foodService;
    private Restaurant restaurant;
    private Category category;
    private List<Ingredient> ingredients;
    private FoodRequest request;
    private Food food;
    @BeforeEach
    void setUp() {
        restaurant = Restaurant.builder()
                .name("restaurant")
                .foods(new ArrayList<>())
                .build();
        restaurant.setId(1L);

        category = new Category();
        category.setId(1L);
        category.setName("category");

        Ingredient ingredient1 = new Ingredient();
        ingredient1.setId(1L);
        ingredient1.setName("Ingredient 1");

        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(2L);
        ingredient2.setName("Ingredient 2");

        ingredients = Arrays.asList(ingredient1, ingredient2);

        request = new FoodRequest();
        request.setName("request");
        request.setDescription("description");
        request.setPrice(100L);
        request.setFoodCategoryId(1L);
        request.setIngredients(Arrays.asList(1L, 2L));
        request.setSpicy(true);
        request.setVegetarian(false);
        request.setCuisine("Vietnamese");

        food = new Food();
        food.setId(1L);
        food.setName("food");
        food.setDescription("dscription");
        food.setPrice(100L);
        food.setAvailable(true);
        food.setRestaurant(restaurant);
        food.setFoodCategory(category);
        food.setIngredients(ingredients);
        food.setSpicy(true);
        food.setVegetarian(false);
        food.setCuisine("Vietnamese");
        food.setSold(10L);
    }
    @Test
    public void createFood_restaurantNotFound_shouldThrowException() {
        when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> foodService.createFood(request));
        assertEquals("Restaurant not found", ex.getMessage());
        verify(restaurantService).getRestaurantOfUser();
        verify(foodRepository, never()).save(any());
    }
    @Test
    public void createFood_IngredientsNotFound_shouldThrowException() {
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(categoryService.getCategoryByIdAndRestaurantId(1L)).thenReturn(category);
        when(ingredientRepository.findByIdInAndRestaurantId(Arrays.asList(1L, 2L), 1L))
                .thenReturn(new ArrayList<>());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> foodService.createFood(request));
        assertEquals("Ingredient not found", exception.getMessage());

        verify(restaurantService).getRestaurantOfUser();
        verify(categoryService).getCategoryByIdAndRestaurantId(1L);
        verify(ingredientRepository).findByIdInAndRestaurantId(Arrays.asList(1L, 2L), 1L);
        verify(foodRepository, never()).save(any(Food.class));
    }
    @Test
    public void createFood_categoryNotFound_shouldThrowException() {
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(categoryService.getCategoryByIdAndRestaurantId(1L)).thenThrow(new EntityNotFoundException("Category not found"));

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> foodService.createFood(request));
        assertEquals("Category not found", exception.getMessage());

        verify(restaurantService).getRestaurantOfUser();
        verify(categoryService).getCategoryByIdAndRestaurantId(1L);
        verify(foodRepository, never()).save(any(Food.class));
    }
    @Test
    public void createFood_validRequest_shouldCreateFood() {
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(categoryService.getCategoryByIdAndRestaurantId(1L)).thenReturn(category);
        when(ingredientRepository.findByIdInAndRestaurantId(Arrays.asList(1L, 2L), 1L))
                .thenReturn(ingredients);
        when(foodRepository.save(any(Food.class))).thenAnswer(i -> i.getArgument(0));

        Food result = foodService.createFood(request);

        assertNotNull(result);
        assertEquals("request", result.getName());
        assertEquals("description", result.getDescription());
        assertEquals("Vietnamese", result.getCuisine());
        assertEquals(category, result.getFoodCategory());
        assertEquals(restaurant, result.getRestaurant());
        assertEquals(ingredients, result.getIngredients());

        verify(restaurantService).getRestaurantOfUser();
        verify(categoryService).getCategoryByIdAndRestaurantId(1L);
        verify(ingredientRepository).findByIdInAndRestaurantId(Arrays.asList(1L, 2L), 1L);
        verify(foodRepository).save(any(Food.class));
    }

    @Test
    public void updateFood_validRequest_shouldUpdateFood() {
        Long foodId = 1L;
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(foodRepository.findByIdAndRestaurantId(foodId, 1L)).thenReturn(Optional.of(food));
        when(categoryService.getCategoryByIdAndRestaurantId(1L)).thenReturn(category);
        when(ingredientRepository.findByIdInAndRestaurantId(Arrays.asList(1L, 2L), 1L))
                .thenReturn(ingredients);
        when(foodRepository.save(any(Food.class))).thenAnswer(i -> i.getArgument(0));

        Food result = foodService.updateFood(foodId, request);

        assertNotNull(result);
        assertEquals("request", result.getName());
        verify(restaurantService).getRestaurantOfUser();
        verify(categoryService).getCategoryByIdAndRestaurantId(1L);
        verify(ingredientRepository).findByIdInAndRestaurantId(Arrays.asList(1L, 2L), 1L);
        verify(foodRepository).save(any(Food.class));
    }

    @Test
    public void updateFood_IngredientsNotFound_ThrowsException() {
        Long foodId = 1L;
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(foodRepository.findByIdAndRestaurantId(foodId, 1L)).thenReturn(Optional.of(food));
        when(categoryService.getCategoryByIdAndRestaurantId(1L)).thenReturn(category);
        when(ingredientRepository.findByIdInAndRestaurantId(Arrays.asList(1L, 2L), 1L))
                .thenReturn(new ArrayList<>());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> foodService.updateFood(foodId, request));
        assertEquals("Ingredient not found", exception.getMessage());
    }
    @Test
    public void getFoodsByRestaurant_success_shouldReturnPaginationResponse() {
        Pageable pageable = PageRequest.of(0, 5);
        List<Food> foods = Arrays.asList(food);
        Page<Food> foodPage = new PageImpl<>(foods, pageable, 1);

        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(foodRepository.findByRestaurantId(1L, pageable)).thenReturn(foodPage);

        PaginationResponse result = foodService.getFoodsByRestaurant(pageable);

        assertNotNull(result);
        assertEquals(1, result.getPagination().getPage());
        assertEquals(5, result.getPagination().getSize());
        assertEquals(1, result.getPagination().getTotalPages());
        assertEquals(1, result.getPagination().getTotalItems());

        verify(restaurantService).getRestaurantOfUser();
        verify(foodRepository).findByRestaurantId(1L, pageable);
    }
    @Test
    public void getAllFoods_withCriteria_shouldReturnPaginationResponse() {
        Long restaurantId = 1L;
        Pageable pageable = PageRequest.of(0, 5);
        FoodCriteria criteria = new FoodCriteria();
        criteria.setSpicy(true);
        criteria.setVegetarian(false);
        criteria.setAvailable(true);
        criteria.setCuisine("Vietnamese");
        criteria.setCategory("category");
        criteria.setPrices(Arrays.asList("from-100-to-200"));

        List<Food> foods = Arrays.asList(food);
        Page<Food> foodPage = new PageImpl<>(foods, pageable, 1);
        when(foodRepository.findAll(any(Specification.class), eq(pageable))).thenReturn(foodPage);

        PaginationResponse result = foodService.getAllFoods(restaurantId, pageable, criteria);

        assertNotNull(result);
        verify(foodRepository).findAll(any(Specification.class), eq(pageable));
    }
    @Test
    public void getFoodById_success_shouldReturnFood() {
        Long foodId = 1L;
        when(foodRepository.findById(foodId)).thenReturn(Optional.of(food));

        Food result = foodService.getFoodById(foodId);

        assertNotNull(result);
        assertEquals(food.getId(), result.getId());
        assertEquals(food.getName(), result.getName());
        verify(foodRepository).findById(foodId);
    }

    @Test
    public void getFoodById_notFound_shouldThrowsException() {
        Long foodId = 1L;
        when(foodRepository.findById(foodId)).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> foodService.getFoodById(foodId));
        assertEquals("Food not found", exception.getMessage());
        verify(foodRepository).findById(foodId);
    }
    @Test
    public void getFoodByIdAndRestaurantId_success_shouldReturnFood() {
        Long foodId = 1L;
        Long restaurantId = 1L;
        when(foodRepository.findByIdAndRestaurantId(foodId, restaurantId)).thenReturn(Optional.of(food));

        Food result = foodService.getFoodByIdAndRestaurantId(foodId, restaurantId);

        assertNotNull(result);
        assertEquals(food.getId(), result.getId());
        verify(foodRepository).findByIdAndRestaurantId(foodId, restaurantId);
    }

    @Test
    public void getFoodByIdAndRestaurantId_notFound_shouldThrowsException() {
        Long foodId = 1L;
        Long restaurantId = 1L;
        when(foodRepository.findByIdAndRestaurantId(foodId, restaurantId)).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> foodService.getFoodByIdAndRestaurantId(foodId, restaurantId));
        assertEquals("Food not found", exception.getMessage());
    }
    @Test
    public void deleteFood_success_shouldDeleteFood() {
        Long foodId = 1L;
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(foodRepository.findByIdAndRestaurantId(foodId, 1L)).thenReturn(Optional.of(food));
        when(foodRepository.save(any(Food.class))).thenReturn(food);

        foodService.deleteFood(foodId);
        assertFalse(food.getActive());
        verify(restaurantService).getRestaurantOfUser();
        verify(foodRepository).findByIdAndRestaurantId(foodId, 1L);
        verify(foodRepository).save(Mockito.any(Food.class));
    }
    public void updateAvailability_validRequest_shouldUpdateAvailability() {
        Long foodId = 1L;
        food.setAvailable(true);
        when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        when(foodRepository.findByIdAndRestaurantId(foodId, 1L)).thenReturn(Optional.of(food));
        when(foodRepository.save(any(Food.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Food result = foodService.updateAvailability(foodId);

        assertNotNull(result);
        assertFalse(result.isAvailable());
        verify(restaurantService).getRestaurantOfUser();
        verify(foodRepository).findByIdAndRestaurantId(foodId, 1L);
        verify(foodRepository).save(any(Food.class));
    }
    @Test
    public void getLatestFoods_success_shouldReturnFoods() {
        List<Food> latestFoods = Arrays.asList(food);
        when(foodRepository.findTop5ByOrderByCreatedDateDesc()).thenReturn(latestFoods);

        List<Food> result = foodService.getLatestFoods();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(food, result.get(0));
        verify(foodRepository).findTop5ByOrderByCreatedDateDesc();
    }
    @Test
    public void getPopularFoods_success_shouldReturnFoods() {
        List<Food> popularFoods = Arrays.asList(food);
        when(foodRepository.findTop5ByOrderBySoldDesc()).thenReturn(popularFoods);

        List<Food> result = foodService.getPopularFoods();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(food, result.get(0));
        verify(foodRepository).findTop5ByOrderBySoldDesc();
    }

    @Test
    void getFoodStatistic_success_shouldReturnFoodStatistics() {
        Long restaurantId = 1L;
        List<Food> foods = Arrays.asList(food);
        when(foodRepository.findTop5ByRestaurantId(restaurantId)).thenReturn(foods);

        List<FoodStatistic> result = foodService.getFoodStatistic(restaurantId);

        assertNotNull(result);
        assertEquals(1, result.size());
        FoodStatistic statistic = result.get(0);
        assertEquals(food.getName(), statistic.getName());
        assertEquals(food.getSold(), statistic.getSold());
        verify(foodRepository).findTop5ByRestaurantId(restaurantId);
    }


}
