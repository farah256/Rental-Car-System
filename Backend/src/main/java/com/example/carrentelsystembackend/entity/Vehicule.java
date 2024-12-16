package com.example.carrentelsystembackend.entity;

import com.example.carrentelsystembackend.enums.VehiculeStatut;
import com.example.carrentelsystembackend.enums.VehiculeType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "vehicule")
public class Vehicule {
    @Id
    @Column(nullable = false, unique = true)
    private String matricule;
    @NotNull
    private String brand;
    @NotNull
    private String model;
    private int year;
    @Enumerated(EnumType.STRING)
    @NotNull
    private VehiculeType type;
    @NotNull
    private float price;
    @Enumerated(EnumType.STRING)
    @NotNull
    private VehiculeStatut statu=VehiculeStatut.Available;
    private String image;

    public Vehicule() {
    }

    public Vehicule(String matricule, String brand,
                    String model, int year, VehiculeType type,
                    float price, VehiculeStatut statu,
                    String image) {
        this.matricule = matricule;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.type = type;
        this.price = price;
        this.statu = statu;
        this.image = image;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public VehiculeType getType() {
        return type;
    }

    public void setType(VehiculeType type) {
        this.type = type;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public VehiculeStatut getStatu() {
        return statu;
    }

    public void setStatu(VehiculeStatut statu) {
        this.statu = statu;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "Vehicule{" +
                "matricule='" + matricule + '\'' +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", year=" + year +
                ", type=" + type +
                ", price=" + price +
                ", statu=" + statu +
                ", image='" + image + '\'' +
                '}';
    }
}