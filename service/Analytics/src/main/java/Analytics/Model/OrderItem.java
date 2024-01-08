package Analytics.Model;

import java.util.List;
import java.util.Map;

public class OrderItem {

    private List<List<Map<String, Object>>> items;

    public OrderItem() {
        // Default constructor
    }

    public OrderItem(List<List<Map<String, Object>>> items) {
        this.items = items;
    }

    public List<List<Map<String, Object>>> getItems() {
        return items;
    }

    public void setItems(List<List<Map<String, Object>>> items) {
        this.items = items;
    }
}
