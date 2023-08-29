package com.wmdev.WmFullStackProffesional.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wmdev.WmFullStackProffesional.entities.Contact;
import com.wmdev.WmFullStackProffesional.entities.Note;
import com.wmdev.WmFullStackProffesional.entities.Task;
import com.wmdev.WmFullStackProffesional.security.jwt.Token;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(
        name = "users",
        uniqueConstraints = {
            @UniqueConstraint(
                    name = "profile_image_id_unique",
                    columnNames = "profileImageId"
            )
        }
)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String password;

    @Column(unique = true)
    private String profileImageId;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Token> tokens;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Task> task_list;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Contact> contact_list;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Note> note_list;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
