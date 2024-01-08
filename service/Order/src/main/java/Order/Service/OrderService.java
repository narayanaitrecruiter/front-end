package Order.Service;

import Order.Repository.OrderRepository;
import Order.Model.CartItem;
import Order.Model.Order;
import Order.Repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public Order createOrder(String userEmail, List<CartItem> items, double totalAmount, String paymentId) {
        try {
            Order order = new Order();
            orderRepository.save(order);
            cartItemRepository.deleteByUserEmail(userEmail);
            return order;
        } catch (Exception e) {
            System.err.println("Error in createOrder: " + e.getMessage());
            throw e;
        }
    }

    public List<Order> getOrders(String userEmail) {
        try {
            return orderRepository.findByUserEmail(userEmail);
        } catch (Exception e) {
            System.err.println("Error in getOrders: " + e.getMessage());
            throw e;
        }
    }
}
