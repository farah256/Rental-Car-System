import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    available: {
        width: "70%",
        padding: "5px",
        margin: "10px 20px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50", // Green for available
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    UnderMaintenance: {
        width: "70%",
        padding: "5px",
        margin: "10px 20px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F44336", // Red for under maintenance
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    Booked: {
        width: "70%",
        padding: "5px",
        margin: "10px 20px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF9800", // Orange for booked
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    Taken: {
        width: "70%",
        padding: "5px",
        margin: "10px 20px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3F51B5", // Blue for taken
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    Waiting: {
        width: "70%",
        padding: "5px",
        margin: "10px 20px",
        height: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#9C27B0", // Purple for waiting
        borderRadius: "20px",
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
}));

export default useStyles;