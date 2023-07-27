package com.wmdev.WmFullStackProffesional.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "notes")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Note {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String text;
}
