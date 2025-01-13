import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    PENDING: {
        width: "70%",
        padding: "5px",
        margin: "10px 20px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9C27B0", // Purple
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    IN_PROGRESS: {
        width: "70%",
        padding: "5px",
        margin: "10px 20px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3F51B5", // Red
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    CONFIRMED: {
        width: "70%",
        padding: "5px",
        margin: "10px 20px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF9800", // Orange
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    CANCELLED: {
        width: "70%",
        padding: "5px",
        margin: "10px 20px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F44336 ", // Red
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    ACTIVE: {
        width: "70%",
        padding: "5px",
        margin: "10px 20px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9C27B0", // Purple
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    COMPLETED: {
            width: "70%",
            padding: "5px",
            margin: "10px 20px",
            height: "25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4CAF50", // Green
            borderRadius: "20px",
            color: "#FFFFFF",
            fontWeight: "bold",
            textAlign: "center",
        },
}));

export default useStyles;