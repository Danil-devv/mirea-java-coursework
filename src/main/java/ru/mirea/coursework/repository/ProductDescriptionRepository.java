package ru.mirea.coursework.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.coursework.domain.model.ProductDescription;

@Repository
public interface ProductDescriptionRepository extends JpaRepository<ProductDescription, Long> {
}
