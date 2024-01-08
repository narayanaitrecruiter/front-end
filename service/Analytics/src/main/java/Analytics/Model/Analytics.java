package Analytics.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

public class Analytics {
    private String userEmail;
    private Categories categories;

    // Getters and Setters

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Categories getCategories() {
        return categories;
    }

    public void setCategories(Categories categories) {
        this.categories = categories;
    }
}

