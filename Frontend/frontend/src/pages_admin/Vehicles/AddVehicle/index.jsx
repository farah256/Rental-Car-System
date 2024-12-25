import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, CircularProgress, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components_admin/Header.jsx";
import { useState } from "react";
import api from '../../../api/axios.jsx';

const AddVehicle = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [imagePreview, setImagePreview] = useState(null); // State for image preview

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Create a URL for image preview
        }
    };
    const VehiculeType = {
        Economic: "Economic",
        Sport: "Sport",
        Luxury: "Luxury",
        SUV: "SUV",
        Classic: "Classic",
    };

    const VehiculeStatut = {
        Available: "Available",
        UnderMaintenance: "UnderMaintenance",
        Waiting: "Waiting",
        Booked: "Booked",
        Taken: "Taken",
    };

    const handleFormSubmit = async (values) => {
        const formData = new FormData();
        formData.append('vehicle', JSON.stringify(values));  // Send the vehicle data as a JSON string
        formData.append('image', values.image);  // Append the image file

        try {
            await api.post('/vehicles/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Important for handling file uploads
                },
            });
            console.log("Vehicle added successfully!");
        } catch (error) {
            console.error("Error adding vehicle", error);
        }
    };


    return (
        <Box m="20px">
            <Header title="CREATE VEHICLE" subtitle="Create a New Vehicle" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            {/* Image preview */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gridColumn: 'span 4' }}>
                                <input
                                    accept="image/*"
                                    type="file"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload">
                                    <Button variant="contained" component="span" color="secondary">
                                        Upload Image
                                    </Button>
                                </label>
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Vehicle Preview"
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                            marginTop: "20px",
                                        }}
                                    />
                                )}
                            </Box>

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Matricule"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.matricule}
                                name="matricule"
                                error={!!touched.matricule && !!errors.matricule}
                                helperText={touched.matricule && errors.matricule}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Brand"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.brand}
                                name="brand"
                                error={!!touched.brand && !!errors.brand}
                                helperText={touched.brand && errors.brand}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Model"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.model}
                                name="model"
                                error={!!touched.model && !!errors.model}
                                helperText={touched.model && errors.model}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Year"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.year}
                                name="year"
                                error={!!touched.year && !!errors.year}
                                helperText={touched.year && errors.year}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Price"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                name="price"
                                error={!!touched.price && !!errors.price}
                                helperText={touched.price && errors.price}
                                sx={{ gridColumn: "span 2" }}
                            />

                            {/* Type */}
                            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    value={values.type}
                                    onChange={handleChange}
                                    label="Type"
                                    name="type"
                                >
                                    {Object.values(VehiculeType).map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Status */}
                            <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={values.status}
                                    onChange={handleChange}
                                    label="Status"
                                    name="status"
                                >
                                    {Object.values(VehiculeStatut).map((status) => (
                                        <MenuItem key={status} value={status}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create Vehicle
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

// Validation schema
const checkoutSchema = yup.object().shape({
    matricule: yup.string().required("Matricule is required"),
    brand: yup.string().required("Brand is required"),
    model: yup.string().required("Model is required"),
    year: yup.number().required("Year is required").min(1900).max(2024),
    price: yup.number().required("Price is required").min(0),
    type: yup.string().required("Type is required"),
    status: yup.string().required("Status is required"),
});

const initialValues = {
    matricule: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    type: "",
    status: "",
};

export default AddVehicle;
