package ru.mirea.coursework.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.mirea.coursework.domain.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
