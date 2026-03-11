package com.example.demo.repository;

import com.example.demo.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

    // 根据分类查询启用的菜品
    List<Food> findByCategoryAndEnabled(String category, Boolean enabled);

    // 查询所有启用的菜品
    List<Food> findByEnabled(Boolean enabled);

    // 随机查询一个菜品（按分类）
    @Query(value = "SELECT * FROM foods WHERE category = ?1 AND enabled = true ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Food findRandomByCategory(String category);

    // 随机查询一个菜品（不限制分类）
    @Query(value = "SELECT * FROM foods WHERE enabled = true ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Food findRandom();
}
