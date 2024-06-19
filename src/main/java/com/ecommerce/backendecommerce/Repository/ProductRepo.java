package com.ecommerce.backendecommerce.Repository;

import com.ecommerce.backendecommerce.Entitys.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepo extends CrudRepository<Product, Integer> {
}
