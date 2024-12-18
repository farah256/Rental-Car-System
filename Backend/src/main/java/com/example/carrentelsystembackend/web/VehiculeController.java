package com.example.carrentelsystembackend.web;

import com.example.carrentelsystembackend.Service.VehiculeService;
import com.example.carrentelsystembackend.dto.VehiculeDTO;
import com.example.carrentelsystembackend.entity.Vehicule;
//import com.example.carrentelsystembackend.util.FileUploadUtil;
import com.example.carrentelsystembackend.enums.VehiculeStatut;
import com.example.carrentelsystembackend.enums.VehiculeType;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addVehicule(
            @RequestPart("vehiculeDTO") VehiculeDTO vehiculeDTO,
            @RequestParam("image") MultipartFile file) throws IOException {
        vehiculeService.addVehicule(vehiculeDTO, file);
    }


    @PutMapping("/api/admin/vehicule/{matricule}")
    public void updateVehicule(@PathVariable String matricule,
                               @RequestBody VehiculeDTO vehicule,
                               @RequestParam("image") MultipartFile file){
        vehiculeService.updateVehicule(matricule,vehicule,file);
    }
    @DeleteMapping("/api/admin/vehicule/{matricule}")
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
    @GetMapping("/total")
    public long getTotalNumberOfVehicles() {
        return vehiculeService.getTotalNumberOfVehicles();
    }




}
