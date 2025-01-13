import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components_admin/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import VehicleService from "../../../services/VehiculeService.js";

const UpdateVehicle = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const { matricule } = useParams();
    const [vehicleData, setVehicleData] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await VehicleService.getVehicleById(matricule);
                setVehicleData(response.data);
                setPreviewUrl(response.data?.file || ""); // Replace `imageUrl` with the actual field name for the image
            } catch (error) {
                console.error("Failed to fetch vehicle data:", error);
            }
        };
        fetchVehicleDetails();

        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [matricule]);

    const initialValues = {
        matricule: vehicleData?.matricule || "",
        brand: vehicleData?.brand || "",
        model: vehicleData?.model || "",
        year: vehicleData?.year || "",
        type: vehicleData?.type || "",
        price: vehicleData?.price || "",
        statu: vehicleData?.statu || "Available",
        file: vehicleData?.image || null,
    };

    const validationSchema = yup.object().shape({
        matricule: yup.string().required("Matricule is required"),
        brand: yup.string().required("Brand is required"),
        model: yup.string().required("Model is required"),
        year: yup
            .number()
            .required("Year is required")
            .min(1900, "Year must be after 1900")
            .max(new Date().getFullYear(), "Year cannot be in the future"),
        type: yup.string().required("Type is required"),
        price: yup
            .number()
            .required("Price is required")
            .positive("Price must be positive"),
        file: yup.mixed().notRequired(),
    });

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const formData = new FormData();
            console.log("Values from form:", values);
            console.log("Original vehicle data:", vehicleData);

            // Check each field to see if it's changed, then add only the modified fields to the FormData
            formData.append('matricule', vehicleData.matricule);
            formData.append('brand', vehicleData.brand);
            formData.append('model', vehicleData.model);
            formData.append('year', vehicleData.year);
            formData.append('type', vehicleData.type);

            if (values.price !== vehicleData.price) {
                formData.append('price', values.price);
            } else {
                formData.append('price', vehicleData.price);
            }

            if (values.statu !== vehicleData.statu) {
                formData.append('statu', values.statu);
            } else {
                formData.append('statu', vehicleData.statu);
            }

            if (values.file instanceof File) {
                formData.append('file', values.file);
            } else if (vehicleData.image) {
                formData.append('image', vehicleData.image);
            }

            console.log("FormData values:", [...formData.entries()]); // Debugging payload

            await VehicleService.updateVehicle(matricule, formData);
            alert("Vehicle successfully updated!");
            navigate("/admin/vehicles");
        } catch (error) {
            console.error("Update failed:", error);
            setFieldError("general", error.response?.data?.message || "Failed to update vehicle");
        } finally {
            setSubmitting(false);
        }
    };

    if (!vehicleData) {
        return <div>Loading...</div>;
    }

    return (
        <Box m="20px">
            <Header title="UPDATE VEHICLE" subtitle="Update Vehicle Information" />

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display="flex" flexDirection="column" gap="20px">
                            <Button
                                variant="contained"
                                component="label"
                                color="secondary"
                                style={{ alignSelf: "center" }}
                            >
                                Upload New Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        setFieldValue("file", file);
                                        setPreviewUrl(URL.createObjectURL(file));
                                    }}
                                />
                            </Button>
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        objectFit: "cover",
                                        alignSelf: "center",
                                    }}
                                />
                            )}

                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Matricule"
                                    name="matricule"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.matricule}
                                    disabled
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Brand"
                                    name="brand"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.brand}
                                    disabled
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Model"
                                    name="model"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.model}
                                    disabled
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Year"
                                    name="year"
                                    type="number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.year}
                                    disabled
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Type"
                                    name="type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.type}
                                    disabled
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Price"
                                    name="price"
                                    type="number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.price}
                                    error={!!touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Statu"
                                    name="statu"
                                    value={values.statu}
                                    onChange={handleChange}
                                    error={!!touched.statu && !!errors.statu}
                                    helperText={touched.statu && errors.statu}
                                    sx={{ gridColumn: "span 4" }}
                                >
                                    <MenuItem value="Available">Available</MenuItem>
                                    <MenuItem value="Waiting">Waiting</MenuItem>
                                    <MenuItem value="UnderMaintenance">Maintenance</MenuItem>
                                    <MenuItem value="Booked">Booked</MenuItem>
                                    <MenuItem value="Taken">Taken</MenuItem>
                                </TextField>
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    disabled={isSubmitting}
                                >
                                    Update Vehicle
                                </Button>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default UpdateVehicle;
