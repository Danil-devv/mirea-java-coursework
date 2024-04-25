package ru.mirea.coursework.service.cart;

import ru.mirea.coursework.domain.model.Cart;

import java.util.List;

public interface CartService {
    List<Cart> getCarts();
    void incrementCart(Long productID);
    void decrementCart(Long productID);
}
