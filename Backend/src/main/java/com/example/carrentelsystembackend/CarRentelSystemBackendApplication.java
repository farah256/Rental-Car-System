package com.example.carrentelsystembackend;
//
//import com.example.carrentelsystembackend.Service.AccountService;
//import com.example.carrentelsystembackend.repository.RoleRepository;
//import com.example.carrentelsystembackend.repository.UserRepository;
import com.example.carrentelsystembackend.enums.RoleName;
import com.example.carrentelsystembackend.security.entity.Role;
import com.example.carrentelsystembackend.security.entity.User;
import com.example.carrentelsystembackend.security.repository.RoleRepository;
import com.example.carrentelsystembackend.security.repository.UserRepository;
import com.example.carrentelsystembackend.security.service.AccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
public class CarRentelSystemBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(CarRentelSystemBackendApplication.class, args);

    }

//    @Bean
//    CommandLineRunner start(UserRepository userRepository, AccountService accountService, RoleRepository roleRepository)
//    {
//        return args -> {
//           Role admin = new Role(RoleName.ADMIN);
//           Role user = new Role(RoleName.USER);
//
//           accountService.addNewRole(admin);
//           accountService.addNewRole(user);
//
//           User user1= userRepository.findByEmail("salma@gmail.com").orElse(null);
//
//           List<Role> roles=new ArrayList<>();
//           Optional<Role> admin=roleRepository.findByRoleName(RoleName.ADMIN);
//           Optional<Role> user=roleRepository.findByRoleName(RoleName.USER);
//
//            // Ajout des rôles à la liste s'ils sont présents
//            admin.ifPresent(roles::add);  // Ajoute admin si présent
//            user.ifPresent(roles::add);   // Ajoute user si présent
//
//
//            accountService.addRoleToUser(user1,roles);


//
//        };
//    }


}

