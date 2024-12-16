package com.example.carrentelsystembackend.repository;

import com.example.carrentelsystembackend.dto.VehiculeDTO;
import com.example.carrentelsystembackend.entity.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule,String> {
    Vehicule findByMatricule(String matricule);
}