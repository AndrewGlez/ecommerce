package com.ecommerce.backendecommerce.Entitys;

import jakarta.persistence.*;

import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
@Entity
@Table(name = "Products")
@XmlRootElement

public class Product implements Serializable {
    private static final long serialVersionUID = -92346781936044228L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "product_id")
    private Integer id;

    @Basic(optional = false)
    @Column(name = "product_name")
    private String name;

    @Basic(optional = false)
    @Column(name = "image_url")
    private String imageUrl;

    @Basic(optional = false)
    @Column(name = "product_description")
    private String description;

    @Basic(optional = false)
    @Column(name = "product_price")
    private Double price;

    private Integer amount;

    public Product(Integer id, String name, String imageUrl, String description, Double price, Integer amount) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.amount = amount;
    }

    public Product() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
