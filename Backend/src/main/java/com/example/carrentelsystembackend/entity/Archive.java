package com.example.carrentelsystembackend.entity;

import jakarta.persistence.*;

@Entity
public class Archive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idArchive;

    @Column(name = "reservation_id", nullable = false)
    private Long reservationId;

    public Archive() {
    }

    public Archive(Long idArchive, Long reservationId) {
        this.idArchive = idArchive;
        this.reservationId = reservationId;
    }

    public Long getIdArchive() {
        return idArchive;
    }

    public void setIdArchive(Long idArchive) {
        this.idArchive = idArchive;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }
}
