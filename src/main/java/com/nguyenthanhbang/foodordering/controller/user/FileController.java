package com.nguyenthanhbang.foodordering.controller.user;

import com.nguyenthanhbang.foodordering.dto.request.CreateCartItemRequest;
import com.nguyenthanhbang.foodordering.dto.response.ApiResponse;
import com.nguyenthanhbang.foodordering.model.CartItem;
import com.nguyenthanhbang.foodordering.service.FileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;
    @PostMapping
    public ResponseEntity<ApiResponse<List<String>>> uploadFile(@RequestParam(name = "files", required = false) MultipartFile[] files, @RequestParam String folder) throws IOException {
        List<String> fileNames = new ArrayList<>();
        for(MultipartFile file : files) {
            String fileName = fileService.uploadFile(file, folder);
            fileNames.add(fileName);
        }
        ApiResponse apiResponse = ApiResponse.builder()
                .status(HttpStatus.CREATED.value())
                .message("Upload file successfully")
                .data(fileNames)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
    }
}
