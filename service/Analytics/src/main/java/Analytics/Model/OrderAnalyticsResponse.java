package Analytics.Model;


import java.util.List;

public class OrderAnalyticsResponse {
    private List<OrderItem> orderItems;

    // getters and setters

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}

