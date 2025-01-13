import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    PENDING: {
        width: "20%",        // Réduire la largeur
        height: "20px",      // Réduire la hauteur
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9C27B0", // Purple
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "0.75rem", // Réduire la taille de la police
    },
    IN_PROGRESS: {
        width: "20%",        // Réduire la largeur
        height: "20px",      // Réduire la hauteur
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3F51B5", // Blue
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "0.75rem", // Réduire la taille de la police
    },
    CONFIRMED: {
        width: "20%",        // Réduire la largeur
        height: "20px",      // Réduire la hauteur
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF9800", // Orange
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "0.75rem", // Réduire la taille de la police
    },
    CANCELLED: {
        width: "20%",        // Réduire la largeur
        height: "20px",      // Réduire la hauteur
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F44336", // Red
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "0.75rem", // Réduire la taille de la police
    },
    ACTIVE: {
        width: "20%",        // Réduire la largeur
        height: "20px",      // Réduire la hauteur
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9C27B0", // Purple
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "0.75rem", // Réduire la taille de la police
    },
    COMPLETED: {
        width: "20%",        // Réduire la largeur
        height: "20px",      // Réduire la hauteur
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50", // Green
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "0.75rem", // Réduire la taille de la police
    },
}));

export default useStyles;
