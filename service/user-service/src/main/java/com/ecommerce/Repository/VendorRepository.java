package com.ecommerce.Repository;

import com.ecommerce.Model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
    Vendor findByEmail(String email);
}
