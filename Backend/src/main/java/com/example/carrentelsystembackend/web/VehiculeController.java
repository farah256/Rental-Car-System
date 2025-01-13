package com.example.carrentelsystembackend.web;

import com.example.carrentelsystembackend.Service.VehiculeService;
import com.example.carrentelsystembackend.entity.Vehicule;
import com.example.carrentelsystembackend.enums.VehiculeStatut;
import com.example.carrentelsystembackend.enums.VehiculeType;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequestMapping("/api/account/vehicules")
public class VehiculeController {
    private final VehiculeService vehiculeService;

    public VehiculeController(VehiculeService vehiculeService) {
        this.vehiculeService = vehiculeService;
    }

    @GetMapping
    public List<Vehicule> getVehicule(){
        return vehiculeService.getVehicule();
    }
    @GetMapping("/{matricule}")
    public Vehicule getVehiculeById(@PathVariable String matricule){
        return vehiculeService.getVehiculeById(matricule);
    }
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")

    public void addVehicule(
            @RequestParam String matricule,
            @RequestParam String brand,
            @RequestParam String model,
            @RequestParam int year,
            @RequestParam VehiculeType type,
            @RequestParam float price,
            @RequestParam VehiculeStatut statu,
            @RequestParam MultipartFile file) throws IOException {
        vehiculeService.addVehicule(matricule, brand, model, year, type, price, statu, file);

    }


    @PutMapping("{matricule}")
    public void updateVehicule(@PathVariable String matricule,
                               @RequestParam String brand,
                               @RequestParam String model,
                               @RequestParam int year,
                               @RequestParam VehiculeType type,
                               @RequestParam float price,
                               @RequestParam VehiculeStatut statu,
                               @RequestParam MultipartFile file){
        vehiculeService.updateVehicule(matricule,brand, model, year, type, price, statu,file);
    }
    @DeleteMapping("{matricule}")
    public void deleteVehicule(@PathVariable String matricule){
        vehiculeService.deleteVehicule(matricule);
    }
    @GetMapping("/search")
    public List<Vehicule> searchProducts(@RequestParam String keyword) {

        List<Vehicule> vehicules =vehiculeService.searchVehicules(keyword);
        return vehicules;

    }
    @GetMapping("/paginated")
    public Page<Vehicule> getVehiculesWithPagination(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "10") int pageSize) {
        Page<Vehicule> vehicules = vehiculeService.findVehiculesWithPagination(offset, pageSize);
        return vehicules;
    }
    @GetMapping("/sorted")
    public List<Vehicule> getSortedVehicules(
            @RequestParam String sortBy,
            @RequestParam String direction) {
        return vehiculeService.getSortedVehicules(sortBy, direction);
    }
    @GetMapping("/by-type/{type}")
    public List<Vehicule> getVehiculesByType(@PathVariable VehiculeType type) {
        return vehiculeService.getVehiculesByType(type);
    }
    @GetMapping("/by-status/{statu}")
    public List<Vehicule> getVehiculesByStatus(@PathVariable VehiculeStatut status) {
        return vehiculeService.getVehiculesByStatus(status);
    }
    @GetMapping("/total/vehicles")
    public long getTotalNumberOfVehicles() {
        return vehiculeService.getTotalNumberOfVehicles();
    }




}
