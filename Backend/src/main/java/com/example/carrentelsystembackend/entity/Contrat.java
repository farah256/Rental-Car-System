package com.example.carrentelsystembackend.entity;


import org.springframework.stereotype.Component;

@Component
public class Contrat {


    private Long idContrat;
    private float totalCost;
    private Reservation reservation;

    public Contrat() {

    }

    public Contrat(Long idContrat, float totalCost, Reservation reservation) {
        this.idContrat = idContrat;
        this.totalCost = totalCost;
        this.reservation = reservation;
    }

    public Long getIdContrat() {
        return idContrat;
    }

    public void setIdContrat(Long idContrat) {
        this.idContrat = idContrat;
    }

    public float getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(float totalCost) {
        this.totalCost = totalCost;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }
}



















