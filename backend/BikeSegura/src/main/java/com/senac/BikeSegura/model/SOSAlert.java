package com.senac.BikeSegura.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity @Table(name = "sos_alerts")
public class SOSAlert {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double latitude;
    private Double longitude;
    private Status status; // Criar ENUM de status para ACTIVE e RESOLVED
    private LocalDateTime createdAt = LocalDateTime.now();
    @ManyToOne
    private User user;

    public SOSAlert() {
    }

    public SOSAlert(long id, Double latitude, Double longitude, String status, LocalDateTime createdAt, User user) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.createdAt = createdAt;
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
