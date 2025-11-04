package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.request.ChatRequest;
import com.nguyenthanhbang.foodordering.dto.response.ChatResponse;
import com.nguyenthanhbang.foodordering.service.AIService;
import com.nguyenthanhbang.foodordering.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class AIController {
    private final AIService aiService;
    @PostMapping("/ai/chat")
    public ChatResponse chatAI(@RequestBody ChatRequest request) {
        return aiService.chat(request);
    }
}
