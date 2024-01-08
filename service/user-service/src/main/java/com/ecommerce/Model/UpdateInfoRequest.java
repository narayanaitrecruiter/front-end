package com.ecommerce.Model;

public class UpdateInfoRequest {
    private String fullname;
    private String shopName;

    // Default constructor
    public UpdateInfoRequest() {
    }

    // Parameterized constructor
    public UpdateInfoRequest(String fullname, String shopName) {
        this.fullname = fullname;
        this.shopName = shopName;
    }

    // Getter for fullname
    public String getFullname() {
        return fullname;
    }

    // Setter for fullname
    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    // Getter for shopName
    public String getShopName() {
        return shopName;
    }

    // Setter for shopName
    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    @Override
    public String toString() {
        return "UpdateInfoRequest{" +
                "fullname='" + fullname + '\'' +
                ", shopName='" + shopName + '\'' +
                '}';
    }
}
