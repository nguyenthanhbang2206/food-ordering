package com.nguyenthanhbang.foodordering.service;

import com.nguyenthanhbang.foodordering.dto.request.ChatRequest;
import com.nguyenthanhbang.foodordering.dto.response.ChatResponse;

public interface AIService {
    ChatResponse chat(ChatRequest request);
}
