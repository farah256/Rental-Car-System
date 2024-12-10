package com.example.carrentelsystembackend.Mapper;

import com.example.carrentelsystembackend.dto.VehiculeDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehiculeMapper {

    // Converts Vehicule entity to VehiculeDTO
    public static VehiculeDTO mapVehiculeToVehiculeDTO(Vehicule vehicule) {
        return new VehiculeDTO(
                vehicule.getMatricule(),
                vehicule.getBrand(),
                vehicule.getModel(),
                vehicule.getYear(),
                vehicule.getType(),
                vehicule.getPrice(),
                vehicule.getStatu(),
                vehicule.getImage()
        );
    }

    // Converts a list of Vehicule entities to a list of VehiculeDTOs
    public static List<VehiculeDTO> mapVehiculeListToVehiculeDTOList(List<Vehicule> vehicules) {
        return vehicules.stream()
                .map(VehiculeMapper::mapVehiculeToVehiculeDTO)
                .collect(Collectors.toList());
    }

    // Converts VehiculeDTO to Vehicule entity
    public static Vehicule mapVehiculeDTOToVehicule(VehiculeDTO vehiculeDTO) {
        return new Vehicule(
                vehiculeDTO.getMatricule(),
                vehiculeDTO.getBrand(),
                vehiculeDTO.getModel(),
                vehiculeDTO.getYear(),
                vehiculeDTO.getType(),
                vehiculeDTO.getPrice(),
                vehiculeDTO.getStatu(),
                vehiculeDTO.getImage()
        );
    }
}
