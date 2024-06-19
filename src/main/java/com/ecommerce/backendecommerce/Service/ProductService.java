package com.ecommerce.backendecommerce.Service;

import com.ecommerce.backendecommerce.Entitys.Product;
import com.ecommerce.backendecommerce.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;

    public Iterable<Product> findAll() {
        return productRepo.findAll();
    }

    public Optional<Product> findById(int id) {
        return productRepo.findById(id);
    }
    public Product save(Product product) {
        return productRepo.save(product);
    }

    public void delete(Integer id) {
        productRepo.deleteById(id);
    }
}
