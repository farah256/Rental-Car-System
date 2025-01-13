package com.example.carrentelsystembackend;

import com.example.carrentelsystembackend.Mapper.ReservationMapper;
import com.example.carrentelsystembackend.Service.*;
import com.example.carrentelsystembackend.Service.impl.*;
import com.example.carrentelsystembackend.dto.ReservationDTO;
import com.example.carrentelsystembackend.entity.Reservation;
import com.example.carrentelsystembackend.enums.StatusReservation;
import com.example.carrentelsystembackend.repository.ReservationRepository;
import jakarta.mail.MessagingException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.domain.Page;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class CarRentelSystemBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(CarRentelSystemBackendApplication.class, args);


    }
}

