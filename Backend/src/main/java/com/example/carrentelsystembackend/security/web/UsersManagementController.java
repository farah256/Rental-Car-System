package com.example.carrentelsystembackend.security.web;

import com.example.carrentelsystembackend.security.dto.RequestResponseDTO;
import com.example.carrentelsystembackend.security.entity.User;
import com.example.carrentelsystembackend.security.service.UsersManagementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/account")
public class UsersManagementController {

    private UsersManagementService usersManagementService;

    public UsersManagementController(UsersManagementService usersManagementService) {
        this.usersManagementService = usersManagementService;
    }
    // methods
    @PostMapping("/auth/register")
    public ResponseEntity<RequestResponseDTO> regeister(@RequestBody RequestResponseDTO reg){
        return ResponseEntity.ok(usersManagementService.register(reg));
    }

    @PostMapping("/admin/register-admin")
    @PreAuthorize("hasRole('ADMIN')")  // Sécurise la route
    public ResponseEntity<RequestResponseDTO> registerAdmin(@RequestBody RequestResponseDTO reg){
        return ResponseEntity.ok(usersManagementService.registerAdmin(reg));
    }


    @PostMapping("/auth/login")
    public ResponseEntity<RequestResponseDTO> login(@RequestBody RequestResponseDTO req){
        return ResponseEntity.ok(usersManagementService.login(req));
    }
    @PostMapping("/auth/logout")
    public ResponseEntity<RequestResponseDTO> logout(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(usersManagementService.logout(token));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<RequestResponseDTO> refreshToken(@RequestBody RequestResponseDTO req){
        return ResponseEntity.ok(usersManagementService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<RequestResponseDTO> getAllUsers(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());

    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<RequestResponseDTO> getUSerByID(@PathVariable Long userId){
        return ResponseEntity.ok(usersManagementService.getUsersById(userId));

    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<RequestResponseDTO> updateUser(@PathVariable Long userId, @RequestBody User reqres){
        return ResponseEntity.ok(usersManagementService.updateUser(userId, reqres));
    }

    @GetMapping("/account/get-profile")
    public ResponseEntity<RequestResponseDTO> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        RequestResponseDTO response = usersManagementService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<RequestResponseDTO> deleteUSer(@PathVariable Long userId){
        return ResponseEntity.ok(usersManagementService.deleteUser(userId));
    }






}
