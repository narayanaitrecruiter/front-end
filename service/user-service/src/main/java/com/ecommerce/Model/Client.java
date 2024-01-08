package com.ecommerce.Model;


import jakarta.persistence.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name = "Client")
public class Client {

    /*@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
*/

    @Id
    @GeneratedValue( strategy = GenerationType.SEQUENCE, generator = "client_sequence_generator")
    @SequenceGenerator( name="client_sequence_generator", sequenceName = "client_sequence", initialValue = 1 )
    @Column( name = "id" )
    private Long id;
    @NotBlank
    private String fullname;

    @NotBlank
    private String password;

    @NotBlank
    @Email
    private String email;

    private Date dob = new Date();

    private String shippingAddress;

    // Default no-argument constructor (required by JPA)
    public Client() {
    }

    // Constructor with required fields
    public Client(String fullname, String password, String email) {
        this.fullname = fullname;
        this.password = password;
        this.email = email;
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

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
}
