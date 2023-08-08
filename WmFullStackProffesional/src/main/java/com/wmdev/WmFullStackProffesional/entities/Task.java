package com.wmdev.WmFullStackProffesional.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wmdev.WmFullStackProffesional.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "tasks")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private LocalDate creationDate;
    private LocalDate expirationDate;
    private Boolean isCompleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;
}
