package ru.mirea.coursework.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.mirea.coursework.domain.dto.ProductResponse;

@Entity
@Table(name = "user_carts")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserCart {
    private Long id;
    private String name;
    private String image;
    private String price;

    public UserCart(String name, String image, String price) {
        this.name = name;
        this.image = image;
        this.price = price;
    }

    public ProductResponse toResponse() {
        return new ProductResponse(id, name, image, price);
    }
}