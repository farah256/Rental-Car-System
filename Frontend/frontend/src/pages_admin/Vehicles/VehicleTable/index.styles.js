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
        backgroundColor: theme.palette.success.main, // Available status color
        borderRadius: "20px",
        color: theme.palette.grey[100],
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
        backgroundColor: theme.palette.error.main, // Under Maintenance status color
        borderRadius: "20px",
        color: theme.palette.grey[100],
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
        backgroundColor: theme.palette.grey, // booked status color
        borderRadius: "20px",
        color: theme.palette.grey[100],
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
        backgroundColor: theme.palette.success, // Taken status color
        borderRadius: "20px",
        color: theme.palette.grey[100],
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
        backgroundColor: theme.palette.primary.main, // waiting status color
        borderRadius: "20px",
        color: theme.palette.grey[100],
        fontWeight: "bold",
        textAlign: "center",
    },
}));

export default useStyles;
