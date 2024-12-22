package com.example.carrentelsystembackend.dto;


import com.example.carrentelsystembackend.enums.StatusReservation;
import org.springframework.stereotype.Component;
import java.util.Date;



@Component
public class ReservationDTO {
    private Long idReservation;
    private StatusReservation statusReservation;
    private Date dateCreaction;
    private Date debutLocation;
    private Date finLocation;
    private Long userId;
    private String matricule;

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public ReservationDTO() {
    }

    public ReservationDTO(Long idReservation, StatusReservation statusReservation, Date dateCreaction, Date debutLocation, Date finLocation, Long userId, String matricule) {
        this.idReservation = idReservation;
        this.statusReservation = statusReservation;
        this.dateCreaction = dateCreaction;
        this.debutLocation = debutLocation;
        this.finLocation = finLocation;
        this.userId = userId;
        this.matricule = matricule;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }




}
