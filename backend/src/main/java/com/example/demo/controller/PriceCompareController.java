package com.example.demo.controller;

import com.example.demo.dto.ProductSearchResult;
import com.example.demo.dto.PriceHistoryItem;
import com.example.demo.dto.AffiliateLinkRequest;
import com.example.demo.dto.AffiliateLinkResponse;
import com.example.demo.service.PriceCompareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/price-compare")
@CrossOrigin(origins = "*")
public class PriceCompareController {

    @Autowired
    private PriceCompareService priceCompareService;

    /**
     * 搜索商品
     * GET /api/price-compare/search?keyword=iPhone&platform=taobao
     */
    @GetMapping("/search")
    public Map<String, Object> searchProducts(
            @RequestParam String keyword,
            @RequestParam(required = false) String platform) {
        
        List<ProductSearchResult> products = priceCompareService.searchProducts(keyword, platform);
        
        return Map.of(
            "success", true,
            "keyword", keyword,
            "platform", platform != null ? platform : "all",
            "count", products.size(),
            "products", products
        );
    }

    /**
     * 获取价格历史
     * GET /api/price-compare/history/{productId}
     */
    @GetMapping("/history/{productId}")
    public Map<String, Object> getPriceHistory(@PathVariable String productId) {
        List<PriceHistoryItem> history = priceCompareService.getPriceHistory(productId);
        
        return Map.of(
            "success", true,
            "productId", productId,
            "history", history
        );
    }

    /**
     * 生成佣金链接
     * POST /api/price-compare/affiliate
     */
    @PostMapping("/affiliate")
    public AffiliateLinkResponse getAffiliateLink(@RequestBody AffiliateLinkRequest request) {
        String affiliateUrl = priceCompareService.generateAffiliateLink(
            request.getProductId(),
            request.getPlatform(),
            request.getUrl()
        );
        
        return new AffiliateLinkResponse(affiliateUrl, true);
    }

    /**
     * 记录用户点击（用于统计）
     * POST /api/price-compare/click
     */
    @PostMapping("/click")
    public Map<String, Object> recordClick(
            @RequestParam String productId,
            @RequestParam String platform) {
        
        priceCompareService.recordClick(productId, platform);
        
        return Map.of("success", true);
    }

    /**
     * 获取热门商品
     * GET /api/price-compare/hot
     */
    @GetMapping("/hot")
    public Map<String, Object> getHotProducts(
            @RequestParam(required = false, defaultValue = "10") Integer limit) {
        
        List<ProductSearchResult> products = priceCompareService.getHotProducts(limit);
        
        return Map.of(
            "success", true,
            "count", products.size(),
            "products", products
        );
    }
}
