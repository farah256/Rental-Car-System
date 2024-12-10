package com.example.carrentelsystembackend.Service.impl;

import com.example.carrentelsystembackend.Mapper.VehiculeMapper;
import com.example.carrentelsystembackend.Service.VehiculeService;
import com.example.carrentelsystembackend.dto.VehiculeDTO;
import com.example.carrentelsystembackend.entity.Vehicule;
import com.example.carrentelsystembackend.exception.OurException;
import com.example.carrentelsystembackend.repository.VehiculeRepository;
import org.springframework.stereotype.Service;

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

        Vehicule vehicule = vehiculeRepository.findById(matricule).orElseThrow(() -> new OurException(
                "Vehicule with matricule [%s] not found!"
        ));
        VehiculeDTO vehiculeDTO = vehiculeMapper.mapVehiculeToVehiculeDTO(vehicule);
        return vehiculeDTO;
    }

    @Override
    public void addVehicule(VehiculeDTO vehiculeDTO) {
        Vehicule vehicule = vehiculeMapper.mapVehiculeDTOToVehicule(vehiculeDTO);
        vehiculeMapper.mapVehiculeToVehiculeDTO(vehiculeRepository.save(vehicule));
    }

    @Override
    public void updateVehicule(String matricule, VehiculeDTO vehiculeDTO) {
        Vehicule vehicule = vehiculeRepository.findById(matricule).orElseThrow(() -> new OurException(
                "Vehicule with matricule [%s] not found!"
        ));
        vehicule.setType(vehiculeDTO.getType());
        vehicule.setStatu(vehiculeDTO.getStatu());
        vehicule.setPrice(vehiculeDTO.getPrice());
        vehicule.setImage(vehiculeDTO.getImage());
        vehiculeRepository.save(vehicule);
    }

    @Override
    public void deleteVehicule(String matricule) {
        Vehicule vehicule = vehiculeRepository.findById(matricule).orElseThrow(() -> new OurException(
                "Vehicule with matricule [%s] not found!"
        ));
        vehiculeRepository.deleteById(matricule);
    }



}