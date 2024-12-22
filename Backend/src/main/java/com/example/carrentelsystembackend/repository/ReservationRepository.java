package com.example.carrentelsystembackend.repository;

import com.example.carrentelsystembackend.entity.Reservation;
import com.example.carrentelsystembackend.enums.StatusReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByStatusReservation(StatusReservation statusReservation);

    List<Reservation> findByVehiculeMatriculeAndStatusReservation(String vehiculeMatricule, StatusReservation statusReservation);


    // Retourner La liste Des Resrvations qui ont un chevauchement avec cette pariode
    @Query("SELECT r FROM Reservation r WHERE r.vehicule.matricule = :vehiculeId " +
            "AND (r.debutLocation BETWEEN :debut AND :fin OR r.finLocation BETWEEN :debut AND :fin " +
            "OR (r.debutLocation <= :debut AND r.finLocation >= :fin))")
    List<Reservation> findReservationsForVehiculeBetweenDates(String vehiculeId, Date debut, Date fin);




}
