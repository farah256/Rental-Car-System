package com.example.carrentelsystembackend.web;

import com.example.carrentelsystembackend.Service.VehiculeService;
import com.example.carrentelsystembackend.dto.VehiculeDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/account/vehicules")
public class VehiculeController {
    private final VehiculeService vehiculeService;

    public VehiculeController(VehiculeService vehiculeService) {
        this.vehiculeService = vehiculeService;
    }

    @GetMapping
    public List<VehiculeDTO> getVehicule(){
        return vehiculeService.getVehicule();
    }
    @GetMapping("/{matricule}")
    public VehiculeDTO getVehiculeById(@PathVariable String matricule){
        return vehiculeService.getVehiculeById(matricule);
    }
    @PostMapping
    public void addVehicule(@RequestBody VehiculeDTO vehiculeDTO){
         vehiculeService.addVehicule(vehiculeDTO);
    }
    @PutMapping("/{matricule}")
    public void updateVehicule(@PathVariable String matricule,
                               @RequestBody VehiculeDTO vehicule){
        vehiculeService.updateVehicule(matricule,vehicule);
    }
    @DeleteMapping("/{matricule}")
    public void deleteVehicule(@PathVariable String matricule){
        vehiculeService.deleteVehicule(matricule);
    }




}
