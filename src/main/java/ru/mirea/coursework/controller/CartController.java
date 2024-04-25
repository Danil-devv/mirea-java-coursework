package ru.mirea.coursework.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.mirea.coursework.domain.dto.CartResponse;
import ru.mirea.coursework.domain.dto.ProductsInCartResponse;
import ru.mirea.coursework.domain.model.Cart;
import ru.mirea.coursework.service.cart.CartService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService service;

    @GetMapping()
    public ProductsInCartResponse getProductsInCart() {
        List<Cart> carts = service.getCarts();
        return new ProductsInCartResponse(
                carts.stream().map(Cart::toResponse).toList()
        );
    }

    @PutMapping("/{id}")
    public void incrementProductCount(@PathVariable("id") Integer id) {
        service.incrementCart(id.longValue());
    }

    @DeleteMapping("/{id}")
    public void decrementProductCount(@PathVariable("id") Integer id) {
        service.decrementCart(id.longValue());
    }
}
