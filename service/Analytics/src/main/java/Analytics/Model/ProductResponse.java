package Analytics.Model;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess;

import java.util.List;

public class ProductResponse {
    private List<AbstractReadWriteAccess.Item> items;

    // getters and setters

    public List<AbstractReadWriteAccess.Item> getItems() {
        return items;
    }

    public void setItems(List<AbstractReadWriteAccess.Item> items) {
        this.items = items;
    }
}
