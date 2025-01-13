package com.example.carrentelsystembackend.Service;


import com.example.carrentelsystembackend.dto.ReservationDTO;
import com.example.carrentelsystembackend.entity.Reservation;
import com.example.carrentelsystembackend.entity.Vehicule;
import com.example.carrentelsystembackend.enums.StatusReservation;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public interface ReservationService {

    ReservationDTO creerReservation(ReservationDTO reservationDTO);
    void annulerReservation(Long idReservation);
    ReservationDTO archiverReservation(Long idReservation);
    byte[] confirmerReservation(Long idReservation) throws MessagingException, IOException;
    List<ReservationDTO> listeReservationParStatut(StatusReservation statut);
    boolean verifierDisponibilite(String matricule, Date debut, Date fin);
    float calculerChargeFixe(Long idReservation);
    List<ReservationDTO> listeReservation();
    Page<Reservation> findBookingWithPagination(int offset, int pageSize);
    Reservation updateBookingStatus(Long reservationId, StatusReservation newStatus);
    public Reservation getReservationById(Long idReservation);
    public long getTotalNumberOfReservations();


}
