package com.ecommerce.backendecommerce.Repository;

import com.ecommerce.backendecommerce.Entitys.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepo extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
