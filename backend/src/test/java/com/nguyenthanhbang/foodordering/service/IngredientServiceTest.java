package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.IngredientRequest;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.model.Ingredient;
import com.nguyenthanhbang.foodordering.model.Restaurant;
import com.nguyenthanhbang.foodordering.repository.FoodRepository;
import com.nguyenthanhbang.foodordering.repository.IngredientRepository;
import com.nguyenthanhbang.foodordering.service.impl.IngredientServiceImpl;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class IngredientServiceTest {
    @Mock
    private IngredientRepository ingredientRepository;
    @Mock
    private RestaurantService restaurantService;
    @Mock
    private FoodRepository foodRepository;
    @InjectMocks
    private IngredientServiceImpl ingredientService;
    private Restaurant restaurant;
    private Ingredient ingredient;
    private IngredientRequest request;
    @BeforeEach
    public void setUp() {
        restaurant = Restaurant.builder()
                .name("restaurant")
                .build();
        restaurant.setId(1L);
        ingredient = Ingredient.builder()
                .name("ingredient")
                .restaurant(restaurant)
                .build();
        ingredient.setId(1L);
        request = new IngredientRequest();
        request.setName("ingredient");
    }
    @Test
    public void getIngredientsByRestaurant_restaurantNotFound_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->ingredientService.getIngredientsByRestaurant());
        Assertions.assertEquals("Restaurant not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository, Mockito.never()).findByRestaurantId(Mockito.anyLong());
    }
    @Test
    public void getIngredientsByRestaurant_restaurantFound_shouldReturnIngredients() {
        Ingredient ingredient2 = new Ingredient();
        ingredient2.setId(2L);
        ingredient2.setName("ingredient2");
        ingredient2.setRestaurant(restaurant);
        Ingredient ingredient3 = new Ingredient();
        ingredient3.setId(3L);
        ingredient3.setName("ingredient3");
        ingredient3.setRestaurant(restaurant);

        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByRestaurantId(restaurant.getId())).thenReturn(List.of(ingredient2, ingredient3));
        List<Ingredient> result = ingredientService.getIngredientsByRestaurant();
        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals("ingredient2", result.get(0).getName());
        Assertions.assertEquals("ingredient3", result.get(1).getName());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository).findByRestaurantId(Mockito.anyLong());
    }


    @Test
    public void getIngredientsByRestaurant_noIngredient_shouldReturnEmptyList() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByRestaurantId(restaurant.getId())).thenReturn(Collections.emptyList());
        List<Ingredient> result = ingredientService.getIngredientsByRestaurant();
        Assertions.assertEquals(0, result.size());
        Assertions.assertTrue(result.isEmpty());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository).findByRestaurantId(Mockito.anyLong());
    }

    @Test
    public void getIngredientByIdAndRestaurantId_restaurantNotFound_shouldThrowException() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->ingredientService.getIngredientByIdAndRestaurantId(ingredient.getId()));
        Assertions.assertEquals("Restaurant not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository, Mockito.never()).findByIdAndRestaurantId(Mockito.anyLong(),Mockito.anyLong());
    }

    @Test
    public void getIngredientByIdAndRestaurantId_ingredientNotFound_shouldThrowException() {
        Long ingredientId = 999L;
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByIdAndRestaurantId(ingredientId, restaurant.getId())).thenReturn(Optional.empty());
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->ingredientService.getIngredientByIdAndRestaurantId(ingredientId));
        Assertions.assertEquals("Ingredient not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository).findByIdAndRestaurantId(Mockito.anyLong(), Mockito.anyLong());
    }
    @Test
    public void getIngredientByIdAndRestaurantId_validRequest_shouldReturnIngredient() {
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByIdAndRestaurantId(ingredient.getId(), restaurant.getId())).thenReturn(Optional.of(ingredient));
        Ingredient result = ingredientService.getIngredientByIdAndRestaurantId(ingredient.getId());
        Assertions.assertNotNull(result);
        Assertions.assertEquals(ingredient, result);
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository).findByIdAndRestaurantId(ingredient.getId(), restaurant.getId());
    }
    @Test
    public void createIngredient_restaurantNotFound_shouldThrowException(){
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->ingredientService.createIngredient(request));
        Assertions.assertEquals("Restaurant not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository, Mockito.never()).save(Mockito.any(Ingredient.class));
    }
    @Test
    public void createIngredient_ingredientExists_shouldThrowException(){
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByNameAndRestaurantId(request.getName(), restaurant.getId())).thenReturn(Optional.of(ingredient));
        EntityExistsException ex = Assertions.assertThrows(EntityExistsException.class, ()->ingredientService.createIngredient(request));
        Assertions.assertEquals("Ingredient already exists", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository).findByNameAndRestaurantId(request.getName(), restaurant.getId());
        Mockito.verify(ingredientRepository, Mockito.never()).save(Mockito.any(Ingredient.class));
    }
    @Test
    public void createIngredient_validRequest_shouldCreateIngredient(){
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByNameAndRestaurantId(request.getName(), restaurant.getId())).thenReturn(Optional.empty());
        Mockito.when(ingredientRepository.save(Mockito.any(Ingredient.class))).thenAnswer(i->i.getArgument(0));
        Ingredient result = ingredientService.createIngredient(request);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(request.getName(), result.getName());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository).findByNameAndRestaurantId(request.getName(), restaurant.getId());
        Mockito.verify(ingredientRepository).save(Mockito.any(Ingredient.class));
    }
    @Test
    public void updateIngredient_restaurantNotFound_shouldThrowException(){
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->ingredientService.updateIngredient(ingredient.getId(), request));
        Assertions.assertEquals("Restaurant not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository, Mockito.never()).findByName(request.getName());
        Mockito.verify(ingredientRepository, Mockito.never()).findByIdAndRestaurantId(ingredient.getId(), restaurant.getId());
        Mockito.verify(ingredientRepository, Mockito.never()).save(Mockito.any(Ingredient.class));
    }
    @Test
    public void updateIngredient_ingredientNotFound_shouldThrowException(){
        Long ingredientId = 999L;
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByIdAndRestaurantId(ingredientId, restaurant.getId())).thenReturn(Optional.empty());
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->ingredientService.updateIngredient(ingredientId,request));
        Assertions.assertEquals("Ingredient not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository).findByIdAndRestaurantId(ingredientId, restaurant.getId());
        Mockito.verify(ingredientRepository, Mockito.never()).findByName(request.getName());
        Mockito.verify(ingredientRepository, Mockito.never()).save(Mockito.any(Ingredient.class));
    }
    @Test
    public void updateIngredient_nameExists_shouldThrowException(){
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByIdAndRestaurantId(ingredient.getId(), restaurant.getId())).thenReturn(Optional.of(ingredient));
        Mockito.when(ingredientRepository.findByName(request.getName())).thenReturn(ingredient);
        EntityExistsException ex = Assertions.assertThrows(EntityExistsException.class, ()->ingredientService.updateIngredient(ingredient.getId(),request));
        Assertions.assertEquals("Ingredient already exists", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository).findByIdAndRestaurantId(ingredient.getId(), restaurant.getId());
        Mockito.verify(ingredientRepository, Mockito.never()).save(Mockito.any(Ingredient.class));
    }
    @Test
    public void updateIngredient_validRequest_shouldUpdateIngredient(){
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByIdAndRestaurantId(ingredient.getId(), restaurant.getId())).thenReturn(Optional.of(ingredient));
        Mockito.when(ingredientRepository.findByName(request.getName())).thenReturn(null);
        Mockito.when(ingredientRepository.save(Mockito.any(Ingredient.class))).thenAnswer(i->i.getArgument(0));
        Ingredient result = ingredientService.updateIngredient(ingredient.getId(), request);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(request.getName(), result.getName());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository).findByIdAndRestaurantId(ingredient.getId(), restaurant.getId());
        Mockito.verify(ingredientRepository).findByName(request.getName());
        Mockito.verify(ingredientRepository).save(Mockito.any(Ingredient.class));
    }
    @Test
    public void deleteIngredientById_restaurantNotFound_shouldThrowException(){
        Mockito.when(restaurantService.getRestaurantOfUser()).thenThrow(new EntityNotFoundException("Restaurant not found"));
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->ingredientService.deleteIngredientById(ingredient.getId()));
        Assertions.assertEquals("Restaurant not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository, Mockito.never()).findByIdAndRestaurantId(ingredient.getId(), restaurant.getId());
        Mockito.verify(ingredientRepository, Mockito.never()).deleteById(ingredient.getId());
    }
    @Test
    public void deleteIngredientById_ingredientNotFound_shouldThrowException(){
        Long ingredientId = 999L;
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByIdAndRestaurantId(ingredientId, restaurant.getId())).thenReturn(Optional.empty());
        EntityNotFoundException ex = Assertions.assertThrows(EntityNotFoundException.class, ()->ingredientService.deleteIngredientById(ingredientId));
        Assertions.assertEquals("Ingredient not found", ex.getMessage());
        Mockito.verify(restaurantService).getRestaurantOfUser();
        Mockito.verify(ingredientRepository).findByIdAndRestaurantId(ingredientId, restaurant.getId());
        Mockito.verify(ingredientRepository, Mockito.never()).deleteById(ingredientId);
    }
    @Test
    public void deleteIngredientById_validRequest_shouldDeleteIngredient(){
        Food food = new Food();
        food.setName("Food");
        food.setIngredients(new ArrayList<>(List.of(ingredient)));
        Mockito.when(restaurantService.getRestaurantOfUser()).thenReturn(restaurant);
        Mockito.when(ingredientRepository.findByIdAndRestaurantId(ingredient.getId(), restaurant.getId())).thenReturn(Optional.of(ingredient));
        Mockito.when(foodRepository.findByIngredientsId(ingredient.getId())).thenReturn(List.of(food));
        ingredientService.deleteIngredientById(ingredient.getId());
        Assertions.assertFalse(food.getIngredients().contains(ingredient));
        Mockito.verify(ingredientRepository).deleteById(ingredient.getId());
    }


}
