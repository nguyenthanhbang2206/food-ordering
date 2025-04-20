package com.nguyenthanhbang.foodordering.controller.admin;

import com.nguyenthanhbang.foodordering.dto.request.CategoryRequest;
import com.nguyenthanhbang.foodordering.dto.request.IngredientRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.Category;
import com.nguyenthanhbang.foodordering.model.Ingredient;
import com.nguyenthanhbang.foodordering.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping("/restaurants/categories")
    public ResponseEntity<ApiResponse<Category>> createCategory(@Valid @RequestBody CategoryRequest request) {
        Category category = categoryService.createCategory(request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("Create category successful")
                .data(category)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
    @PutMapping("/restaurants/categories/{categoryId}")
    public ResponseEntity<ApiResponse<Category>> updateCategory(@PathVariable Long categoryId,@Valid @RequestBody CategoryRequest request) {
        Category category = categoryService.updateCategory(categoryId, request);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Update category successful")
                .data(category)
                .build();
        return ResponseEntity.ok(apiResponse);
    }
    @GetMapping("/restaurants/categories")
    public ResponseEntity<ApiResponse<List<Category>>> getCategoriesByRestaurant()  {
        List<Category> categories = categoryService.getCategoriesByRestaurant();
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get all categories successful")
                .data(categories)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
    @DeleteMapping("/restaurants/categories/{categoryId}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long categoryId)  {
        categoryService.deleteCategory(categoryId);
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Delete category successful")
                .data(null)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(apiResponse);
    }
}
