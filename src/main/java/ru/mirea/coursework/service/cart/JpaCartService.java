package ru.mirea.coursework.service.cart;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mirea.coursework.domain.model.Cart;
import ru.mirea.coursework.exception.NotFoundException;
import ru.mirea.coursework.repository.CartRepository;
import ru.mirea.coursework.service.UserService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JpaCartService implements CartService {
    private final UserService userService;
    private final CartRepository cartRepository;

    @Override
    public List<Cart> getCarts() {
        return userService.getCurrentUser().getProductsInCart();
    }

    @Override
    @Transactional
    public void incrementCart(Long productID) {
        Cart.CartID cartID = new Cart.CartID(userService.getCurrentUser().getId(), productID);
        Cart cart = cartRepository.findById(cartID).orElseGet(() -> new Cart(cartID.getUserID(), productID, 0L));
        cart.setCount(cart.getCount() + 1);
        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void decrementCart(Long productID) {
        Cart.CartID cartID = new Cart.CartID(userService.getCurrentUser().getId(), productID);
        Cart cart = cartRepository.findById(cartID).orElseThrow(() -> new NotFoundException("msg"));
        cart.setCount(cart.getCount() - 1);
        if (cart.getCount() == 0) {
            cartRepository.delete(cart);
        } else {
            cartRepository.save(cart);
        }
    }
}
