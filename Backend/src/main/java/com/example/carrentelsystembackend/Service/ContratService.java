package com.example.carrentelsystembackend.Service;

import com.example.carrentelsystembackend.entity.Contrat;
import org.springframework.lang.Contract;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
public interface ContratService {

    byte[] generateContratPDF(Contrat contrat) throws IOException;
}
