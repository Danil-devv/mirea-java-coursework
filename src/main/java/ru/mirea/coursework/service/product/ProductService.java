package ru.mirea.coursework.service.product;

import ru.mirea.coursework.domain.dto.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
}
