package com.example.carrentelsystembackend.Service.impl;

import com.example.carrentelsystembackend.Mapper.VehiculeMapper;
import com.example.carrentelsystembackend.Service.VehiculeService;
import com.example.carrentelsystembackend.dto.VehiculeDTO;
import com.example.carrentelsystembackend.entity.Vehicule;
import com.example.carrentelsystembackend.enums.VehiculeStatut;
import com.example.carrentelsystembackend.enums.VehiculeType;
import com.example.carrentelsystembackend.exception.OurException;
import com.example.carrentelsystembackend.repository.VehiculeRepository;
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
    public List<VehiculeDTO> getVehicule(){
        List<Vehicule> vehicules = vehiculeRepository.findAll();
        List<VehiculeDTO> vehiculeDTOS = vehiculeMapper.mapVehiculeListToVehiculeDTOList(vehicules);
        return vehiculeDTOS;
    }

    @Override
    public VehiculeDTO getVehiculeById(String matricule) {

        Vehicule vehicule = vehiculeRepository.findById(matricule).orElseThrow(() ->
                        new OurException("Vehicule with matricule [" + matricule + "] not found!"));
        VehiculeDTO vehiculeDTO = vehiculeMapper.mapVehiculeToVehiculeDTO(vehicule);
        return vehiculeDTO;
    }


    @Override
    public void addVehicule(VehiculeDTO vehiculeDTO, MultipartFile imageFile) throws IOException {
        Vehicule vehicule = vehiculeMapper.mapVehiculeDTOToVehicule(vehiculeDTO);
//        String fileName = StringUtils.cleanPath(imageFile.getOriginalFilename());
//        if(fileName.contains("..")){
//            System.out.println("Not Valid!");
//        }
        vehicule.setImage(imageFile.getBytes());
        vehiculeMapper.mapVehiculeToVehiculeDTO(vehiculeRepository.save(vehicule));


    }

    @Override
    public void updateVehicule(String matricule, VehiculeDTO vehiculeDTO, MultipartFile imageFile) {
        try {
            // Fetch the vehicle from the database
            Vehicule vehicule = vehiculeRepository.findById(matricule)
                    .orElseThrow(() -> new OurException("Vehicule with matricule [" + matricule + "] not found!"));

            // Update vehicle properties
            vehicule.setType(vehiculeDTO.getType());
            vehicule.setPrice(vehiculeDTO.getPrice());


                // Convert image to Base64 string and set it
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
        Page<Vehicule> products = vehiculeRepository.findAll(PageRequest.of(offset, pageSize));
        return  products;
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