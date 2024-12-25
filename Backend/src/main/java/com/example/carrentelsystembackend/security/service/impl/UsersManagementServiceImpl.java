package com.example.carrentelsystembackend.security.service.impl;


import com.example.carrentelsystembackend.enums.RoleName;
import com.example.carrentelsystembackend.security.dto.RequestResponseDTO;
import com.example.carrentelsystembackend.security.service.JwtService;
import com.example.carrentelsystembackend.security.service.UsersManagementService;
import com.example.carrentelsystembackend.security.entity.User;
import com.example.carrentelsystembackend.security.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UsersManagementServiceImpl implements UsersManagementService {
    private   UserRepository userRepository;
    private   PasswordEncoder passwordEncoder;
    private JwtService jwtService;
    private AuthenticationManager authenticationManager;
    private TokenBlacklistService tokenBlacklistService;

    public UsersManagementServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager,TokenBlacklistService tokenBlacklistService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.tokenBlacklistService=tokenBlacklistService;
    }

    @Override
    public RequestResponseDTO register(RequestResponseDTO registrationRequest) {
        RequestResponseDTO resp = new RequestResponseDTO();

        try {
            // Création de l'utilisateur
            User ourUser = new User();
            ourUser.setEmail(registrationRequest.getEmail());
            ourUser.setAdresse(registrationRequest.getAddress());
            ourUser.setRole(RoleName.USER);
            ourUser.setFirstname(registrationRequest.getFirstName());
            ourUser.setLastname(registrationRequest.getLastName());
            ourUser.setPhone(registrationRequest.getPhone());
            ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

            // Sauvegarde de l'utilisateur dans la base de données
            User ourUsersResult = userRepository.save(ourUser);
            if (ourUsersResult.getId() > 0) {
                // Génération du token JWT après l'enregistrement
                String jwt = jwtService.generateToken(ourUsersResult);
                resp.setToken(jwt); // Ajout du token à la réponse

                resp.setOurUser(ourUsersResult);
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")  // Sécurise la méthode pour les admins uniquement
    public RequestResponseDTO registerAdmin(RequestResponseDTO registrationRequest) {
        RequestResponseDTO resp = new RequestResponseDTO();

        try {
            User ourUser = new User();
            ourUser.setEmail(registrationRequest.getEmail());
            ourUser.setAdresse(registrationRequest.getAddress());
            ourUser.setRole(RoleName.ADMIN);
            ourUser.setFirstname(registrationRequest.getFirstName());
            ourUser.setLastname(registrationRequest.getLastName());
            ourUser.setPhone(registrationRequest.getPhone());
            ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));


            User ourUsersResult = userRepository.save(ourUser);
            if (ourUsersResult.getId() > 0) {
                resp.setOurUser((ourUsersResult));
                resp.setMessage("Admin User Created Successfully");
                resp.setStatusCode(200);
            }

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }
    @Override
    public RequestResponseDTO login(RequestResponseDTO loginRequest) {
        RequestResponseDTO response = new RequestResponseDTO();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    @Override
    public RequestResponseDTO logout(String token) {
        RequestResponseDTO response = new RequestResponseDTO();
        try {
            // Enlever le préfixe "Bearer " si présent
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            // Ajouter le token à la liste noire
            tokenBlacklistService.blacklistToken(token);

            response.setStatusCode(200);
            response.setMessage("Logout successful");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error during logout: " + e.getMessage());
        }
        return response;
    }

    @Override
    public RequestResponseDTO refreshToken(RequestResponseDTO refreshTokenRequest) {
        RequestResponseDTO response = new RequestResponseDTO();
        try{
            String ourEmail = jwtService.extractUsername(refreshTokenRequest.getToken());
            User users = userRepository.findByEmail(ourEmail).orElseThrow();
            if (jwtService.isTokenValid(refreshTokenRequest.getToken(), users)) {
                var jwt = jwtService.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    @Override
    public RequestResponseDTO getAllUsers() {
        RequestResponseDTO reqRes = new RequestResponseDTO();

        try {
            List<User> result = userRepository.findAll();
            if (!result.isEmpty()) {
                reqRes.setOurUsersList(result);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
            return reqRes;
        }
    }

    @Override
    public RequestResponseDTO getUsersById(Long id) {
        RequestResponseDTO reqRes = new RequestResponseDTO();
        try {
            User usersById = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setOurUser(usersById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }

    @Override
    public RequestResponseDTO deleteUser(Long userId) {
        RequestResponseDTO reqRes = new RequestResponseDTO();
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                userRepository.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    @Override
    public RequestResponseDTO updateUser(Long userId, User updatedUser) {
        RequestResponseDTO reqRes = new RequestResponseDTO();
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();

                // Mise à jour uniquement des champs non-null
                if (updatedUser.getEmail() != null) {
                    existingUser.setEmail(updatedUser.getEmail());
                }
                if (updatedUser.getFirstname() != null) {
                    existingUser.setFirstname(updatedUser.getFirstname());
                }
                if (updatedUser.getLastname() != null) {
                    existingUser.setLastname(updatedUser.getLastname());
                }
                if (updatedUser.getAdresse() != null) {
                    existingUser.setAdresse(updatedUser.getAdresse());
                }
                if (updatedUser.getPhone() != null) {
                    existingUser.setPhone(updatedUser.getPhone());
                }
                // Ne mettez à jour le rôle que s'il est explicitement fourni
                if (updatedUser.getRole() != null) {
                    existingUser.setRole(updatedUser.getRole());
                }

                // Vérification et mise à jour du mot de passe si fourni
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                User savedUser = userRepository.save(existingUser);
                reqRes.setOurUser(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }
    @Override
    public RequestResponseDTO getMyInfo(String email) {
        RequestResponseDTO reqRes = new RequestResponseDTO();
        try {
            Optional<User> userOptional = userRepository.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setOurUser(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        }catch (Exception e){
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;

    }

}
