import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
    styled,
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
const SignUpButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Same as your .banner-btn.see-all background color
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 255)', // Border color similar to the original style
    borderRadius: '20px',
    padding: '8px 24px',
    textTransform: 'none',
    fontWeight: 500,
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Same as hover effect for the .banner-btn.see-all
        borderColor: 'rgba(255, 255, 255, 255)', // Border color on hover
    },
}));


// Create a theme with custom styles for TextField
const theme = createTheme({

    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        color: 'black', // Text color
                    },
                    '& .MuiInputLabel-root': {
                        color: 'black', // Label color
                    },
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // Border color
                    },
                },
            },
        },
    },
});
// Styled components
const LoginCard = styled(Card)(({ theme }) => ({
    maxWidth: 1000,
    margin: 'auto',
    overflow: 'hidden',
    display: 'flex',
    backgroundColor: '#ffffff',  // Adjusted background color for consistency with login
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

const ImageSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    flex: 1,
    minHeight: 700,
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    padding: theme.spacing(4),
    overflow: 'hidden',
}));

const VideoBackground = styled('video')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    objectFit: 'cover',
    zIndex: 0,
});

const FormSection = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(4),
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}));

const ContentOverlay = styled(Box)({
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    minHeight: 450,
    minWidth: 400,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
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

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = (field) => () => {
        setValues({
            ...values,
            [field]: !values[field]
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Sign up attempted:', values);
    };

    return (
        <ThemeProvider theme={theme}>
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: '#f5f5f5',
            }}
        >
            <Container maxWidth="md" sx={{ py: 4 }}>
                <LoginCard>
                    <ImageSection>
                        <VideoBackground autoPlay loop muted playsInline>
                            <source src="/images_client/f6eaa45d1736d48db1fbb786dea6919b_t4.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </VideoBackground>
                        <ContentOverlay>
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    textAlign: 'center',
                                }}
                            >
                                Rent with ease
                                <br />
                                your desired Cars
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 4,
                                    textAlign: 'center',
                                }}
                            >
                                Fly with wheels
                            </Typography>
                            <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 2, bottom: 16 }}>
                                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                    Already have an account?
                                </Typography>
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <SignUpButton variant="contained" disableElevation>
                                        Sign In
                                    </SignUpButton>
                                </Link>
                            </Box>
                        </ContentOverlay>
                    </ImageSection>

                    <FormSection component="form" onSubmit={handleSubmit}>
                        <img
                            src="/images_client/3-removebg-preview.png"
                            alt="EASERENT Logo"
                            style={{
                                height: "70px",
                                objectFit: "contain",
                            }}
                        />
                        <Typography variant="h6" component="h2" sx={{ mb: 4, textAlign: 'center', marginTop: "40px" }}>
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
                                        backgroundColor: '#000000', // Black background color
                                        color: '#fff', // White text color
                                        '&:hover': {
                                            backgroundColor: '#00000e', // Slightly darker shade on hover
                                        },
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Grid>

                        </Grid>
                    </FormSection>
                </LoginCard>
            </Container>
        </Box>
        </ThemeProvider>

    );
};

export default Register;
