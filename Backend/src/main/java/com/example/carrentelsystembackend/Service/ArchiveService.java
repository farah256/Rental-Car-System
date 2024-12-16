package com.example.carrentelsystembackend.Service;


import com.example.carrentelsystembackend.dto.ReservationDTO;
import org.springframework.stereotype.Service;

@Service
public interface ArchiveService {
    public ReservationDTO archiverReservation(Long idReservation);
}
