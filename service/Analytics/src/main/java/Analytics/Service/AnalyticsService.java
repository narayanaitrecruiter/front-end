package Analytics.Service;

import Analytics.Model.OrderItem;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    public List<Map<String, Object>> compileOrderItems(List<OrderItem> orderItems) {
        Map<String, Integer> productQuantityMap = new HashMap<>();
        List<Object> objectList = new ArrayList<>();

        for (OrderItem orderItem : orderItems) {
            List<List<Map<String, Object>>> itemArray = orderItem.getItems();
            for (List<Map<String, Object>> itemList : itemArray) {
                for (Map<String, Object> item : itemList) {
                    String productId = (String) item.get("productId");
                    int quantity = (int) item.get("quantity");
                    if (productQuantityMap.containsKey(productId)) {
                        productQuantityMap.put(productId, productQuantityMap.get(productId) + quantity);
                    } else {
                        productQuantityMap.put(productId, quantity);
                    }
                }
            }
        }

        List<Map<String, Object>> compiledItems = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : productQuantityMap.entrySet()) {
            Map<String, Object> compiledItem = new HashMap<>();
            compiledItem.put("productId", entry.getKey());
            compiledItem.put("quantity", entry.getValue());
            compiledItems.add(compiledItem);
        }

        return compiledItems;
    }

    public ResponseEntity<Map<String, Object>> updateProduct(Map<String, Object> updatedProduct) {
        String productId = (String) updatedProduct.get("productId");
        Map<String, Object> updatedInfo = (Map<String, Object>) updatedProduct.get("updatedInfo");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(updatedInfo, headers);

        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                "http://localhost:3002/products/updateProduct",
                HttpMethod.PUT,
                requestEntity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
        );

        return responseEntity;
    }
}
