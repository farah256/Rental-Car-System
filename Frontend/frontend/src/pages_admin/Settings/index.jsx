import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components_admin/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../../services/UserService.js";

const Settings = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await UserService.getUserById(userId);
                setUserData(response.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUserDetails();
    }, [userId]);

    const initialValues = {
        firstname: userData?.firstname || "",
        lastname: userData?.lastname || "",
        email: userData?.email || "",
        password: "",
        role: userData?.role || "USER",
        adress: userData?.adress || "",
        phone: userData?.phone || "",
    };

    const validationSchema = yup.object().shape({
        firstname: yup.string().required("First name is required"),
        lastname: yup.string().required("Last name is required"),
        email: yup
            .string()
            .email("Email is not valid")
            .required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters"),
        role: yup.string().required("Role is required"),
        address: yup.string().required("Address is required"),
        phone: yup
            .string()
            .required("Phone number is required")
            .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    });

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            const userDataToUpdate = {
                ...values,
                password: values.password ? values.password : userData.password, // Keep old password if not updated
            };
            await UserService.updateUser(userId, userDataToUpdate);
            alert("User successfully updated!");
            navigate("/admin/users");
        } catch (error) {
            console.error("Update failed:", error);
            setFieldError("general", error.response?.data?.message || "Failed to update user");
        } finally {
            setSubmitting(false);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <Box m="20px">
            <Header title="UPDATE USER" subtitle="Update User Information" />

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
                                    label="First Name"
                                    name="firstname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstname}
                                    error={!!touched.firstname && !!errors.firstname}
                                    helperText={touched.firstname && errors.firstname}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Last Name"
                                    name="lastname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastname}
                                    error={!!touched.lastname && !!errors.lastname}
                                    helperText={touched.lastname && errors.lastname}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Email"
                                    name="email"
                                    type="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    select
                                    label="Role"
                                    name="role"
                                    value={values.role}
                                    onChange={handleChange}
                                    error={!!touched.role && !!errors.role}
                                    helperText={touched.role && errors.role}
                                    sx={{ gridColumn: "span 4" }}
                                >
                                    <MenuItem value="ADMIN">Admin</MenuItem>
                                    <MenuItem value="USER">User</MenuItem>
                                    <MenuItem value="MODERATOR">Moderator</MenuItem>
                                </TextField>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Address"
                                    name="adress"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.address}
                                    error={!!touched.address && !!errors.address}
                                    helperText={touched.address && errors.address}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Phone"
                                    name="phone"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phone}
                                    error={!!touched.phone && !!errors.phone}
                                    helperText={touched.phone && errors.phone}
                                    sx={{ gridColumn: "span 4" }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    disabled={isSubmitting}
                                >
                                    Update User
                                </Button>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Settings;
