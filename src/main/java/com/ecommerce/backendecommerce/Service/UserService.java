package com.ecommerce.backendecommerce.Service;

import com.ecommerce.backendecommerce.Entitys.User;
import com.ecommerce.backendecommerce.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    public UserRepo userRepository;

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User update(User user) {
        User currentUser = userRepository.findById(user.getId()).get();
        currentUser.setFirstName(user.getFirstName());
        currentUser.setLastName(user.getLastName());
        currentUser.setEmail(user.getEmail());
        currentUser.setAddress(user.getAddress());
        currentUser.setPhoneNumber(user.getPhoneNumber());
        return userRepository.save(currentUser);
    }

    public void deleteById(int id) {
        userRepository.deleteById(id);
    }

    public User registerUser(String firstName, String lastName, String email, String password) {

        User newUser = new User(firstName, lastName, email, password);
        return userRepository.save(newUser);
    }

    // Login
    public User loginUser(User currentUser) {
        Iterable<User> users = userRepository.findAll();
        for (User u : users) {
            if (u.getEmail().equals(currentUser.getEmail()) && u.getPassword().equals(currentUser.getPassword())) {
                return u;
            } else {
                throw new RuntimeException("Credenciales incorrectas");
            }
        }
        return null;
    }
}
