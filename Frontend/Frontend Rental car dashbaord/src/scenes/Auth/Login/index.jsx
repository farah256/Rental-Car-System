import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
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

// Custom styled components
const LoginCard = styled(Card)(({ theme }) => ({
  maxWidth: 1000,
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
  minHeight: 400,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const FormSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const LoginPage = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

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
    <Container maxWidth={false} sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5' }}>
      <LoginCard>
        {/* Left Side - Image and Text */}
        <Box sx={{ flex: 1, position: 'relative' }}>
          <CardMedia
            component="div"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(76, 175, 80, 0.9)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
              },
            }}
          />
          <ImageSection>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, position: 'relative', zIndex: 1 }}>
              Create And Sell
              <br />
              Extraordinary
              <br />
              Products
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
              Adopt the peace of nature!
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                position: 'relative',
                zIndex: 1,
              }}
            >
              Sign Up
            </Button>
          </ImageSection>
        </Box>

        {/* Right Side - Login Form */}
        <FormSection component="form" onSubmit={handleSubmit}>
          <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
            Welcome Back!
          </Typography>

          <Grid container spacing={3}>
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
  );
};

export default LoginPage;