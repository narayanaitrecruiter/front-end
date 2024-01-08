package Payment.Model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Payment")
public class PaymentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private String paymentId;

    private Double amount;

    private String status = "Completed";

    private Date createdAt = new Date();

    // Constructors, getters, and setters


    public PaymentModel(Long id, String userEmail, String paymentId, Double amount, String status, Date createdAt) {
        this.id = id;
        this.userEmail = userEmail;
        this.paymentId = paymentId;
        this.amount = amount;
        this.status = status;
        this.createdAt = createdAt;
    }

    public PaymentModel() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}

