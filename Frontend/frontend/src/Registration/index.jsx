import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
    TextField, styled,
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Home as HomeIcon,
    Phone as PhoneIcon,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userService from "../services/UserService.js";
import '../Registration/Register.css';

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        color: 'black',
                    },
                    '& .MuiInputLabel-root': {
                        color: 'black',
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black',
                    },
                },
            },
        },
    },
});

const Register = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phoneNumber: '',
        showPassword: false,
        showConfirmPassword: false,
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = (field) => () => {
        setValues({
            ...values,
            [field]: !values[field]
        });
    };

    const validateForm = () => {
        // Basic validation for empty fields
        if (!values.firstName || !values.lastName || !values.email || !values.address || !values.phoneNumber || !values.password || !values.confirmPassword) {
            setError("All fields are required");
            return false;
        }

        // Password match check
        if (values.password !== values.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        // Email format validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(values.email)) {
            setError("Invalid email format");
            return false;
        }

        // Phone number validation (simple validation for length and digits, adjust as needed)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(values.phoneNumber)) {
            setError("Invalid phone number format");
            return false;
        }

        setError(''); // Clear any existing error messages
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const requestBody = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                address: values.address,
                phone: values.phoneNumber,
                password: values.password,
            };

            const userData = await userService.register(requestBody);
            console.log(userData);

            setValues({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                address: '',
                phoneNumber: '',
                showPassword: false,
                showConfirmPassword: false,
            });

            alert('User registered successfully');
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);

                if (userData.role === 'ADMIN') {
                    navigate('/admin/');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering the user.');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Card>
                <Box className="login-container-reg">
                    <Container maxWidth="md" sx={{ py: 4 }}>
                        <Card className="login-card-reg">
                            <Box className="image-section-reg">
                                <video className="video-background-reg" autoPlay loop muted playsInline>
                                    <source src="/images_client/f6eaa45d1736d48db1fbb786dea6919b_t4.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <Box className="content-overlay-register1">
                                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        Rent with ease
                                        <br />
                                        your desired Cars
                                    </Typography>
                                    <Typography variant="h6" sx={{ mb: 4 }}>
                                        Fly with wheels
                                    </Typography>
                                    <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 2, bottom: 16 }}>
                                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                            Already have an account?
                                        </Typography>
                                        <Link to="/login" style={{ textDecoration: 'none' }}>
                                            <Button className="signup-button-reg" variant="contained">
                                                Sign In
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                            </Box>

                            <Grid component="form" onSubmit={handleSubmit} className="form-section-reg">
                                <img
                                    src="/images_client/3-removebg-preview.png"
                                    alt="EASERENT Logo"
                                    style={{ height: "70px", objectFit: "contain" }}
                                />
                                <Typography variant="h6" component="h2" className="form-title-reg">
                                    Create Account
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            variant="outlined"
                                            value={values.firstName}
                                            onChange={handleChange('firstName')}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            variant="outlined"
                                            value={values.lastName}
                                            onChange={handleChange('lastName')}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            variant="outlined"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange('email')}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            variant="outlined"
                                            value={values.address}
                                            onChange={handleChange('address')}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <HomeIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            variant="outlined"
                                            value={values.phoneNumber}
                                            onChange={handleChange('phoneNumber')}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            variant="outlined"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleClickShowPassword('showPassword')} edge="end">
                                                            {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Confirm Password"
                                            variant="outlined"
                                            type={values.showConfirmPassword ? 'text' : 'password'}
                                            value={values.confirmPassword}
                                            onChange={handleChange('confirmPassword')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handleClickShowPassword('showConfirmPassword')} edge="end">
                                                            {values.showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                mt: 2,
                                                backgroundColor: '#000000',
                                                color: '#fff',
                                                '&:hover': {
                                                    backgroundColor: '#00000e',
                                                },
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Container>
                </Box>
            </Card>
        </ThemeProvider>
    );
};

export default Register;
