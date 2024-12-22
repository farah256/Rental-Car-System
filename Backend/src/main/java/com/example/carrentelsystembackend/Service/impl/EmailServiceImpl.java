package com.example.carrentelsystembackend.Service.impl;

import com.example.carrentelsystembackend.Service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.io.File;


@Service
public class EmailServiceImpl implements EmailService  {
    private  JavaMailSender javaMailSender;

    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }


    @Override
    public void sendEmailWithAttachment(String toEmail, File attachment) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("salmaimassenda2023@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject("Reservation Confirmation");

            // Créer le corps de l'email avec HTML
            String htmlContent = "<html>" +
                    "<body>" +
                    "<h1>Get your contract now</h1>" +
                    "<p>Your request has been confirmed <span style='color: green;'>✅</span></p>" +
                    "<p>Thank you for choosing <strong>EASERENT</strong>. We look forward to serving you and ensuring a smooth and enjoyable rental experience.</p>" +
                    "</body>" +
                    "</html>";

            // Définir le contenu HTML
            helper.setText(htmlContent, true);

            // Ajouter une pièce jointe si fournie
            if (attachment != null) {
                helper.addAttachment(attachment.getName(), attachment);
            }

            // Envoyer l'email
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Error sending email: " + e.getMessage());
        }
    }

    }

