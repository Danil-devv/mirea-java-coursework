package ru.mirea.coursework.domain.model;

import jakarta.persistence.*;
import lombok.*;
import ru.mirea.coursework.domain.dto.CartResponse;
import ru.mirea.coursework.domain.dto.ProductResponse;

import java.io.Serializable;

@Entity
@IdClass(Cart.CartID.class)
@Table(name = "cart")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
    @Id
    @Column(name = "user_id")
    private Long userID;
    @Id
    @Column(name = "product_id")
    private Long productID;

    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    @ManyToOne(fetch = FetchType.EAGER)
    private Product product;

    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(name = "count")
    private Long count;

    public CartResponse toResponse() {
        return new CartResponse(product.toResponse(), count);
    }

    public Cart(Long userID, Long productID, Long count) {
        this.userID = userID;
        this.count = count;
        this.productID = productID;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CartID implements Serializable {
        private Long userID;
        private Long productID;
    }
}

