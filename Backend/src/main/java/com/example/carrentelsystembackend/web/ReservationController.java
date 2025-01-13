package com.example.carrentelsystembackend.web;

import com.example.carrentelsystembackend.Service.ReservationService;
import com.example.carrentelsystembackend.dto.ReservationDTO;
import com.example.carrentelsystembackend.enums.StatusReservation;
import jakarta.mail.MessagingException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/account/reservations")
public class ReservationController {

    private  ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // Créer une nouvelle réservation => deja testee
    @PostMapping
    public ResponseEntity<ReservationDTO> creerReservation(@RequestBody ReservationDTO reservationDTO) {
        ReservationDTO createdReservation = reservationService.creerReservation(reservationDTO);
        return ResponseEntity.ok(createdReservation);
    }

    // Annuler une réservation  ### deja testee
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Void> annulerReservation(@PathVariable Long id) {
        reservationService.annulerReservation(id);
        return ResponseEntity.ok().build();
    }

    // Confirmer une réservation
    @GetMapping("/{idReservation}/confirmer")
    public ResponseEntity<byte[]> confirmerReservation(@PathVariable Long idReservation) {
        try {
            byte[] pdfBytes = reservationService.confirmerReservation(idReservation);

            // Configuration des en-têtes HTTP pour retourner le PDF
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=contrat_" + idReservation + ".pdf");
            headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    // Archiver une réservation     ### deja testee
    @PutMapping("/{id}/archive")
    public ResponseEntity<ReservationDTO> archiverReservation(@PathVariable Long id) {
        ReservationDTO archivedReservation = reservationService.archiverReservation(id);
        return ResponseEntity.ok(archivedReservation);
    }

    // Vérifier la disponibilité d'un véhicule    ### deja testee
    @GetMapping("/availability")
    public ResponseEntity<Boolean> verifierDisponibilite(
            @RequestParam String matricule,
            @RequestParam  @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") Date debut,
            @RequestParam  @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")  Date fin) {
        boolean disponible = reservationService.verifierDisponibilite(matricule, debut, fin);
        return ResponseEntity.ok(disponible);
    }

    // Calculer la charge fixe pour une réservation    ### deja testee
    @GetMapping("/{id}/charge-fixe")
    public ResponseEntity<Float> calculerChargeFixe(@PathVariable Long id) {
        float chargeFixe = reservationService.calculerChargeFixe(id);
        return ResponseEntity.ok(chargeFixe);
    }

    // Liste des réservations par statut     ### deja testee
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ReservationDTO>> listeReservationParStatut(@PathVariable StatusReservation status) {
        List<ReservationDTO> reservations = reservationService.listeReservationParStatut(status);
        return ResponseEntity.ok(reservations);
    }

    // Liste de toutes les réservations     ### deja testee
    @GetMapping
    public ResponseEntity<List<ReservationDTO>> listeReservation() {
        List<ReservationDTO> reservations = reservationService.listeReservation();
        return ResponseEntity.ok(reservations);
    }
    // Récupérer la liste des réservations pour un utilisateur
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationDTO>> listeReservationParUtilisateur(@PathVariable Long userId) {
        List<ReservationDTO> reservations = reservationService.listeReservationParUtilisateur(userId);
        return ResponseEntity.ok(reservations);
    }
}
