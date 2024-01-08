package Order.Repository;

import Order.Model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByUserEmailAndProductId(String userEmail, String productId);

    List<CartItem> findByUserEmail(String userEmail);

    void deleteByUserEmailAndProductId(String userEmail, String productId);

    void deleteByUserEmail(String userEmail);
}

