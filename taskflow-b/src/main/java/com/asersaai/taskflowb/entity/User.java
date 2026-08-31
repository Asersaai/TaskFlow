package com.asersaai.taskflowb.entity;

import com.asersaai.taskflowb.entity.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column( length = 100, nullable = false)
    private String name;

    @Column(length = 270,nullable = false,unique = true)
    private String email;

    @Column(length = 270,nullable = false)
    private String password;


    @OneToMany(mappedBy = "user")
    private List<Task> tasks;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role=Role.USER;
    }


}
