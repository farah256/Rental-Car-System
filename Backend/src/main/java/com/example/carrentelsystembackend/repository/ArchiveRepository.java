package com.example.carrentelsystembackend.repository;

import com.example.carrentelsystembackend.entity.Archive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchiveRepository extends JpaRepository<Archive,Long> {
}
