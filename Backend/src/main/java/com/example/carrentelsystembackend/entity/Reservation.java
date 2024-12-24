package com.example.carrentelsystembackend.entity;

import com.example.carrentelsystembackend.enums.StatusReservation;
import com.example.carrentelsystembackend.security.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.Date;
import java.util.Optional;

@Entity
public class Reservation {
    @Id
    @GeneratedValue
    private Long idReservation;

    @Enumerated(EnumType.STRING)
    private StatusReservation statusReservation=StatusReservation.PENDING;

    private Date dateCreaction;

    @NotNull(message = "check in date is required")
    private Date debutLocation;

    @NotNull(message = "check out date is required")
    private Date finLocation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idUser")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "matricule", referencedColumnName = "matricule")
    private Vehicule vehicule;

    private Date dateArchivage;

    public Reservation() {
    }

    public Reservation(Long idReservation, StatusReservation statusReservation, Date dateCreaction, Date debutLocation, Date finLocation, User user, Vehicule vehicule, Date dateArchivage) {
        this.idReservation = idReservation;
        this.statusReservation = statusReservation;
        this.dateCreaction = dateCreaction;
        this.debutLocation = debutLocation;
        this.finLocation = finLocation;
        this.user = user;
        this.vehicule = vehicule;
        this.dateArchivage = dateArchivage;
    }

    public Long getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Long idReservation) {
        this.idReservation = idReservation;
    }

    public StatusReservation getStatusReservation() {
        return statusReservation;
    }

    public void setStatusReservation(StatusReservation statusReservation) {
        this.statusReservation = statusReservation;
    }

    public Date getDateCreaction() {
        return dateCreaction;
    }

    public void setDateCreaction(Date dateCreaction) {
        this.dateCreaction = dateCreaction;
    }

    public Date getDebutLocation() {
        return debutLocation;
    }

    public void setDebutLocation(Date debutLocation) {
        this.debutLocation = debutLocation;
    }

    public Date getFinLocation() {
        return finLocation;
    }

    public void setFinLocation(Date finLocation) {
        this.finLocation = finLocation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vehicule getVehicule() {
        return vehicule;
    }

    public void setVehicule(Vehicule vehicule) {
        this.vehicule = vehicule;
    }

    public Date getDateArchivage() {
        return dateArchivage;
    }

    public void setDateArchivage(Date dateArchivage) {
        this.dateArchivage = dateArchivage;
    }
}
