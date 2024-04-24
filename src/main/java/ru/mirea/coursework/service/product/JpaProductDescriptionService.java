package ru.mirea.coursework.service.product;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mirea.coursework.domain.dto.ProductDescriptionResponse;
import ru.mirea.coursework.domain.model.ProductDescription;
import ru.mirea.coursework.exception.NotFoundException;
import ru.mirea.coursework.repository.ProductDescriptionRepository;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Log4j2
@Service
public class JpaProductDescriptionService implements ProductDescriptionService {
    private final ProductDescriptionRepository repository;

    @Override
    public List<ProductDescriptionResponse> getAllProductDescriptions() {
        return repository.findAll().stream().map(ProductDescription::toResponse).toList();
    }

    @Override
    public ProductDescriptionResponse getProductDescriptionById(Long id) {
        return repository.findById(id).map(ProductDescription::toResponse).
                orElseThrow(() -> new NotFoundException("product not found"));
    }
}
