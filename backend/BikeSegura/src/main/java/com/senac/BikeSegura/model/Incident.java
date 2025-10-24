package com.senac.BikeSegura.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity @Table(name = "incidents")
public class Incident {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private TypeIncidents type; // Criar um ENUM para os incidentes (BURACO, ASSALTO, ILUMINACAO...)
    private String description;
    private Double latitude;
    private Double longitude;
    private LocalDateTime createdAt = LocalDateTime.now();
    @ManyToOne
    private User reporter;

    public Incident() {
    }

    public Incident(long id, String type, String description, Double latitude, Double longitude, LocalDateTime createdAt, User reporter) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
        this.reporter = reporter;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getReporter() {
        return reporter;
    }

    public void setReporter(User reporter) {
        this.reporter = reporter;
    }
}
