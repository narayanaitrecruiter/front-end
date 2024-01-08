package com.productService.repository;

import com.productService.model.ProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductDTO, Long> {
    List<ProductDTO> findByUserEmail(String userEmail);



}
