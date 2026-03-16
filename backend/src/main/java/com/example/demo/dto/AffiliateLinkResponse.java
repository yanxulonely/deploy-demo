package com.example.demo.dto;

/**
 * 佣金链接响应 DTO
 */
public class AffiliateLinkResponse {
    private String affiliateUrl;
    private Boolean success;

    public AffiliateLinkResponse() {}

    public AffiliateLinkResponse(String affiliateUrl, Boolean success) {
        this.affiliateUrl = affiliateUrl;
        this.success = success;
    }

    // Getters and Setters
    public String getAffiliateUrl() { return affiliateUrl; }
    public void setAffiliateUrl(String affiliateUrl) { this.affiliateUrl = affiliateUrl; }

    public Boolean getSuccess() { return success; }
    public void setSuccess(Boolean success) { this.success = success; }
}
