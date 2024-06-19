package com.ecommerce.backendecommerce.Controller;

import com.ecommerce.backendecommerce.Entitys.Product;
import com.ecommerce.backendecommerce.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")


@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/read/all", method = RequestMethod.GET, produces = "application/json")
    public Iterable<Product> findAll() {
        return productService.findAll();
    }

    @RequestMapping(value = "/read/{id}", method = RequestMethod.GET, produces = "application/json")
    public Optional<Product> findById(@PathVariable int id) {
        return productService.findById(id);
    }
    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = "application/json")
    public Product create(@RequestBody Product product) {
        return productService.save(product);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = "application/json")
    public void deleteById(@PathVariable int id) {
        productService.delete(id);
    }

}
