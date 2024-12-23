package com.example.carrentelsystembackend.security.service;

import com.example.carrentelsystembackend.security.dto.RequestResponseDTO;
import org.springframework.stereotype.Service;
import com.example.carrentelsystembackend.security.entity.User;

@Service
public interface UsersManagementService {
    public RequestResponseDTO register(RequestResponseDTO registrationRequest);
    public RequestResponseDTO registerAdmin(RequestResponseDTO registrationRequest);
    public RequestResponseDTO login(RequestResponseDTO loginRequest);
    public RequestResponseDTO logout(String token);
    public RequestResponseDTO refreshToken(RequestResponseDTO refreshTokenRequest);
    public RequestResponseDTO getAllUsers();
    public RequestResponseDTO getUsersById(Long id);
    public RequestResponseDTO deleteUser(Long userId);
    public RequestResponseDTO updateUser(Long userId, User updatedUser);
    public RequestResponseDTO getMyInfo(String email);

}
