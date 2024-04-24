package ru.mirea.coursework.domain.model;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.mirea.coursework.domain.dto.ProductDescriptionResponse;
import ru.mirea.coursework.domain.dto.ProductResponse;

import java.util.List;

@Entity
@Table(name = "product_description")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer rating;
    @Column(length = 2048)
    private String description;
    @Column(length = 1024)
    private String images;

    public ProductDescription(Integer rating, String description, String images) {
        this.rating = rating;
        this.description = description;
        this.images = images;
    }

    public ProductDescriptionResponse toResponse() {
        return new ProductDescriptionResponse(id, rating, description, images);
    }
}

