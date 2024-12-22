package com.example.carrentelsystembackend;

import com.example.carrentelsystembackend.security.entity.Role;
import com.example.carrentelsystembackend.security.service.AccountService;
import com.example.carrentelsystembackend.enums.RoleName;
import com.example.carrentelsystembackend.security.repository.RoleRepository;
import com.example.carrentelsystembackend.security.repository.UserRepository;
import com.example.carrentelsystembackend.security.entity.User;
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

    @Bean
    CommandLineRunner start(UserRepository userRepository, AccountService accountService, RoleRepository roleRepository)
    {
        return args -> {
//            User user2 = new User("farah","salmi","farah@gmail.com","1234");
//            userRepository.save(user2);
//
//           Role admin = new Role(RoleName.ADMIN);
//           Role user = new Role(RoleName.USER);
//
//           accountService.addNewRole(admin);
//           accountService.addNewRole(user);
//            User user1= userRepository.findByEmail("farah@gmail.com").orElse(null);
//
//            List<Role> roles=new ArrayList<>();
//
//           Optional<Role> roleAdmin = roleRepository.findByRoleName(RoleName.ADMIN);
//           Optional<Role> roleUser = roleRepository.findByRoleName(RoleName.USER);
//
//
//           roleAdmin.ifPresent(roles::add);
//           roleUser.ifPresent(roles::add);
//
//           accountService.addRoleToUser(user1,roles);

        };
    }


}

