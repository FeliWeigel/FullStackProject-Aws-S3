package com.wmdev.WmFullStackProffesional.security.jwt;

import com.wmdev.WmFullStackProffesional.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@Table(name = "tokens")
@AllArgsConstructor
@NoArgsConstructor
public class Token {

    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String token;
    public Boolean revoked;
    public Boolean expired;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_Id")
    private User user;

}
