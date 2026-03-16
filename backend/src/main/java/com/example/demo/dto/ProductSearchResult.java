package com.example.demo.dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * 商品搜索结果 DTO
 */
public class ProductSearchResult {
    private String id;
    private String name;
    private String image;
    private String description;
    private Double rating;
    private Integer reviews;
    private BigDecimal lowestPrice;
    private BigDecimal highestPrice;
    private List<PlatformPrice> prices;

    public ProductSearchResult() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviews() { return reviews; }
    public void setReviews(Integer reviews) { this.reviews = reviews; }

    public BigDecimal getLowestPrice() { return lowestPrice; }
    public void setLowestPrice(BigDecimal lowestPrice) { this.lowestPrice = lowestPrice; }

    public BigDecimal getHighestPrice() { return highestPrice; }
    public void setHighestPrice(BigDecimal highestPrice) { this.highestPrice = highestPrice; }

    public List<PlatformPrice> getPrices() { return prices; }
    public void setPrices(List<PlatformPrice> prices) { this.prices = prices; }
}
