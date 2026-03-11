package com.example.demo.controller;

import com.example.demo.entity.Food;
import com.example.demo.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "*")
public class FoodController {

    @Autowired
    private FoodRepository foodRepository;

    // 获取所有菜品
    @GetMapping
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // 获取启用的菜品
    @GetMapping("/enabled")
    public List<Food> getEnabledFoods() {
        return foodRepository.findByEnabled(true);
    }

    // 按分类获取菜品
    @GetMapping("/category/{category}")
    public List<Food> getFoodsByCategory(@PathVariable String category) {
        return foodRepository.findByCategoryAndEnabled(category, true);
    }

    // 根据ID获取单个菜品
    @GetMapping("/{id}")
    public Optional<Food> getFoodById(@PathVariable Long id) {
        return foodRepository.findById(id);
    }

    // 随机推荐一个（可选分类）
    @GetMapping("/random")
    public Food getRandomFood(@RequestParam(required = false) String category) {
        Food food;
        if (category != null && !category.isEmpty()) {
            food = foodRepository.findRandomByCategory(category);
        } else {
            food = foodRepository.findRandom();
        }
        return food;
    }

    // 创建菜品
    @PostMapping
    public Food createFood(@RequestBody Food food) {
        food.setCreatedAt(LocalDateTime.now());
        food.setEatenCount(0);
        food.setEnabled(true);
        return foodRepository.save(food);
    }

    // 更新菜品
    @PutMapping("/{id}")
    public Food updateFood(@PathVariable Long id, @RequestBody Food foodDetails) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        food.setName(foodDetails.getName());
        food.setCategory(foodDetails.getCategory());
        food.setTags(foodDetails.getTags());
        food.setEnabled(foodDetails.getEnabled());

        return foodRepository.save(food);
    }

    // 标记为已吃（更新统计）
    @PostMapping("/{id}/eat")
    public Food markAsEaten(@PathVariable Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        food.setLastEatenAt(LocalDateTime.now());
        food.setEatenCount(food.getEatenCount() + 1);

        return foodRepository.save(food);
    }

    // 删除菜品
    @DeleteMapping("/{id}")
    public void deleteFood(@PathVariable Long id) {
        foodRepository.deleteById(id);
    }
}
