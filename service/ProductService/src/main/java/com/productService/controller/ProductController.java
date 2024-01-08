package com.productService.controller;

import com.productService.model.Category;
import com.productService.model.ProductDTO;
import com.productService.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/products")
public class ProductController {

  @Autowired
  ProductService productService;

    @PostMapping("/save")
    public ResponseEntity<ProductDTO> saveProduct(@ModelAttribute ProductDTO productDTO) throws IOException {
        ProductDTO savedProduct = productService.saveProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> productList = productService.getAllProducts();
        return ResponseEntity.ok(productList);
    }





    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProductById(@PathVariable Long id) {
        productService.deleteProductById(id);
        return new ResponseEntity<>("Product with ID " + id + " has been deleted successfully", HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO productDTO = productService.getProductById(id);

        if (productDTO != null) {
            return new ResponseEntity<>(productDTO, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



        @PutMapping("/update/{id}")
        public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO updatedProductDTO) throws IOException {
            ProductDTO existingProductDTO = productService.getProductById(id);

            if (existingProductDTO == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }


            existingProductDTO.setTitle(updatedProductDTO.getTitle());
            existingProductDTO.setDescription(updatedProductDTO.getDescription());
            existingProductDTO.setPrice(updatedProductDTO.getPrice());
            existingProductDTO.setQuantity(updatedProductDTO.getQuantity());
            existingProductDTO.setUserEmail(updatedProductDTO.getUserEmail());


            ProductDTO updatedProduct = productService.saveProduct(existingProductDTO);

            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        }


    @GetMapping("/manage")
    public List<ProductDTO> getAllItemsManagable(@RequestParam String userEmail) {
        try {
            return productService.getAllItemsManagable(userEmail);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching manageable products: " + e.getMessage());
        }
    }

    @PatchMapping("/decreaseQuantity/{productId}/{quantityToDecrease}")
    public ProductDTO decreaseQuantity(
            @PathVariable Long productId,
            @PathVariable Long quantityToDecrease) {
        try {
            return productService.decreaseQuantity(productId, quantityToDecrease);
        } catch (Exception e) {
            throw new RuntimeException("Error decreasing quantity: " + e.getMessage());
        }
    }


    @PostMapping("/getCategory")
    public Map<String, Integer> getCategory(@RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> compiledItems = (List<Map<String, Object>>) request.get("compiledItems");

            Map<String, Integer> categories = new HashMap<>();
            categories.put("Womens fashion", 0);
            categories.put("Mens fashion", 0);
            categories.put("Bags and accessories", 0);
            categories.put("Baby care", 0);
            categories.put("Health care and beauty", 0);
            categories.put("Electronic Accessories", 0);
            categories.put("Home and lifestyle", 0);
            categories.put("Art and crafts", 0);

            for (Map<String, Object> item : compiledItems) {
                Long productId = (Long) item.get("productId");  // Convert to Long
                ProductDTO category = productService.getCategory(productId);
                String categoryName = category.getCategories();
                categories.put(categoryName, categories.get(categoryName) + ((Number) item.get("quantity")).intValue());  // Convert to Integer
            }

            return categories;
        } catch (Exception e) {
            // Handle exceptions
            e.printStackTrace();
            return null; // Modify as needed
        }
    }




}






