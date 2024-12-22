package com.example.carrentelsystembackend.Service.impl;

import com.example.carrentelsystembackend.Mapper.ReservationMapper;
import com.example.carrentelsystembackend.Service.ArchiveService;
import com.example.carrentelsystembackend.dto.ReservationDTO;
import com.example.carrentelsystembackend.entity.Archive;
import com.example.carrentelsystembackend.entity.Reservation;
import com.example.carrentelsystembackend.enums.StatusReservation;
import com.example.carrentelsystembackend.exception.ReservationArchivalNotAllowedException;
import com.example.carrentelsystembackend.exception.ReservationNotFoundException;
import com.example.carrentelsystembackend.repository.ArchiveRepository;
import com.example.carrentelsystembackend.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class ArchiveServiceImpl implements ArchiveService {

    private ArchiveRepository archiveRepository;
    private ReservationRepository reservationRepository;
    private ReservationMapper reservationMapper;


    public ArchiveServiceImpl(ArchiveRepository archiveRepository, ReservationRepository reservationRepository,ReservationMapper reservationMapper) {
        this.archiveRepository = archiveRepository;
        this.reservationRepository = reservationRepository;
        this.reservationMapper=reservationMapper;
    }

    @Override
    public ReservationDTO archiverReservation(Long idReservation) {
        // Récupérer la réservation par ID
        Reservation reservation = reservationRepository.findById(idReservation)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation Id Not Found !!"));

        // Vérifier que le statut de la réservation est 'COMPLETED' ou 'CANCELLED'
        if (reservation.getStatusReservation() != StatusReservation.COMPLETED &&
                reservation.getStatusReservation() != StatusReservation.CANCELLED) {
            throw new ReservationArchivalNotAllowedException("Only COMPLETED or CANCELLED reservations can be archived!");
        }

       Archive archive =new Archive();

        // Ajouter la réservation à l'archive
        reservation.setDateArchivage(new Date());  // Mettre à jour la date d'archivage de la réservation

        archive.setReservationId(idReservation);  // Ajouter la réservation à l'archive

        // Sauvegarder l'archive et la réservation
        archiveRepository.save(archive);
        reservationRepository.save(reservation);

        return reservationMapper.toDTO(reservation);
    }

}
