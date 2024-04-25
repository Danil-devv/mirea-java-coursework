package ru.mirea.coursework.domain.dto;

import ru.mirea.coursework.domain.model.Product;

import java.util.List;

public record ProductsInCartResponse(List<CartResponse> cartResponses) {
}
