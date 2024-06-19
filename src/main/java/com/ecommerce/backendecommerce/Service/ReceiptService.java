package com.ecommerce.backendecommerce.Service;

import com.ecommerce.backendecommerce.Entitys.Product;
import com.ecommerce.backendecommerce.Entitys.Receipt;
import com.ecommerce.backendecommerce.Entitys.User;
import com.ecommerce.backendecommerce.Repository.ProductRepo;
import com.ecommerce.backendecommerce.Repository.ReceiptRepo;
import com.ecommerce.backendecommerce.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReceiptService {
    @Autowired
    private ReceiptRepo receiptRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ProductRepo productRepo;

    public Iterable<Receipt> getAllReceipts() {
        return receiptRepo.findAll();
    }
    public Optional<Receipt> getReceiptById(int id) {
        return receiptRepo.findById(id);
    }

    public Receipt createReceipt(String email, List<Product> product, Double total) {
        User userReceipt = userRepo.findByEmail(email).get();
        Receipt newReceipt = new Receipt(userReceipt, product, total, getDateTime(), product.size());
        return receiptRepo.save(newReceipt);
    }
    public Receipt createReceipt(Integer id, List<Product> items, Integer amountOfItems) {
        User userReceipt = userRepo.findById(id).get();
        List<Product> itemsReceipt = new ArrayList<>();
        Double total = 0.0;
        Integer amountOfItem = 0;
        for (Product item : items) {
            Product addItem = productRepo.findById(item.getId()).get();
            addItem.setAmount(item.getAmount());
            total += item.getPrice() * item.getAmount();
            amountOfItem += item.getAmount();
            itemsReceipt.add(addItem);
        }
        //User userReceipt = userRepo.findByEmail(email).get();
        Receipt newReceipt = new Receipt(userReceipt, items, getDateTime(), amountOfItem);
        return receiptRepo.save(newReceipt);
    }
    public Receipt updateReceipt(Receipt receipt) {
        Receipt curretReceipt = receiptRepo.findById(receipt.getId()).get();
        curretReceipt.setReceiptNumber(receipt.getReceiptNumber());
        curretReceipt.setAddress(receipt.getAddress());
        curretReceipt.setDateTime(receipt.getDateTime());
        curretReceipt.setItems(receipt.getItems());
        return receiptRepo.save(curretReceipt);
    }
    public void deleteReceipt(int id) {
        receiptRepo.deleteById(id);
    }

    public String getDateTime() {
        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.now().format(format);
    }

}
