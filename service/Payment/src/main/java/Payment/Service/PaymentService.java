package Payment.Service;

import Payment.Model.PaymentModel;
import Payment.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    PaymentRepository paymentRepository;

    public PaymentModel createPayment(String userEmail, String paymentId, double amount) {
        try {
            PaymentModel newPayment = new PaymentModel();
            // Assuming you have a method like savePayment in your repository
            paymentRepository.save(newPayment);
            return newPayment;
        } catch (Exception e) {
            System.err.println("Error in createPayment: " + e.getMessage());
            throw e;
        }
    }

    public PaymentModel executePayment(String paymentId) throws Exception {
        try {
            PaymentModel payment = paymentRepository.findByPaymentId(paymentId);

            if (payment != null) {
                payment.setStatus("Completed");
                paymentRepository.save(payment);
                return payment;
            } else {
                throw new Exception("Payment not found");
            }
        } catch (Exception e) {
            System.err.println("Error in executePayment: " + e.getMessage());
            throw e;
        }
    }
}

