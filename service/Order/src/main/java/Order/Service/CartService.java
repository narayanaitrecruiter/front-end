package Order.Service;

import Order.Model.CartItem;
import Order.Repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    public CartItem addToCart(String userEmail, String productId, Integer quantity) {
        try {
            CartItem cartItem = cartItemRepository.findByUserEmailAndProductId(userEmail, productId);

            if (cartItem != null) {
                cartItem.setQuantity(cartItem.getQuantity() + (quantity != null ? quantity : 1));
            } else {
                cartItem = new CartItem(productId,userEmail,quantity);
                cartItem.setUserEmail(userEmail);
                cartItem.setProductId(productId);
                cartItem.setQuantity(quantity != null ? quantity : 1);
            }

            cartItemRepository.save(cartItem);
            return cartItem;
        } catch (Exception e) {
            System.err.println("Error in addToCart: " + e.getMessage());
            throw e;
        }
    }

    public int getItemCount(String userEmail) {
        try {
            List<CartItem> cartItems = cartItemRepository.findByUserEmail(userEmail);
            return cartItems.size();
            //return cartItems.stream().mapToInt(CartItem::getQuantity).sum();
        } catch (Exception e) {
            System.err.println("Error in getItemCount: " + e.getMessage());
            throw e;
        }
    }

    public void removeItem(String userEmail, String productId) {
        try {
            cartItemRepository.deleteByUserEmailAndProductId(userEmail, productId);
        } catch (Exception e) {
            System.err.println("Error in removeItem: " + e.getMessage());
            throw e;
        }
    }

    public List<CartItem> getAllItems(String userEmail) {
        try {
            return cartItemRepository.findByUserEmail(userEmail);
        } catch (Exception e) {
            System.err.println("Error in getAllItems: " + e.getMessage());
            throw e;
        }
    }
}
