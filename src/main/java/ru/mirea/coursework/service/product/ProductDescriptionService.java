package ru.mirea.coursework.service.product;

import ru.mirea.coursework.domain.dto.ProductDescriptionResponse;

import java.util.List;

public interface ProductDescriptionService {
    List<ProductDescriptionResponse> getAllProductDescriptions();
    ProductDescriptionResponse getProductDescriptionById(Long id);
}
