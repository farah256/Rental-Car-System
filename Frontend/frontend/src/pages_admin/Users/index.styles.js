
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    ADMIN: {
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

    USER: {
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
