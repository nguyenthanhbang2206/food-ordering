package com.nguyenthanhbang.foodordering.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Where(clause = "active = true")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment extends BaseEntity{


    @ManyToOne
    private Restaurant restaurant;

    @ManyToOne
    private User user;

    @Column(columnDefinition = "TEXT")
    private String content;
}
