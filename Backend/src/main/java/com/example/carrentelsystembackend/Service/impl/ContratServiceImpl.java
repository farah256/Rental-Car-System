package com.example.carrentelsystembackend.Service.impl;

import com.example.carrentelsystembackend.Service.ContratService;
import com.example.carrentelsystembackend.entity.Contrat;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.property.TextAlignment;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class ContratServiceImpl implements ContratService {

    @Override
    public byte[] generateContratPDF(Contrat contrat) throws IOException {
        // Création du flux de sortie pour le PDF
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);

        // Configuration des marges
        document.setMargins(20, 20, 20, 20);

        // Configuration des polices
        PdfFont titleFont = PdfFontFactory.createFont(com.itextpdf.io.font.constants.StandardFonts.HELVETICA_BOLD);
        PdfFont textFont = PdfFontFactory.createFont(com.itextpdf.io.font.constants.StandardFonts.HELVETICA);

        // Titre du contrat
        Paragraph title = new Paragraph("Contrat de Location")
                .setFont(titleFont)
                .setFontSize(20)
                .setTextAlignment(TextAlignment.CENTER)
                .setBold()
                .setMarginBottom(20);
        document.add(title);

        // Ajout d'une ligne de séparation
        document.add(new Paragraph("\n"));

        // Section : Informations générales sur le contrat
        Paragraph contratDetails = new Paragraph("Informations Générales")
                .setFont(titleFont)
                .setFontSize(14)
                .setBold()
                .setUnderline()
                .setMarginBottom(10);
        document.add(contratDetails);

        document.add(new Paragraph("ID Contrat: " + contrat.getIdContrat())
                .setFont(textFont)
                .setFontSize(12)
                .setMarginBottom(5));

        // Section : Informations du client
        Paragraph clientDetails = new Paragraph("Informations Client")
                .setFont(titleFont)
                .setFontSize(14)
                .setBold()
                .setUnderline()
                .setMarginBottom(10);
        document.add(clientDetails);

        document.add(new Paragraph("Nom: " + contrat.getReservation().getUser().getFirstname() + " " + contrat.getReservation().getUser().getLastname())
                .setFont(textFont)
                .setFontSize(12)
                .setMarginBottom(5));
        document.add(new Paragraph("Email: " + contrat.getReservation().getUser().getEmail())
                .setFont(textFont)
                .setFontSize(12)
                .setMarginBottom(5));

        // Section : Informations du véhicule
        Paragraph vehicleDetails = new Paragraph("Informations Véhicule")
                .setFont(titleFont)
                .setFontSize(14)
                .setBold()
                .setUnderline()
                .setMarginBottom(10);
        document.add(vehicleDetails);

        document.add(new Paragraph("Numéro d'immatriculation: " + contrat.getReservation().getVehicule().getMatricule())
                .setFont(textFont)
                .setFontSize(12)
                .setMarginBottom(5));
        document.add(new Paragraph("Marque et Modèle: " + contrat.getReservation().getVehicule().getBrand() + " - " + contrat.getReservation().getVehicule().getModel())
                .setFont(textFont)
                .setFontSize(12)
                .setMarginBottom(5));
        document.add(new Paragraph("Année: " + contrat.getReservation().getVehicule().getYear())
                .setFont(textFont)
                .setFontSize(12)
                .setMarginBottom(5));
        document.add(new Paragraph("Type: " + contrat.getReservation().getVehicule().getType())
                .setFont(textFont)
                .setFontSize(12)
                .setMarginBottom(10));

        // Section : Charges fixes
        Paragraph costDetails = new Paragraph("Charges")
                .setFont(titleFont)
                .setFontSize(14)
                .setBold()
                .setUnderline()
                .setMarginBottom(10);
        document.add(costDetails);

        document.add(new Paragraph("Charge Fixe: " + contrat.getTotalCost() + " MAD")
                .setFont(textFont)
                .setFontSize(12)
                .setMarginBottom(20));

        // Section : Signature
        Paragraph signatureSection = new Paragraph("Signatures")
                .setFont(titleFont)
                .setFontSize(14)
                .setBold()
                .setUnderline()
                .setMarginBottom(10);
        document.add(signatureSection);

        document.add(new Paragraph("\n\nSignature Client: ____________________________")
                .setFont(textFont)
                .setFontSize(12));
        document.add(new Paragraph("Signature Agence: ____________________________")
                .setFont(textFont)
                .setFontSize(12));

        // Ajout d'un pied de page
        document.add(new Paragraph("\n\n\nMerci pour votre confiance !")
                .setTextAlignment(TextAlignment.CENTER)
                .setFont(textFont)
                .setFontSize(10)
                .setItalic()
                .setMarginTop(20));

        // Fermeture du document
        document.close();

        return baos.toByteArray();
    }
}
