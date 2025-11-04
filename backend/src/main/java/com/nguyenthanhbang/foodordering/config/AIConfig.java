package com.nguyenthanhbang.foodordering.config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIConfig {
    @Bean
    public ChatClient chatClient(ChatClient.Builder builder) {
        String systemPrompt = """
        Bạn là trợ lý AI của website Food Ordering (do Nguyễn Thanh Bằng phát triển).
        - Nếu không chắc, hãy nói: "Mình chưa rõ lắm, bạn có thể nói rõ hơn được không?"
        - Nếu không biết, hãy nói: "Xin lỗi, mình không biết trả lời thông tin này."
        Tất cả phản hồi ngắn gọn, luôn ở dạng JSON:
        {
          "message": "Phản hồi bằng tiếng Việt, thân thiện",
          "data": [ ... nếu có món ăn ... ]
        }
        """;
        return builder
                .defaultSystem(systemPrompt)
                .build();
    }
}
