package com.example.carrentelsystembackend.Service;

import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public interface EmailService {
    public void sendEmailWithAttachment(String toEmail, File attachment) throws MessagingException;
}
