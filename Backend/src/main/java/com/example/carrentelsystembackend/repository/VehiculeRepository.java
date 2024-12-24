package com.example.carrentelsystembackend.repository;

import com.example.carrentelsystembackend.dto.VehiculeDTO;
import com.example.carrentelsystembackend.entity.Vehicule;
import com.example.carrentelsystembackend.enums.VehiculeStatut;
import com.example.carrentelsystembackend.enums.VehiculeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule,String> {
    @Query("SELECT v from Vehicule v WHERE " +
            "LOWER(v.matricule) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(v.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(v.model) LIKE LOWER(CONCAT('%', :keyword, '%')) " )
    List<Vehicule> searchProducts(String keyword);
    @Query("SELECT v FROM Vehicule v ORDER BY " +
            "CASE WHEN :sortBy = 'year' AND :direction = 'asc' THEN v.year END ASC, " +
            "CASE WHEN :sortBy = 'year' AND :direction = 'desc' THEN v.year END DESC, " +
            "CASE WHEN :sortBy = 'price' AND :direction = 'asc' THEN v.price END ASC, " +
            "CASE WHEN :sortBy = 'price' AND :direction = 'desc' THEN v.price END DESC")
    List<Vehicule> findVehiculesWithSorting(@Param("sortBy") String sortBy, @Param("direction") String direction);
    List<Vehicule> findByStatu(VehiculeStatut statu);
    List<Vehicule> findByType(VehiculeType type);
}