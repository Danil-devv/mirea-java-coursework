package ru.mirea.coursework.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.coursework.domain.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Cart.CartID> {
}
