package com.nguyenthanhbang.foodordering.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Restaurant restaurant;

    @ManyToOne
    private User user;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String content;
    private LocalDateTime createdAt;
}
