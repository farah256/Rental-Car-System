package com.example.carrentelsystembackend;

import com.example.carrentelsystembackend.Service.AccountService;
import com.example.carrentelsystembackend.repository.RoleRepository;
import com.example.carrentelsystembackend.repository.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CarRentelSystemBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(CarRentelSystemBackendApplication.class, args);

    }
//
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
//           roles.add(user);
//           roles.add(admin);
//
//           accountService.addRoleToUser(user1,roles);
//
//
//
//        };
//    }


}

