package com.example.carrentelsystembackend.security.service;

import com.example.carrentelsystembackend.security.entity.Role;
import com.example.carrentelsystembackend.security.entity.User;

import java.util.List;

public interface AccountService {
    public Role addNewRole(Role role);
    public void addRoleToUser(User user, List<Role> roleList);
    public void removeRoleFromUser(User user, Role role);


}
