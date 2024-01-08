package Payment.Repository;

import Payment.Model.PaymentModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentModel, Long> {
    PaymentModel findByPaymentId(String paymentId);
}

