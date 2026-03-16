package com.example.demo.dto;

/**
 * 佣金链接请求 DTO
 */
public class AffiliateLinkRequest {
    private String productId;
    private String platform;
    private String url;

    public AffiliateLinkRequest() {}

    // Getters and Setters
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
