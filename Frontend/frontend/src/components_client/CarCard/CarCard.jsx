import React, { useState } from "react";
import { Button, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
// Styled components
const StyledCard = styled(Card)({
    width: "19rem",
    backgroundColor: "white",
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)"
    }
});

const ImageContainer = styled("div")({
    position: "relative",
    height: "10rem",
    overflow: "hidden"
});

const CarImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    "&:hover": {
        transform: "scale(1.1)"
    }
});

const StyledCardContent = styled(CardContent)({
    padding: "1rem"
});

const CarTitle = styled("h3")({
    fontWeight: 600,
    fontSize: "1.125rem",
    color: "#1f2937",
    marginBottom: "0.75rem"
});

const PriceContainer = styled("div")({
    display: "flex",
    alignItems: "baseline",
    marginBottom: "1rem"
});

const Price = styled("span")({
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#111827"
});

const PricePeriod = styled("span")({
    fontSize: "0.875rem",
    color: "#6b7280",
    marginLeft: "0.25rem"
});

const RentButton = styled(Button)({
    width: "100%",
    backgroundColor: "#000000",
    color: "white",
    fontWeight: 600,
    padding: "0.5rem",
    borderRadius: "0.375rem",
    transition: "background-color 0.2s ease",
    "&:hover": {
        backgroundColor: "#1f2937"
    }
});

function CarCard({ car }) {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState(car);

    function handleRentClick() {
        navigate(`/rent/${vehicle.matricule}`, { state: { vehicle: vehicle } });
    }

    return (
        <StyledCard>
            <ImageContainer>
                <CarImage
                    src={vehicle.image}
                    alt={vehicle.name}
                />
            </ImageContainer>

            <StyledCardContent>
                <CarTitle>
                    {vehicle.brand} /{vehicle.type}
                </CarTitle>

                <PriceContainer>
                    <Price>
                        ${vehicle.price.toFixed(2)}
                    </Price>
                    <PricePeriod>/day</PricePeriod>
                </PriceContainer>

                <RentButton
                    variant="contained"
                    onClick={handleRentClick}
                >
                    Rent Now
                </RentButton>
            </StyledCardContent>
        </StyledCard>
    );
}

export default CarCard;