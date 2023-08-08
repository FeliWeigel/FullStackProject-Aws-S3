package com.wmdev.WmFullStackProffesional.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wmdev.WmFullStackProffesional.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "contacts")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Contact {

    @Id
    @GeneratedValue
    private Long id;
    private String firstname;
    private String lastname;
    private Long number;
    private String logo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;


}
