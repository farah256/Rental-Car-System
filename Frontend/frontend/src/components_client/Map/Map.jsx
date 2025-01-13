import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  Phone
} from '@mui/icons-material';

const Map = () => {


  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h1" component="h2" gutterBottom>
            Find Us Anywhere
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Our rental locations across the city
          </Typography>
        </Box>

        {/* Map Container */}
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            height: 500,
            mb: 6,
            overflow: 'hidden'
          }}
        >
          {/* Placeholder Map Image */}

          <Box
            component="img"
            src="../../../public/images_client/Screenshot 2025-01-13 at 16.40.13.png"
            alt="Map location"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          {/* Location Markers */}
          <LocationOn
            sx={{
              position: 'absolute',
              top: '20%',
              left: '25%',
              transform: 'translate(-50%, -50%)',
              color: 'error.main',
              fontSize: 40
            }}
          />
          <LocationOn
            sx={{
              position: 'absolute',
              top: '30%',
              right: '25%',
              transform: 'translate(-50%, -50%)',
              color: 'error.main',
              fontSize: 40
            }}
          />
        </Paper>



      </Container>
    </Box>
  );
};

export default Map;