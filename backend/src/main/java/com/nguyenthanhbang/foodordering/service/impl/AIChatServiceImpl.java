package com.nguyenthanhbang.foodordering.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nguyenthanhbang.foodordering.dto.request.ChatRequest;
import com.nguyenthanhbang.foodordering.dto.response.ChatResponse;
import com.nguyenthanhbang.foodordering.model.Food;
import com.nguyenthanhbang.foodordering.repository.FoodRepository;
import com.nguyenthanhbang.foodordering.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AIChatServiceImpl implements AIService {
    private final ChatClient chatClient;
    private final FoodRepository foodRepository;
    private final ObjectMapper objectMapper;


    @Override
    public ChatResponse chat(ChatRequest request) {
        String prompt = String.format("""
               Người dùng đang hỏi: %s.
               - Nếu người dùng hỏi chào, hỏi tên, hoặc thông tin không liên quan món ăn, chỉ trả lời tự nhiên, không thêm món.
               - Nếu người dùng hỏi về món ăn, thực đơn, đồ uống... hãy gợi ý tối đa 5 món, trả về JSON gồm message và data.
               Trường hợp gợi ý món ăn thì hãy gợi ý phù hợp nhất từ danh sách sau:
               %s
               Chỉ trả về dạng JSON, không thêm bất kỳ chữ nào khác.
                            {
                              "message": "Là phản hồi ngắn gọn của bạn (lý do chọn món...)",
                              "data": [
                                {"id":...,"name": ..., "price": ...,"cuisine": ...} ,
                              ]
                            }
                """, request.getMessage(), formatFood());

        String response = chatClient
                .prompt(prompt)
                .call()
                .content();
        if (response.startsWith("```")) {
            response = response.replaceAll("(?s)```json\\s*", "");
            response = response.replaceAll("```$", "");
            response = response.trim();
        }
        try {
            return objectMapper.readValue(response, ChatResponse.class);
        }catch (Exception e) {
            ChatResponse fallback = new ChatResponse();
            fallback.setMessage(response);
            fallback.setData(Collections.emptyList());
            return fallback;
        }
    }
    private String formatFood() {
        List<Food> foods = foodRepository.findAll();
        StringBuilder sb = new StringBuilder();
        for (Food food : foods) {
            sb.append(String.format(
                    "ID: %d | %s | %s | Giá: %,d VNĐ |Món chay(%s| %s | Đã bán: %d\n",
                    food.getId(),
                    food.getName(),
                    food.getCuisine(),
                    food.getPrice(),
                    food.isVegetarian() ? "Có)" : "Không)",
                    food.isSpicy() ? "Cay" : "Không cay",
                    food.getSold()
            ));
        }
        return sb.toString();
    }


}
