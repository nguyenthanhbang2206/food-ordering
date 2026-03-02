package com.nguyenthanhbang.foodordering.service;

import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

public interface PaymentService {
    String createPaymentUrl(List<Long> orderIds, HttpServletRequest req) throws UnsupportedEncodingException;
    boolean verifyPayment(Map<String, String> fields);
}
