package com.nguyenthanhbang.foodordering.repository;

import com.nguyenthanhbang.foodordering.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
