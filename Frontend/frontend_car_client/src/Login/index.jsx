import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import {
    Person as PersonIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LoginCard = styled(Card)(({ theme }) => ({
    maxWidth: '100%',
    margin: 'auto',
    overflow: 'hidden',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

const ImageSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    flex: 1,
    minHeight: 450,
    minWidth: 400,
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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

// New styled component for the sign up button
const SignUpButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#000',
    borderRadius: '20px',
    padding: '8px 24px',
    textTransform: 'none',
    fontWeight: 500,
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
}));

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const navigate = useNavigate(); // Initialize navigation hook


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Login attempted:', { username: values.username, password: values.password });
    };

    return (
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
                            <source src="../../public/f6eaa45d1736d48db1fbb786dea6919b_t4.mp4" type="video/mp4" />
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
                                Fly with wheals
                            </Typography>
                            <Box sx={{ position: 'absolute',display: 'flex', alignItems: 'center', gap: 2 ,bottom: 16,}}>
                                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                    Don't have an account?
                                </Typography>
                                <SignUpButton
                                    variant="contained"
                                    disableElevation
                                    onClick={() => navigate('/registration')} // Navigate to registration page
                                >
                                    Sign Up
                                </SignUpButton>
                            </Box>
                        </ContentOverlay>
                    </ImageSection>

                    <FormSection component="form" onSubmit={handleSubmit}>
                        <img
                            src="../../public/3-removebg-preview.png"
                            alt="EASERENT Logo"
                            style={{
                                height: "70px",
                                objectFit: "contain",
                                marginBottom: "10px"
                            }}
                        />
                        <Typography variant="h6" component="h2" sx={{ mb: 4,textAlign: 'center', marginBottom: "90px"}}>
                            Welcome Back!
                        </Typography>

                        <Grid container spacing={3}>
                            {/* Username Field */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    variant="outlined"
                                    value={values.username}
                                    onChange={handleChange('username')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: ( // Adding a dummy endAdornment for symmetry if needed
                                            <InputAdornment position="end">
                                                <Box sx={{ width: 24 }} /> {/* Placeholder for spacing */}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Password Field */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Box sx={{ width: 24 }} /> {/* Placeholder for symmetry */}
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowPassword} edge="end">
                                                    {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
                                    color="primary"
                                    sx={{ mt: 2 }}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12} textAlign="center">
                                <Link href="#" underline="hover" color="textSecondary">
                                    Forgot your password? Click Here
                                </Link>
                            </Grid>
                        </Grid>
                    </FormSection>
                </LoginCard>
            </Container>
        </Box>
    );
};

export default Login;