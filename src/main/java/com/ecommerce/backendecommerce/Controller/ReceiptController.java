package com.ecommerce.backendecommerce.Controller;

import com.ecommerce.backendecommerce.Entitys.Product;
import com.ecommerce.backendecommerce.Entitys.Receipt;
import com.ecommerce.backendecommerce.Service.ReceiptService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;

@RestController
@RequestMapping("/receipts")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor(onConstructor=@__(@Autowired))


public class ReceiptController {
    private ReceiptService receiptService;


    @PostMapping("/create")
    public Receipt createReceipt(@RequestBody ReceiptRegisterObject receiptRegisterObject) {
        Integer userId = receiptRegisterObject.userId;
        List<Product> products = receiptRegisterObject.items;
        Integer amountOfItems = receiptRegisterObject.amountOfItems;
        return receiptService.createReceipt(userId, products, amountOfItems);
    }

    @GetMapping("/read")
    public Receipt readReceipt(@RequestBody LinkedHashMap<String, Integer> body) {
        return receiptService.getReceiptById(body.get("id")).get();
    }

    @PutMapping("/update")
    public Receipt updateReceipt(@RequestBody Receipt receiptRegisterObject) {
        return receiptService.updateReceipt(receiptRegisterObject);
    }

    @DeleteMapping("/delete")
    public void deleteReceipt(@RequestBody LinkedHashMap<String, Integer> body) {
         receiptService.deleteReceipt(body.get("id"));
    }
}
