package com.example.carrentelsystembackend.Service.impl;

import com.example.carrentelsystembackend.Mapper.VehiculeMapper;
import com.example.carrentelsystembackend.Service.VehiculeService;
import com.example.carrentelsystembackend.dto.VehiculeDTO;
import com.example.carrentelsystembackend.entity.Vehicule;
import com.example.carrentelsystembackend.enums.VehiculeStatut;
import com.example.carrentelsystembackend.enums.VehiculeType;
import com.example.carrentelsystembackend.exception.OurException;
import com.example.carrentelsystembackend.repository.VehiculeRepository;
import org.eclipse.angus.mail.iap.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;



@Service
public class VehiculeServiceImpl implements VehiculeService {
    private final VehiculeRepository vehiculeRepository;

    private final VehiculeMapper vehiculeMapper;

    public VehiculeServiceImpl(VehiculeRepository vehiculeRepository, VehiculeMapper vehiculeMapper) {
        this.vehiculeRepository = vehiculeRepository;
        this.vehiculeMapper = vehiculeMapper;
    }

    @Override
    public List<Vehicule> getVehicule(){
        List<Vehicule> vehicules = vehiculeRepository.findAll();
        return vehicules;
    }

    @Override
    public Vehicule getVehiculeById(String matricule) {

        Vehicule vehicule = vehiculeRepository.findById(matricule).orElseThrow(() ->
                        new OurException("Vehicule with matricule [" + matricule + "] not found!"));
        return vehicule;
    }


    @Override
    public void addVehicule(String matricule, String brand, String model, int year,
                                VehiculeType type, float price, VehiculeStatut statu, MultipartFile imageFile)throws IOException {
        Vehicule vehicule =new Vehicule();
        vehicule.setMatricule(matricule);
        vehicule.setBrand(brand);
        vehicule.setModel(model);
        vehicule.setYear(year);
        vehicule.setType(type);
        vehicule.setPrice(price);
        vehicule.setStatu(statu);
        vehicule.setImage(imageFile.getBytes());
        vehiculeRepository.save(vehicule);

        }

    @Override
    public void updateVehicule(String matricule, String brand, String model, int year,
                               VehiculeType type, float price, VehiculeStatut statu, MultipartFile imageFile) {
        try {
            // Fetch the vehicle from the database
            Vehicule vehicule = vehiculeRepository.findById(matricule)
                    .orElseThrow(() -> new OurException("Vehicule with matricule [" + matricule + "] not found!"));

            // Update vehicle properties
            vehicule.setPrice(price);
            vehicule.setStatu(statu);
            vehicule.setImage(imageFile.getBytes());

            // Save the updated vehicle back to the database
            vehiculeRepository.save(vehicule);
        } catch (IOException e) {
            throw new RuntimeException("Error updating vehicle image: " + e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Unable to update vehicle: " + e.getMessage());
        }
    }

    @Override
    public void updateStatutVehicule(String matricule, VehiculeStatut statut) {
        Vehicule vehicule = vehiculeRepository.findById(matricule)
                .orElseThrow(() -> new OurException("Vehicule with matricule [" + matricule + "] not found!"));
        vehicule.setStatu(statut);
        vehiculeRepository.save(vehicule);

    }


    @Override
    public void deleteVehicule(String matricule) {
        Vehicule vehicule = vehiculeRepository.findById(matricule).orElseThrow(() ->
                new OurException("Vehicule with matricule [" + matricule + "] not found!")
        );
        vehiculeRepository.deleteById(matricule);
    }
    @Override
    public List<Vehicule> searchVehicules(String keyword) {
        return vehiculeRepository.searchProducts(keyword);
    }
    @Override
    public Page<Vehicule> findVehiculesWithPagination(int offset, int pageSize){
        Page<Vehicule> vehicules = vehiculeRepository.findAll(PageRequest.of(offset, pageSize));
        return  vehicules;
    }
    @Override
    public List<Vehicule> getSortedVehicules(String sortBy,String direction) {
        return vehiculeRepository.findVehiculesWithSorting(sortBy,direction);
    }
    @Override
    public List<Vehicule> getVehiculesByType(VehiculeType type) {
        return vehiculeRepository.findByType(type);
    }
    @Override
    public List<Vehicule> getVehiculesByStatus(VehiculeStatut statut){
        return vehiculeRepository.findByStatu(statut);
    }
    @Override
    public long getTotalNumberOfVehicles() {
        return vehiculeRepository.count();
    }


}