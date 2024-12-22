package com.example.carrentelsystembackend.Mapper;

import com.example.carrentelsystembackend.dto.ReservationDTO;
import com.example.carrentelsystembackend.entity.Reservation;
import com.example.carrentelsystembackend.entity.Vehicule;
import com.example.carrentelsystembackend.repository.VehiculeRepository;
import com.example.carrentelsystembackend.security.entity.User;
import com.example.carrentelsystembackend.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VehiculeRepository vehiculeRepository;

    // Mapper pour convertir une entité Reservation en DTO
    public ReservationDTO toDTO(Reservation reservation) {
        if (reservation == null) return null;

        return new ReservationDTO(
                reservation.getIdReservation(),
                reservation.getStatusReservation(),
                reservation.getDateCreaction(),
                reservation.getDebutLocation(),
                reservation.getFinLocation(),
                reservation.getUser().getId(),  // Récupération de l'ID de l'utilisateur
                reservation.getVehicule().getMatricule() // Récupération du matricule du véhicule
        );
    }

    // Mapper pour convertir un DTO en entité Reservation
    public Reservation toEntity(ReservationDTO reservationDTO) {
        if (reservationDTO == null) return null;

        Reservation reservation = new Reservation();
        reservation.setIdReservation(reservationDTO.getIdReservation());
        reservation.setStatusReservation(reservationDTO.getStatusReservation());
        reservation.setDateCreaction(reservationDTO.getDateCreaction());
        reservation.setDebutLocation(reservationDTO.getDebutLocation());
        reservation.setFinLocation(reservationDTO.getFinLocation());

        // Récupération de l'entité User à partir de l'ID dans le DTO
        User user = userRepository.findById(reservationDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + reservationDTO.getUserId()));
        reservation.setUser(user);

        // Récupération de l'entité Vehicule à partir du matricule dans le DTO
        Vehicule vehicule = vehiculeRepository.findByMatricule(reservationDTO.getMatricule());
        if (vehicule == null) {
            throw new RuntimeException("Vehicule not found with matricule: " + reservationDTO.getMatricule());
        }
        reservation.setVehicule(vehicule);

        return reservation;
    }
}
