package Order.Controller;

import Order.Service.CartService;
import Order.Model.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartItem cartRequest) {
        try {
            CartItem cartItem = cartService.addToCart(cartRequest.getUserEmail(), cartRequest.getProductId(), cartRequest.getQuantity());
            return ResponseEntity.status(HttpStatus.OK).body(cartItem);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PostMapping("/item-count")
    public ResponseEntity<?> getItemCount(@RequestBody CartItem cartRequest) {
        try {
            int itemCount = cartService.getItemCount(cartRequest.getUserEmail());
            return ResponseEntity.status(HttpStatus.OK).body(itemCount);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PostMapping("/all-items")
    public ResponseEntity<?> getAllItems(@RequestBody CartItem cartRequest) {
        try {
            List<CartItem> cartItems = cartService.getAllItems(cartRequest.getUserEmail());
            return ResponseEntity.status(HttpStatus.OK).body(cartItems);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PostMapping("/remove-item")
    public ResponseEntity<?> removeItem(@RequestBody CartItem cartRequest) {
        try {
            cartService.removeItem(cartRequest.getUserEmail(), cartRequest.getProductId());
            return ResponseEntity.status(HttpStatus.OK).body("Item removed successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
}

