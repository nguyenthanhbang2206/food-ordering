package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepositoy extends JpaRepository<Address, Long> {
}
