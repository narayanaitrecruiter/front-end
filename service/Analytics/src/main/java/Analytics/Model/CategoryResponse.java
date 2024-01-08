package Analytics.Model;

import java.util.Map;

public class CategoryResponse {
    private Map<String, Integer> categories;

    // getters and setters

    public Map<String, Integer> getCategories() {
        return categories;
    }

    public void setCategories(Map<String, Integer> categories) {
        this.categories = categories;
    }
}
