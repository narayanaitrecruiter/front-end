package com.ecommerce.Model;


import jakarta.persistence.*;

@Entity
@Table(name = "Vendor")
public class Vendor {
    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    @GeneratedValue( strategy = GenerationType.SEQUENCE, generator = "vendor_sequence_generator")
    @SequenceGenerator( name="vendor_sequence_generator", sequenceName = "vendor_sequence", initialValue = 1 )
    @Column( name = "id" )
    private Long id;
    private String fullname;
    private String password;
    private String email;
    private String shopName;
    private String shopCountry;

    public Vendor() {
    }

    public Vendor(String fullname, String password, String email, String shopName, String shopCountry) {
        this.fullname = fullname;
        this.password = password;
        this.email = email;
        this.shopName = shopName;
        this.shopCountry = shopCountry;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getShopCountry() {
        return shopCountry;
    }

    public void setShopCountry(String shopCountry) {
        this.shopCountry = shopCountry;
    }
}
