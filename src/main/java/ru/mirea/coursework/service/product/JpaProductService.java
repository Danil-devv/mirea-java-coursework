package ru.mirea.coursework.service.product;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mirea.coursework.domain.dto.ProductResponse;
import ru.mirea.coursework.repository.ProductRepository;
import ru.mirea.coursework.domain.model.Product;
import java.util.List;


@RequiredArgsConstructor
@Transactional
@Log4j2
@Service
public class JpaProductService implements ProductService {
    private final ProductRepository repository;

    @Override
    public List<ProductResponse> getAllProducts() {
        return repository.findAll().stream().map(Product::toResponse).toList();
    }
}
