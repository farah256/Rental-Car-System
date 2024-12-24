import React, { useState } from 'react';
import { Box, Button, Card, Container, Grid, IconButton, InputAdornment, Link, TextField, Typography, styled, ThemeProvider, createTheme } from '@mui/material';
import { Person as PersonIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';  // Import useTheme

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Primary color
        },
        secondary: {
            main: '#f50057', // Secondary color
        },
        background: {
            default: '#fff', // Default background color
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif', // Custom font
    },
});

// Styled components
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
    [theme.breakpoints.down('md')]: {
        minHeight: 300,
        minWidth: '100%',
    },
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
    backgroundColor: 'white',
    color: '#000',
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
    },
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


const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const navigate = useNavigate();
    const theme = useTheme();

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
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#ffffff',
                    color: '#000',
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
                                    variant="h2"
                                    component="h1"
                                    sx={{
                                        fontWeight: 'bold',
                                        mb: 2,
                                        textAlign: 'center',
                                        [theme.breakpoints.down('sm')]: {
                                            fontSize: '2rem',
                                        },
                                    }}
                                >
                                    Rent with ease
                                    <br />
                                    your desired Cars
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 4,
                                        textAlign: 'center',
                                        [theme.breakpoints.down('sm')]: {
                                            fontSize: '1rem',
                                        },
                                    }}
                                >
                                    Fly with wheels
                                </Typography>
                                <Box sx={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 2, bottom: 16 }}>
                                    <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                        Don't have an account?
                                    </Typography>
                                    <SignUpButton  variant="contained" disableElevation onClick={() => navigate('/registration')}>
                                        Sign Up
                                    </SignUpButton>
                                </Box>
                            </ContentOverlay>
                        </ImageSection>

                        <FormSection component="form" onSubmit={handleSubmit}>
                            <img
                                src="/images_client/3-removebg-preview.png"
                                alt="EASERENT Logo"
                                style={{
                                    height: '70px',
                                    objectFit: 'contain',
                                    marginBottom: '10px',
                                }}
                            />
                            <Typography variant="h4" component="h2" sx={{ mb: 4, textAlign: 'center', marginTop: "40px" }}>
                                Welcome back!
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
                                                    <PersonIcon sx={{ color: 'black' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            color: 'black',
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'black',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'black',
                                            },
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
                                                    <Box sx={{ width: 24 }} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                                        {values.showPassword ? <VisibilityOffIcon sx={{ color: 'black' }} /> : <VisibilityIcon sx={{ color: 'black' }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            color: 'black',
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'black',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'black',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'black',
                                                },
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'black',
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button fullWidth size="large" type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Login
                                    </Button>
                                </Grid>

                                <Grid item xs={12} textAlign="center">
                                    <Link href="#" underline="hover" color="black">
                                        Forgot your password? Click Here
                                    </Link>
                                </Grid>
                            </Grid>
                        </FormSection>
                    </LoginCard>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Login;
