package com.nguyenthanhbang.foodordering.dto.response;

import com.nguyenthanhbang.foodordering.enums.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponse {
    private String accessToken;
    private UserLogin user;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserLogin{
        private Long id;
        private String email;
        private String fullName;
        private Role role;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserToken{
        private Long id;
        private String email;
        private String fullName;
    }
}
