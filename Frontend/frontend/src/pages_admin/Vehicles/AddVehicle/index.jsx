import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components_admin/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import VehicleService from "../../../services/VehiculeService.js"; // Assuming you have this service

const AddVehicle = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState("");

    const initialValues = {
        matricule: "",
        brand: "",
        model: "",
        year: "",
        type: "",
        price: "",
        statu: "Available", // Default value
        file: null,
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
        file: yup.mixed().required("Image is required"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
        try {
            const formData = new FormData();
            Object.keys(values).forEach((key) => {
                formData.append(key, values[key]);
            });

            await VehicleService.addVehicle(formData);
            alert("Vehicle successfully added!");
            navigate("/admin/vehicles");
        } catch (error) {
            setFieldError("general", error.response?.data?.message || "Failed to add vehicle");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <Box m="20px">
            <Header title="ADD VEHICLE" subtitle="Create a New Vehicle" />

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
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
                                Upload Image
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
                                    error={!!touched.matricule && !!errors.matricule}
                                    helperText={touched.matricule && errors.matricule}
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
                                    error={!!touched.brand && !!errors.brand}
                                    helperText={touched.brand && errors.brand}
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
                                    error={!!touched.model && !!errors.model}
                                    helperText={touched.model && errors.model}
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
                                    error={!!touched.year && !!errors.year}
                                    helperText={touched.year && errors.year}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Type"
                                    name="type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.type}
                                    error={!!touched.type && !!errors.type}
                                    helperText={touched.type && errors.type}
                                    sx={{ gridColumn: "span 2" }}
                                >
                                    <MenuItem value="Economic">Economic</MenuItem>
                                    <MenuItem value="SUV">SUV</MenuItem>
                                    <MenuItem value="Sport">Sport</MenuItem>
                                    <MenuItem value="Luxury">Luxury</MenuItem>
                                    <MenuItem value="Classic">Classic</MenuItem>
                                </TextField>
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
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    disabled={isSubmitting}
                                >
                                    Add Vehicle
                                </Button>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default AddVehicle;
