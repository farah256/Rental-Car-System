package com.example.carrentelsystembackend.Service;

import com.example.carrentelsystembackend.dto.VehiculeDTO;

import java.util.List;

public interface VehiculeService {
    public List<VehiculeDTO> getVehicule();
    public VehiculeDTO getVehiculeById(String matricule);
    public void addVehicule(VehiculeDTO vehicule);
    public void updateVehicule(String matricule, VehiculeDTO vehicule);
    public void deleteVehicule(String matricule);

}