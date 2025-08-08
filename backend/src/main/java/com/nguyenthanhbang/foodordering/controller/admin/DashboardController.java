package com.nguyenthanhbang.foodordering.controller.admin;

import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboard(){
        Map<String, Object> result = dashboardService.statistic();
        ApiResponse response = ApiResponse.builder()
                .status(HttpStatus.OK.value())
                .message("Get dashboard successfully")
                .data(result)
                .build();
        return ResponseEntity.ok(response);
    }
}
