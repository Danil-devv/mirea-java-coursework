package ru.mirea.coursework.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mirea.coursework.domain.dto.ProductDescriptionResponse;
import ru.mirea.coursework.domain.dto.ProductResponse;
import ru.mirea.coursework.service.product.ProductDescriptionService;
import ru.mirea.coursework.service.product.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductsController {
    private final ProductService productService;
    private final ProductDescriptionService productDescriptionService;


    @GetMapping
    public List<ProductResponse> getProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/descriptions")
    public List<ProductDescriptionResponse> getProductDescriptions() {
        return productDescriptionService.getAllProductDescriptions();
    }

    @GetMapping("/descriptions/{id}")
    public ProductDescriptionResponse getProductDescription(@PathVariable Long id) {
        return productDescriptionService.getProductDescriptionById(id);
    }
}
