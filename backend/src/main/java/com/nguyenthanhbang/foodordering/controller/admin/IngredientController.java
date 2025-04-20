package com.nguyenthanhbang.foodordering.controller.admin;

import com.nguyenthanhbang.foodordering.dto.request.IngredientRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.Ingredient;
import com.nguyenthanhbang.foodordering.service.IngredientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class IngredientController {
    private final IngredientService ingredientService;
    @PostMapping("/restaurants/ingredients")
    public ResponseEntity<ApiResponse<Ingredient>> createIngredient(@Valid @RequestBody IngredientRequest request) {
        Ingredient ingredient = ingredientService.createIngredient(request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("Create ingredient successful")
                .data(ingredient)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @PutMapping("/restaurants/ingredients/{ingredientId}")
    public ResponseEntity<ApiResponse<Ingredient>> updateIngredient(@PathVariable Long ingredientId,@Valid @RequestBody IngredientRequest request)  {
        Ingredient ingredient = ingredientService.updateIngredient(ingredientId, request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Update ingredient successful")
                .data(ingredient)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/restaurants/ingredients")
    public ResponseEntity<ApiResponse<List<Ingredient>>> getIngredientsByRestaurant()  {
        List<Ingredient> ingredients = ingredientService.getIngredientsByRestaurant();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get all ingredients successful")
                .data(ingredients)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @DeleteMapping("/restaurants/ingredients/{ingredientId}")
    public ResponseEntity<ApiResponse<Void>> deleteIngredient(@PathVariable Long ingredientId) {
        ingredientService.deleteIngredientById(ingredientId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Delete ingredient successful")
                .data(null)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
