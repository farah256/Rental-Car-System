import React, { useState } from 'react';
import { Box, Button, Card, Container, Grid, IconButton, InputAdornment, Typography, styled, ThemeProvider, createTheme } from '@mui/material';
import { Person as PersonIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';

// Create a theme with custom styles for TextField
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

// Styled components
const LoginCard = styled(Card)(({ theme }) => ({
    maxWidth: 1000,
    margin: 'auto',
    overflow: 'hidden',
    display: 'flex',
    backgroundColor: '#ffffff',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

const ImageSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    flex: 1,
    minHeight: 500,
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

const SignUpButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 255)',
    borderRadius: '20px',
    padding: '8px 24px',
    textTransform: 'none',
    fontWeight: 500,
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderColor: 'rgba(255, 255, 255, 255)',
    },
}));

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const navigate = useNavigate();

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
                                        Don't have an account?
                                    </Typography>
                                    <Link to="/registration" style={{ textDecoration: 'none' }}>
                                        <SignUpButton variant="contained" disableElevation>
                                            Sign Up
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
                                Welcome back!
                            </Typography>

                            <Grid container spacing={2}>
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
                                        sx={{
                                            mt: 2,
                                            backgroundColor: '#000000',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: '#00000e',
                                            },
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Grid>

                                <Grid item xs={12} textAlign="center">
                                    <Link href="#" style={{ color: 'black', textDecoration: 'underline' }}>
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