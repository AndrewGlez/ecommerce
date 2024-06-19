package com.ecommerce.backendecommerce.Controller;

import com.ecommerce.backendecommerce.Entitys.User;
import com.ecommerce.backendecommerce.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET, produces = "application/json")
    public Iterable<User> getUsers() {
        return userService.findAll();
    }
    @RequestMapping( value = "/{id}",method = RequestMethod.GET, produces = "application/json")
    public Optional<User> getUserById(@PathVariable int id) {
        return userService.findById(id);
    }
    @RequestMapping(value = "/save", method = RequestMethod.POST, produces = "application/json")
    public User createUser(User user) {
        return userService.save(user);
    }
    @RequestMapping(value = "/update", method = RequestMethod.PUT, produces = "application/json")
    public User updateUser(User user) {
        return userService.update(user);
    }
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE, produces = "application/json")
    public void deleteUser(@PathVariable int id) {
        userService.deleteById(id);
    }
    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public User register(@RequestBody User user) {
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        String email = user.getEmail();
        String password = user.getPassword();
        return userService.registerUser(firstName, lastName, password, email);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
    public User login(@RequestBody User user) {
        return userService.loginUser(user);
    }
}
