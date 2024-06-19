package com.ecommerce.backendecommerce.Entitys;

import jakarta.persistence.*;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Receipt")
@XmlRootElement

public class Receipt implements Serializable {
    private static final long serialVersionUID = -92346781936044228L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "receipt_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User user;


    @Basic(optional = false)
    @Column(name = "receipt_number")
    private Integer receiptNumber;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "items_on_receipt", // Crea la tabla con la relación hacia las otras dos
            joinColumns = @JoinColumn(name = "receipt_number"), inverseJoinColumns = @JoinColumn(name = "product_id")) // {@JoinColumn(name
    @Column(name = "items")
    private List<Product> items;

    @Basic(optional = false)
    @Column(name = "date_time")
    private String dateTime;

    @Basic(optional = false)
    @Column(name = "user_id")
    private Integer address;

    private Double total;


    private Integer amountOfItems;

    public Receipt( User user, List<Product> items, String dateTime, Integer amountOfItems) {
        this.receiptNumber = receiptNumber;
        this.items = items;
        this.dateTime = dateTime;
        this.amountOfItems = amountOfItems;
    }
    public Receipt(User user, List<Product> products, Double total, String dateTime, Integer amountOfItems) {
        this.user = user;
        this.items = products;
        this.total = total;
        this.dateTime = dateTime;
        this.amountOfItems = amountOfItems;
    }

    public Receipt() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(Integer receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public List<Product> getItems() {
        return items;
    }

    public void setItems(List<Product> items) {
        this.items = items;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public Integer getAddress() {
        return address;
    }

    public void setAddress(Integer address) {
        this.address = address;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Integer getAmountOfItems() {
        return amountOfItems;
    }

    public void setAmountOfItems(Integer amountOfItems) {
        this.amountOfItems = amountOfItems;
    }
}
