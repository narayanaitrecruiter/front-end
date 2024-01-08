package com.productService.service;

import com.productService.model.Category;
import com.productService.model.ProductDTO;
import com.productService.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Override
    public ProductDTO saveProduct(ProductDTO productDTO) {
        ProductDTO saved = productRepository.save(productDTO);
        return saved;
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll();
    }




    @Override
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Optional<ProductDTO> optionalProductDTO = productRepository.findById(id);
        return optionalProductDTO.orElse(null);
    }

    @Override
    public List<ProductDTO> getAllItemsManagable(String userEmail) {
        try {
            return productRepository.findByUserEmail(userEmail);
        } catch (Exception e) {
            throw new RuntimeException("Error in getAllItemsManagable: " + e.getMessage(), e);
        }

    }

    @Transactional
    public ProductDTO decreaseQuantity(Long productId, Long quantityToDecrease) {
        try {
            Optional<ProductDTO> optionalProduct = productRepository.findById(productId);
            if (optionalProduct.isPresent()) {
                ProductDTO product = optionalProduct.get();
                Integer currentQuantity = product.getQuantity();
                if (currentQuantity < quantityToDecrease) {
                    throw new RuntimeException("Not enough quantity to decrease");
                }
                Integer newQuantity = Math.toIntExact(currentQuantity - quantityToDecrease);
                product.setQuantity(newQuantity);
                return productRepository.save(product);
            } else {
                throw new RuntimeException("Product not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error in decreaseQuantity: " + e.getMessage(), e);
        }

    }


    public ProductDTO getCategory(Long productId) {
        try {
            Optional<ProductDTO> productOptional = productRepository.findById(productId);
            if (productOptional.isEmpty()) {
                throw new RuntimeException("Product not found");
            }

            return productOptional.get();
        } catch (Exception e) {
            // Handle exceptions
            e.printStackTrace();
            throw e;
        }
    }



    }



