package com.ecommerce.backendecommerce.Controller;


import com.ecommerce.backendecommerce.Entitys.Product;

import java.util.List;

public class ReceiptRegisterObject {
    public Integer userId;
    public List<Product> items;
    public Integer amountOfItems;
}
