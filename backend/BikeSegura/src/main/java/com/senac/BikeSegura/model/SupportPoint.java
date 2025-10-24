package com.senac.BikeSegura.model;


import jakarta.persistence.*;

@Entity @Table(name = "support_point")
public class SupportPoint {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private TypeLocals type; // Criar um ENUM de tipo com os locais (BICICLETARIA, BEBEDOURO, OFICINA...)
    private Double latitude;
    private Double longitude;

    public SupportPoint(Long id, String name, TypeLocals type, Double latitude, Double longitude) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public SupportPoint() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TypeLocals getType() {
        return type;
    }

    public void setType(TypeLocals type) {
        this.type = type;
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
}
