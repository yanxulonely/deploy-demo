package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "foods")
@Data
@NoArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 菜名
    private String name;

    // 分类: breakfast/lunch/dinner/snack
    private String category;

    // 标签: 辣/不辣/快/慢/素食/荤菜...
    private String tags;

    // 是否启用
    private Boolean enabled = true;

    // 最后一次吃的时间
    private LocalDateTime lastEatenAt;

    // 被选中的次数
    private Integer eatenCount = 0;

    // 创建时间
    private LocalDateTime createdAt = LocalDateTime.now();
}
