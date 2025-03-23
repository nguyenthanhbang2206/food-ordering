package com.nguyenthanhbang.foodordering.controller.auth;

import com.nguyenthanhbang.foodordering.dto.request.LoginRequest;
import com.nguyenthanhbang.foodordering.dto.response.AuthenticationResponse;
import com.nguyenthanhbang.foodordering.model.User;
import com.nguyenthanhbang.foodordering.repository.UserRepository;
import com.nguyenthanhbang.foodordering.service.UserService;
import com.nguyenthanhbang.foodordering.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    @Value("${jwt.refresh-token-validity-in-seconds}")
    private long jwtRefreshExpiration;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserRepository userRepository;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);
        AuthenticationResponse response = new AuthenticationResponse();
        User user = userRepository.findByEmail(request.getEmail());
        AuthenticationResponse.UserLogin userLogin = new AuthenticationResponse.UserLogin();
        if(user != null) {
            userLogin.setId(user.getId());
            userLogin.setFullName(user.getFullName());
            userLogin.setEmail(user.getEmail());
            userLogin.setRole(user.getRole());
            response.setUser(userLogin);
        }
        String accessToken = securityUtil.createAccessToken(request.getEmail(), response);
        response.setAccessToken(accessToken);
        String refreshToken = securityUtil.createRefreshToken(request.getEmail(), response);
        userService.updateTokenOfUser(request.getEmail(), refreshToken);
        ResponseCookie springCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtRefreshExpiration)
                .build();
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, springCookie.toString()).body(response);
    }
    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refresh(@CookieValue(name = "refreshToken", defaultValue = "default") String refreshToken) throws Exception {
        if(refreshToken.equals("default")) {
            throw new Exception("Chưa truyền refresh token, không có refresh token ở cookie");
        }
        Jwt decodedToken = securityUtil.checkValidToken(refreshToken);
        String email = decodedToken.getSubject();
        User currentUser = userService.getUserByRefreshTokenAndEmail(refreshToken, email);
        if(currentUser == null) {
            throw new Exception("refresh token không hợp lệ");
        }
        AuthenticationResponse loginResponse = new AuthenticationResponse();
        AuthenticationResponse.UserLogin userLogin = new AuthenticationResponse.UserLogin();
        userLogin.setId(currentUser.getId());
        userLogin.setFullName(currentUser.getFullName());
        userLogin.setEmail(currentUser.getEmail());
        userLogin.setRole(currentUser.getRole());
        loginResponse.setUser(userLogin);
        String accessToken = securityUtil.createAccessToken(email, loginResponse);
        loginResponse.setAccessToken(accessToken);
        String refresh_token = securityUtil.createRefreshToken(email, loginResponse);
        userService.updateTokenOfUser(refresh_token, email);
        ResponseCookie springCookie = ResponseCookie.from("refreshToken", refresh_token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtRefreshExpiration)
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, springCookie.toString()).body(loginResponse);
    }
    @PostMapping("/auth/logout")
    public ResponseEntity<Void> logout() throws Exception {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        if(email.equals("")) {
            throw new Exception("refresh token không hợp lệ");
        }
        userService.updateTokenOfUser(null, email);
        ResponseCookie springCookie = ResponseCookie.from("refreshToken", null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, springCookie.toString()).body(null);
    }
    @PostMapping("/register")
    public ResponseEntity<User> create(@RequestBody User user) throws Exception {
        User savedUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }
}
