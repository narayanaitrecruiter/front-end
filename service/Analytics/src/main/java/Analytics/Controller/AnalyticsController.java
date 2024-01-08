package Analytics.Controller;

import Analytics.Model.*;
import Analytics.Service.AnalyticsService;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @PostMapping("/recommended")
    public ResponseEntity<?> getAllRecommended(@RequestBody UserRequest userRequest) {
        try {
            String userEmail = userRequest.getUserEmail();

            RestTemplate restTemplate = new RestTemplate();
            OrderAnalyticsResponse orderAnalyticsResponse = restTemplate.postForObject(
                    "http://order-service/orders/get",
                    userRequest,
                    OrderAnalyticsResponse.class
            );

            List<OrderItem> orderItems = orderAnalyticsResponse.getOrderItems();
            List<Map<String, Object>> compiledItems = analyticsService.compileOrderItems(orderItems);

            CategoryResponse categoryResponse = restTemplate.postForObject(
                    "http://product-service/products/getCategory",
                    compiledItems,
                    CategoryResponse.class
            );

            Map<String, Integer> categories = categoryResponse.getCategories();
            String maxCategory = null;
            int maxValue = -1;

            for (Map.Entry<String, Integer> entry : categories.entrySet()) {
                String category = entry.getKey();
                int value = entry.getValue();
                if (value > maxValue) {
                    maxValue = value;
                    maxCategory = category;
                }
            }

            ProductResponse productResponse = restTemplate.postForObject(
                    "http://order-service/products/fetch",
                    new CategoryRequest(maxCategory),
                    ProductResponse.class
            );

            List<AbstractReadWriteAccess.Item> items = productResponse.getItems();
            List<AbstractReadWriteAccess.Item> recommended = items.subList(Math.max(items.size() - 2, 0), items.size());

            return ResponseEntity.ok(recommended);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
}

