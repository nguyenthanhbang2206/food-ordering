package com.nguyenthanhbang.foodordering.service.impl;

import com.nguyenthanhbang.foodordering.config.VnpayConfig;
import com.nguyenthanhbang.foodordering.enums.OrderPaymentStatus;
import com.nguyenthanhbang.foodordering.enums.OrderStatus;
import com.nguyenthanhbang.foodordering.enums.PaymentStatus;
import com.nguyenthanhbang.foodordering.model.Order;
import com.nguyenthanhbang.foodordering.model.Payment;
import com.nguyenthanhbang.foodordering.repository.OrderRepository;
import com.nguyenthanhbang.foodordering.repository.PaymentRepository;
import com.nguyenthanhbang.foodordering.service.OrderService;
import com.nguyenthanhbang.foodordering.service.PaymentService;
import com.nguyenthanhbang.foodordering.util.VnpayUtil;
import com.nimbusds.jose.shaded.gson.Gson;
import com.nimbusds.jose.shaded.gson.JsonObject;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final OrderService orderService;
    private final PaymentRepository paymentRepository;
    private final VnpayConfig vnpayConfig;
    private final OrderRepository orderRepository;

    @Override
    public String createPaymentUrl(List<Long> orderIds, HttpServletRequest req) throws UnsupportedEncodingException {
        long totalAmount = 0;
        for(Long orderId : orderIds){
            Order order = orderService.getOrderByIdAndUserId(orderId);
            totalAmount += order.getTotalPrice();
        }
        Payment payment = Payment.builder()
                .orderIds(orderIds)
                .createdAt(LocalDateTime.now())
                .amount(totalAmount)
                .status(PaymentStatus.PENDING)
                .method("VNPAY")
                .build();

        paymentRepository.save(payment);

        Map<String, String> params = new HashMap<>();

        params.put("vnp_Version", "2.1.0");
        params.put("vnp_Command", "pay");
        params.put("vnp_TmnCode", vnpayConfig.getTmnCode());
        params.put("vnp_Amount", String.valueOf(totalAmount * 100));
        params.put("vnp_CurrCode", "VND");
        params.put("vnp_TxnRef", payment.getId().toString());
        params.put("vnp_OrderInfo", "Thanh toan don hang " + orderIds.toString());
        params.put("vnp_OrderType", "other");
        params.put("vnp_Locale", "vn");
        params.put("vnp_ReturnUrl", vnpayConfig.getReturnUrl());
        params.put("vnp_IpAddr", req.getRemoteAddr());

        SimpleDateFormat formatter =
                new SimpleDateFormat("yyyyMMddHHmmss");

        params.put("vnp_CreateDate", formatter.format(new Date()));

        String query = VnpayUtil.buildQuery(params);
        String secureHash = VnpayUtil.hmacSHA512(
                vnpayConfig.getHashSecret(),
                query
        );

        return vnpayConfig.getPayUrl()
                + "?"
                + query
                + "&vnp_SecureHash="
                + secureHash;
    }

    @Override
    public boolean verifyPayment(Map<String, String> fields) {

        String secureHash = fields.remove("vnp_SecureHash");


        String signValue = VnpayUtil.hmacSHA512(
                vnpayConfig.getHashSecret(),
                VnpayUtil.buildQuery(fields)
        );

        if (!signValue.equals(secureHash)) {
            return false;
        }

        Long paymentId = Long.valueOf(fields.get("vnp_TxnRef"));
        String responseCode = fields.get("vnp_ResponseCode");
        String transactionNo = fields.get("vnp_TransactionNo");

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(()-> new EntityNotFoundException("Payment not found"));

        Long amount = Long.valueOf(fields.get("vnp_Amount")) / 100;
        if (!amount.equals(payment.getAmount())) {
            return false;
        }
        if (payment.getStatus() == PaymentStatus.SUCCESS) {
            return true;
        }

        boolean valid = false;
        if ("00".equals(responseCode)) {
            payment.setStatus(PaymentStatus.SUCCESS);
            List<Order> orders = orderRepository.findByIdIn(payment.getOrderIds());
            for(Order order : orders){
                order.setPaymentStatus(OrderPaymentStatus.PAID);
            }
            orderRepository.saveAll(orders);
            valid = true;
        } else {
            payment.setStatus(PaymentStatus.FAILED);
        }

        payment.setTransactionNo(transactionNo);
        paymentRepository.save(payment);
        return valid;

    }
}
