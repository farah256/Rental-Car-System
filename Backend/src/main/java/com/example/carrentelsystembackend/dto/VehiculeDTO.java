package com.example.carrentelsystembackend.dto;

import com.example.carrentelsystembackend.enums.VehiculeStatut;
import com.example.carrentelsystembackend.enums.VehiculeType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.Type;

import java.util.ArrayList;
import java.util.List;

public class VehiculeDTO {

    private String matricule;
    private String brand;
    private String model;
    private int year;
    private VehiculeType type;
    private float price;
    private VehiculeStatut statu = VehiculeStatut.Available;


    public VehiculeDTO() {
    }

    public VehiculeDTO(String matricule, String brand, String model, int year, VehiculeType type, float price, VehiculeStatut statu) {
        this.matricule = matricule;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.type = type;
        this.price = price;
        this.statu = statu;
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




}