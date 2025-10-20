package com.senac.BikeSegura.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

@Entity @Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must be at most 100 characters")
    private String name;
    @NotBlank(message = "Email is required")
    @Size(max = 100, message = "Email must be at most 100 characters")
    @Column(unique=true)
    private String email;
    @NotBlank(message = "Phone number is required")
    @Size(max = 11, message = "Phone must be at most 100 characters")
    private String phone;
    @NotBlank(message = "Password is required")
    private String password;

    public User(Integer id, String name, String email, String phone, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public @NotBlank(message = "Name is required") @Size(max = 100, message = "Name must be at most 100 characters") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name is required") @Size(max = 100, message = "Name must be at most 100 characters") String name) {
        this.name = name;
    }

    public @NotBlank(message = "Email is required") @Size(max = 100, message = "Email must be at most 100 characters") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email is required") @Size(max = 100, message = "Email must be at most 100 characters") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Phone number is required") @Size(max = 11, message = "Phone must be at most 100 characters") String getPhone() {
        return phone;
    }

    public void setPhone(@NotBlank(message = "Phone number is required") @Size(max = 11, message = "Phone must be at most 100 characters") String phone) {
        this.phone = phone;
    }

    public @NotBlank(message = "Password is required") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password is required") String password) {
        this.password = password;
    }
}
