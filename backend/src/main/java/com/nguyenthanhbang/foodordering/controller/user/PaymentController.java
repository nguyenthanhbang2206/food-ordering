package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    @Value("${app.frontend.url}")
    private String frontendUrl;
    @PostMapping("/vnpay")
    public ResponseEntity<?> createPaymentUrl(@RequestBody List<Long> orderIds, HttpServletRequest request) throws UnsupportedEncodingException {
        String paymentUrl = paymentService.createPaymentUrl(orderIds, request);
        return ResponseEntity.ok(Map.of("paymentUrl", paymentUrl));
    }
    @GetMapping("/vnpay/verify")
    public ResponseEntity<?> verifyPaymentUrl(HttpServletRequest request) throws UnsupportedEncodingException {
        Map<String, String> fields = new HashMap<>();
        request.getParameterMap().forEach((key, value) -> fields.put(key, value[0]));
        boolean valid = paymentService.verifyPayment(fields);
        String redirectUrl;

        if (valid) {
            redirectUrl = frontendUrl + "/payment-success";
        } else {
            redirectUrl = frontendUrl + "/payment-failed";
        }

        return ResponseEntity
                .status(302)
                .header("Location", redirectUrl)
                .build();
    }
}
