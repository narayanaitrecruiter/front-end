package com.productService.service;

import com.productService.model.ProductDTO;

import java.io.IOException;
import java.util.List;

public interface ProductService {

    ProductDTO saveProduct(ProductDTO productDTO) throws IOException;

    List<ProductDTO> getAllProducts();


    //List<String> getCategory(Long productId) throws ChangeSetPersister.NotFoundException;

    void deleteProductById(Long id);

    ProductDTO getProductById(Long id);

    List<ProductDTO> getAllItemsManagable(String userEmail);

    ProductDTO decreaseQuantity(Long productId, Long quantityToDecrease);

    ProductDTO getCategory(Long productId);

    //Category getCategory(String productId);
}
