package com.example.carrentelsystembackend.Service;

import com.example.carrentelsystembackend.dto.VehiculeDTO;
import com.example.carrentelsystembackend.entity.Vehicule;
import com.example.carrentelsystembackend.enums.VehiculeStatut;
import com.example.carrentelsystembackend.enums.VehiculeType;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VehiculeService {
    public List<VehiculeDTO> getVehicule();
    public VehiculeDTO getVehiculeById(String matricule);
    public void addVehicule(VehiculeDTO vehiculeDTO, MultipartFile imageFile)throws IOException;
    public void updateVehicule(String matricule, VehiculeDTO vehiculeDTO, MultipartFile imageFile);
    public void deleteVehicule(String matricule);
    public List<Vehicule> searchVehicules(String keyword) ;
    public Page<Vehicule> findVehiculesWithPagination(int offset, int pageSize);
    public List<Vehicule> getSortedVehicules(String sortBy,String direction);
    public List<Vehicule> getVehiculesByType(VehiculeType type);
    public List<Vehicule> getVehiculesByStatus(VehiculeStatut statut);
    public long getTotalNumberOfVehicles();

}