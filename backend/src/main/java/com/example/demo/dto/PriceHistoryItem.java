package com.example.demo.dto;

import java.math.BigDecimal;

/**
 * 价格历史 DTO
 */
public class PriceHistoryItem {
    private String date;
    private BigDecimal price;

    public PriceHistoryItem() {}

    public PriceHistoryItem(String date, BigDecimal price) {
        this.date = date;
        this.price = price;
    }

    // Getters and Setters
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}
