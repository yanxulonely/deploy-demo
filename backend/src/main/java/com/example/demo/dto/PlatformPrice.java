package com.example.demo.dto;

import java.math.BigDecimal;

/**
 * 平台价格 DTO
 */
public class PlatformPrice {
    private String platform;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private String url;
    private BigDecimal commission;
    private Boolean inStock;

    public PlatformPrice() {}

    // Getters and Setters
    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public BigDecimal getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public BigDecimal getCommission() { return commission; }
    public void setCommission(BigDecimal commission) { this.commission = commission; }

    public Boolean getInStock() { return inStock; }
    public void setInStock(Boolean inStock) { this.inStock = inStock; }
}
