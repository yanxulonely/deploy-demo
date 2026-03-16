package com.example.demo.service;

import com.example.demo.dto.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

/**
 * 比价服务
 * 
 * TODO: 实际项目中需要对接：
 * 1. 淘宝联盟 API (https://open.taobao.com/)
 * 2. 京东联盟 API (https://union.jd.com/)
 * 3. 拼多多联盟 API
 * 4. 自建价格数据库
 */
@Service
public class PriceCompareService {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
    // 模拟热门商品数据（实际应该从数据库或 API 获取）
    private static final List<Map<String, Object>> MOCK_PRODUCTS = Arrays.asList(
        createMockProduct("1", "Apple iPhone 15 Pro (256GB) 深空黑色", 
            "https://via.placeholder.com/200x200?text=iPhone+15", 7999, 8999),
        createMockProduct("2", "Sony WH-1000XM5 头戴式降噪耳机", 
            "https://via.placeholder.com/200x200?text=Sony+XM5", 2399, 2999),
        createMockProduct("3", "MacBook Pro 14 M3 Pro 芯片", 
            "https://via.placeholder.com/200x200?text=MacBook", 14999, 16999),
        createMockProduct("4", "AirPods Pro 2 代 MagSafe 充电盒", 
            "https://via.placeholder.com/200x200?text=AirPods", 1699, 1999),
        createMockProduct("5", "Nintendo Switch OLED 白色", 
            "https://via.placeholder.com/200x200?text=Switch", 1899, 2199),
        createMockProduct("6", "PlayStation 5 光驱版", 
            "https://via.placeholder.com/200x200?text=PS5", 3899, 4299),
        createMockProduct("7", "iPad Air 5 M1 芯片 64GB", 
            "https://via.placeholder.com/200x200?text=iPad", 4399, 4999),
        createMockProduct("8", "Dell U2723QE 27 寸 4K 显示器", 
            "https://via.placeholder.com/200x200?text=Dell", 3999, 4599)
    );

    private static Map<String, Object> createMockProduct(String id, String name, String image, 
                                                          int lowPrice, int highPrice) {
        Map<String, Object> product = new HashMap<>();
        product.put("id", id);
        product.put("name", name);
        product.put("image", image);
        product.put("lowPrice", lowPrice);
        product.put("highPrice", highPrice);
        return product;
    }

    /**
     * 搜索商品
     */
    public List<ProductSearchResult> searchProducts(String keyword, String platform) {
        // TODO: 实际应该调用电商平台 API
        // 这里返回模拟数据
        
        List<ProductSearchResult> results = new ArrayList<>();
        ThreadLocalRandom random = ThreadLocalRandom.current();
        
        // 过滤商品（简单模拟）
        for (Map<String, Object> mock : MOCK_PRODUCTS) {
            if (mock.get("name").toString().toLowerCase().contains(keyword.toLowerCase())) {
                ProductSearchResult product = new ProductSearchResult();
                product.setId(mock.get("id").toString());
                product.setName(mock.get("name").toString());
                product.setImage(mock.get("image").toString());
                product.setRating(4.5 + random.nextDouble(0.5));
                product.setReviews(random.nextInt(1000, 20000));
                
                // 生成各平台价格
                List<PlatformPrice> prices = generatePlatformPrices(
                    (int) mock.get("lowPrice"),
                    (int) mock.get("highPrice"),
                    platform
                );
                product.setPrices(prices);
                
                // 计算最低和最高价
                product.setLowestPrice(prices.stream()
                    .map(PlatformPrice::getPrice)
                    .min(BigDecimal::compareTo)
                    .orElse(BigDecimal.ZERO));
                product.setHighestPrice(prices.stream()
                    .map(PlatformPrice::getPrice)
                    .max(BigDecimal::compareTo)
                    .orElse(BigDecimal.ZERO));
                
                results.add(product);
            }
        }
        
        // 如果没有匹配，返回一些随机结果
        if (results.isEmpty()) {
            for (int i = 0; i < Math.min(3, MOCK_PRODUCTS.size()); i++) {
                Map<String, Object> mock = MOCK_PRODUCTS.get(i);
                ProductSearchResult product = new ProductSearchResult();
                product.setId(mock.get("id").toString());
                product.setName(mock.get("name").toString() + " (相关)");
                product.setImage(mock.get("image").toString());
                product.setRating(4.5 + random.nextDouble(0.5));
                product.setReviews(random.nextInt(1000, 20000));
                
                List<PlatformPrice> prices = generatePlatformPrices(
                    (int) mock.get("lowPrice"),
                    (int) mock.get("highPrice"),
                    platform
                );
                product.setPrices(prices);
                product.setLowestPrice(prices.stream()
                    .map(PlatformPrice::getPrice)
                    .min(BigDecimal::compareTo)
                    .orElse(BigDecimal.ZERO));
                product.setHighestPrice(prices.stream()
                    .map(PlatformPrice::getPrice)
                    .max(BigDecimal::compareTo)
                    .orElse(BigDecimal.ZERO));
                
                results.add(product);
            }
        }
        
        return results;
    }

    /**
     * 生成各平台价格
     */
    private List<PlatformPrice> generatePlatformPrices(int lowPrice, int highPrice, String platformFilter) {
        List<PlatformPrice> prices = new ArrayList<>();
        ThreadLocalRandom random = ThreadLocalRandom.current();
        
        String[] platforms = {"淘宝", "京东", "拼多多"};
        String[] platformCodes = {"taobao", "jd", "pdd"};
        
        for (int i = 0; i < platforms.length; i++) {
            // 如果指定了平台过滤，只返回该平台
            if (platformFilter != null && !platformFilter.isEmpty() 
                && !platformCodes[i].equals(platformFilter)) {
                continue;
            }
            
            PlatformPrice price = new PlatformPrice();
            price.setPlatform(platforms[i]);
            
            // 各平台价格略有不同
            int platformPrice = lowPrice + random.nextInt(highPrice - lowPrice + 1);
            price.setPrice(new BigDecimal(platformPrice));
            price.setOriginalPrice(new BigDecimal(highPrice));
            price.setUrl("https://example.com/product/" + platforms[i]);
            price.setInStock(true);
            
            // 计算佣金（3%-10%）
            BigDecimal commissionRate = new BigDecimal(String.valueOf(0.03 + random.nextDouble(0.07)));
            price.setCommission(price.getPrice().multiply(commissionRate).setScale(2, BigDecimal.ROUND_HALF_UP));
            
            prices.add(price);
        }
        
        // 按价格排序
        prices.sort(Comparator.comparing(PlatformPrice::getPrice));
        
        return prices;
    }

    /**
     * 获取价格历史
     */
    public List<PriceHistoryItem> getPriceHistory(String productId) {
        // TODO: 实际应该从数据库查询历史记录
        // 这里生成模拟数据
        
        List<PriceHistoryItem> history = new ArrayList<>();
        ThreadLocalRandom random = ThreadLocalRandom.current();
        
        // 生成过去 30 天的价格
        BigDecimal basePrice = new BigDecimal(5000 + random.nextInt(5000));
        
        for (int i = 30; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            // 价格随机波动
            BigDecimal price = basePrice.add(new BigDecimal(random.nextInt(-500, 500)));
            price = price.max(BigDecimal.valueOf(100)); // 最低 100 元
            
            history.add(new PriceHistoryItem(
                date.format(DATE_FORMATTER),
                price
            ));
        }
        
        return history;
    }

    /**
     * 生成佣金链接
     */
    public String generateAffiliateLink(String productId, String platform, String originalUrl) {
        // TODO: 实际应该调用联盟 API 生成推广链接
        // 淘宝联盟：AlimamaConvertLink
        // 京东联盟：JDUnionConvertLink
        // 拼多多：PDDConvertLink
        
        // 这里返回模拟链接
        return originalUrl + "?affiliate_id=YOUR_AFFILIATE_ID&product_id=" + productId;
    }

    /**
     * 记录用户点击
     */
    public void recordClick(String productId, String platform) {
        // TODO: 记录到数据库，用于统计和结算
        System.out.println("Click recorded: productId=" + productId + ", platform=" + platform);
    }

    /**
     * 获取热门商品
     */
    public List<ProductSearchResult> getHotProducts(int limit) {
        // TODO: 实际应该根据销量/点击量排序
        return searchProducts("", null).stream()
            .limit(limit)
            .toList();
    }
}
