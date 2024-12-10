package com.example.carrentelsystembackend.security.service.impl;

import com.example.carrentelsystembackend.security.service.AccountService;
import com.example.carrentelsystembackend.security.entity.Role;
import com.example.carrentelsystembackend.security.entity.User;
import com.example.carrentelsystembackend.security.repository.RoleRepository;
import com.example.carrentelsystembackend.security.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class AccountServiceImpl implements AccountService, UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;


    public AccountServiceImpl(UserRepository userRepository,RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository=roleRepository;

    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return (UserDetails) userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("Cet Utilisateur n'exisste pas!!"));
    }

    @Override
    public Role addNewRole(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void addRoleToUser(User user, List<Role> roleList) {
        User userDB = userRepository.findByEmail(user.getEmail()).orElse(null);

        if (userDB != null) {
            roleList.stream()
                    .map(Role::getRoleName)  // Récupère le nom du rôle
                    .map(roleRepository::findByRoleName)  // Trouve le rôle dans la base de données
                    .filter(Optional::isPresent)  // Filtre les rôles présents
                    .map(Optional::get)  // Récupère le rôle de l'Optional
                    .forEach(userDB.getRoleList()::add);  // Ajoute le rôle à la liste des rôles de l'utilisateur
        }
    }

    @Override
    public void removeRoleFromUser(User user, Role role) {
        User userDB = userRepository.findByEmail(user.getEmail()).orElse(null);

        if (userDB != null) {
            // Vérifie si l'utilisateur a le rôle
            if (userDB.getRoleList().contains(role)) {
                userDB.getRoleList().remove(role);  // Retire le rôle de la liste des rôles de l'utilisateur
            }
        }
    }



}