package com.example.carrentelsystembackend.Service.impl;

import com.example.carrentelsystembackend.Mapper.ReservationMapper;
import com.example.carrentelsystembackend.Mapper.VehiculeMapper;
import com.example.carrentelsystembackend.Service.*;
import com.example.carrentelsystembackend.dto.ReservationDTO;
import com.example.carrentelsystembackend.dto.VehiculeDTO;
import com.example.carrentelsystembackend.entity.Contrat;
import com.example.carrentelsystembackend.entity.Reservation;
import com.example.carrentelsystembackend.entity.Vehicule;
import com.example.carrentelsystembackend.enums.StatusReservation;
import com.example.carrentelsystembackend.enums.VehiculeStatut;
import com.example.carrentelsystembackend.exception.MailNotFoundException;
import com.example.carrentelsystembackend.exception.OurException;
import com.example.carrentelsystembackend.exception.ReservationNotFoundException;
import com.example.carrentelsystembackend.repository.ReservationRepository;
import com.example.carrentelsystembackend.repository.VehiculeRepository;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ReservationServiceImpl implements ReservationService {

    private ReservationRepository reservationRepository;
    private VehiculeService vehiculeService;
    private ArchiveService archiveService;
    private ReservationMapper reservationMapper;
    private EmailService emailService;
    private ContratService contratService;

    public ReservationServiceImpl(ContratService contratService,EmailService emailService,ReservationRepository reservationRepository, ReservationMapper reservationMapper, ArchiveService archiveService,VehiculeService vehiculeService) {
        this.reservationRepository = reservationRepository;
        this.reservationMapper = reservationMapper;
        this.archiveService=archiveService;
        this.vehiculeService=vehiculeService;
        this.emailService=emailService;
        this.contratService=contratService;
    }

    @Override
    public ReservationDTO creerReservation(ReservationDTO reservationDTO) {
        Reservation reservation=reservationMapper.toEntity(reservationDTO);
        if (reservation.getUser() == null) {
            throw new IllegalArgumentException("A reservation must have an associated user.");
        }


        reservation.setDateCreaction(new Date());
        reservation.setStatusReservation(StatusReservation.IN_PROGRESS);
        // update vehicule status
        Vehicule vehicule =vehiculeService.getVehiculeById(reservationDTO.getMatricule());
        vehiculeService.updateStatutVehicule(vehicule.getMatricule(),VehiculeStatut.Waiting);
        // save reservation
        Reservation reservationSaved=reservationRepository.save(reservation);

        return reservationMapper.toDTO(reservationSaved);
    }

    @Override
    public void annulerReservation(Long idReservation) {
        Reservation reservation=reservationRepository.findById(idReservation).
                orElseThrow( ()-> new ReservationNotFoundException("Reservation Id Not Found !!") );

        // update vehicule status
        Vehicule vehicule =vehiculeService.getVehiculeById(reservation.getVehicule().getMatricule());

        vehiculeService.updateStatutVehicule(vehicule.getMatricule(),VehiculeStatut.Available);
       // reservation
        reservation.setStatusReservation(StatusReservation.CANCELLED);

        reservationRepository.save(reservation);
        this.archiverReservation(idReservation);

    }


    @Override
    public ReservationDTO archiverReservation(Long idReservation) {

       return archiveService.archiverReservation(idReservation);
    }

    @Override
    public byte[] confirmerReservation(Long idReservation) throws MessagingException, IOException {
        Reservation reservation = reservationRepository.findById(idReservation)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation Id Not Found !!"));

        // Mise à jour du statut du véhicule
        Vehicule vehicule = vehiculeService.getVehiculeById(reservation.getVehicule().getMatricule());
        vehiculeService.updateStatutVehicule(vehicule.getMatricule(), VehiculeStatut.Booked);

        // Mise à jour du statut de la réservation
        reservation.setStatusReservation(StatusReservation.CONFIRMED);
        reservationRepository.save(reservation);

        // Génération du contrat
        Contrat contrat = new Contrat();
        contrat.setIdContrat(reservation.getIdReservation()); // Utiliser l'ID de la réservation comme ID du contrat
        contrat.setReservation(reservation);
        contrat.setTotalCost(calculerChargeFixe(idReservation));


        // Envoyer un email avec le contrat en pièce jointe
        String email = reservation.getUser().getEmail();
        if (email != null) {
            emailService.sendEmailWithAttachment(email,null);

            return contratService.generateContratPDF(contrat);
        }

        throw new MailNotFoundException("L'email du client est null !!");
    }


    @Override
    public List<ReservationDTO> listeReservationParStatut(StatusReservation statut) {
        List<Reservation>reservationList=reservationRepository.findByStatusReservation(statut);
        return reservationList.stream().map(reservationMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public boolean verifierDisponibilite(String matricule, Date debut, Date fin) {
        List<Reservation>reservationListChevauchees=
                reservationRepository.findReservationsForVehiculeBetweenDates(matricule,debut,fin);

        return reservationListChevauchees.isEmpty();
    }

    @Override
    public float calculerChargeFixe(Long idReservation) {
        // Récupérer la réservation à partir de l'ID
        Reservation reservation = reservationRepository.findById(idReservation)
                .orElseThrow(() -> new ReservationNotFoundException("Reservation Id Not Found !!"));

        // Récupérer le véhicule associé à la réservation
        Vehicule vehicule = reservation.getVehicule();

        // Calculer la durée en jours
        long dureeMillis = reservation.getFinLocation().getTime() - reservation.getDebutLocation().getTime();
        long dureeJours = dureeMillis / (1000 * 60 * 60 * 24); // Conversion des millisecondes en jours

        // Vérifier si la durée est positive
        if (dureeJours <= 0) {
            throw new IllegalArgumentException("La durée de la réservation doit être positive.");
        }

        // Calculer la charge fixe
        float chargeFixe = vehicule.getPrice() * dureeJours;

        return chargeFixe;
    }


    @Override
    public List<ReservationDTO> listeReservation() {
          List<Reservation>reservationList=reservationRepository.findAll();
           List<ReservationDTO>reservationDTOS=reservationList.stream().map(reservationMapper::toDTO).collect(Collectors.toList());

        return reservationDTOS;
    }

    @Override
    public Page<Reservation> findBookingWithPagination(int offset, int pageSize) {
        Page<Reservation> reservations = reservationRepository.findAll(PageRequest.of(offset, pageSize));
        return  reservations;
    }
    @Override
    public Reservation updateBookingStatus(Long reservationId, StatusReservation newStatus) {
        Reservation booking = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + reservationId));

        booking.setStatusReservation(newStatus);
        return reservationRepository.save(booking);

    }

    @Override
    public Reservation getReservationById(Long idReservation) {
        Reservation reservation = reservationRepository.findById(idReservation).orElseThrow(() ->
                new OurException("Reservation with id [" + idReservation + "] not found!"));
        return reservation;
    }

    @Override
    public long getTotalNumberOfReservations() {
        return reservationRepository.count();
    }


}
