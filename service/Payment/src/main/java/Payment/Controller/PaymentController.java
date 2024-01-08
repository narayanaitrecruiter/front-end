package Payment.Controller;

import Payment.Model.PaymentModel;
import Payment.Model.PaymentResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.view.RedirectView;
import com.paypal.api.payments.*;
import com.paypal.base.rest.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private static final String CLIENT_ID = "AaG0FEuCziHPWTP7EvjPjGIu_UtMtPZq5vX8nUhF"; // your client id
    private static final String CLIENT_SECRET = "EFC7IXriNL0c7IxIWsiJjSbW7ADk3e0X_B2Qf4SeJlqiI9OFM8Bb5guF6W-IEOTRsaiK1Iq4qw3fziIp"; // your client secret

    @PostMapping("/create")
    public ResponseEntity<Object> createPayment(@RequestBody PaymentModel paymentRequest) {
        try {
            String userEmail = paymentRequest.getUserEmail();
            String paymentId = paymentRequest.getPaymentId();
            double amount = paymentRequest.getAmount();

            // Call your PaymentService.createPayment method here

            APIContext apiContext = new APIContext(CLIENT_ID, CLIENT_SECRET, "sandbox");
            Payment payment = new Payment();
            payment.setIntent("sale");

            Payer payer = new Payer();
            payer.setPaymentMethod("paypal");
            payment.setPayer(payer);

            RedirectUrls redirectUrls = new RedirectUrls();
            redirectUrls.setReturnUrl("http://localhost:8080/api/payment/success");
            redirectUrls.setCancelUrl("http://localhost:8080/api/payment/cancel");
            payment.setRedirectUrls(redirectUrls);

            Transaction transaction = new Transaction();
            ItemList itemList = new ItemList();
            Item item = new Item();
            item.setName(item.getName())
                    .setSku(item.getSku())
                    .setPrice(item.getPrice())
                    .setCurrency(item.getCurrency())
                    .setQuantity(item.getQuantity());

            itemList.setItems(Collections.singletonList(item));

            transaction.setItemList(itemList)
                    .setAmount(new Amount().setCurrency("USD").setTotal(String.valueOf(amount)))
                    .setDescription("Payment for services provided");

            payment.setTransactions(Collections.singletonList(transaction));

            Payment createdPayment = payment.create(apiContext);
            String approvalUrl = createdPayment.getLinks().stream()
                    .filter(link -> "approval_url".equals(link.getRel()))
                    .findFirst()
                    .map(Links::getHref)
                    .orElse(null);

            // Return the paymentId and approvalUrl in the response
            return ResponseEntity.ok(new PaymentResponse(paymentId, approvalUrl));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PostMapping("/execute")
    public ResponseEntity<Object> executePayment(@RequestBody PaymentModel executePaymentRequest) {
        try {
            String paymentId = executePaymentRequest.getPaymentId();

            // Call your PaymentService.executePayment method here

            // Return the executed payment in the response
            return ResponseEntity.ok("Payment Executed Successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @GetMapping("/success")
    public RedirectView success() {
        // Redirect view for success page
        return new RedirectView("YOUR_SUCCESS_PAGE_URL");
    }

    @GetMapping("/cancel")
    public RedirectView cancel() {
        // Redirect view for cancel page
        return new RedirectView("YOUR_CANCEL_PAGE_URL");
    }
}
