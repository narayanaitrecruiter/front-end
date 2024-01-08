package Payment.Model;

public class PaymentResponse {
    private String paymentId;
    private String approvalUrl;

    private String message;

    public PaymentResponse(String paymentId, String approvalUrl, String message) {
        this.paymentId = paymentId;
        this.approvalUrl = approvalUrl;
        this.message = message;
    }

    public PaymentResponse() {
    }

    public PaymentResponse(String paymentId, String approvalUrl) {
        this.paymentId = paymentId;
        this.approvalUrl = approvalUrl;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getApprovalUrl() {
        return approvalUrl;
    }

    public void setApprovalUrl(String approvalUrl) {
        this.approvalUrl = approvalUrl;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    // Constructor, getters, and setters


}