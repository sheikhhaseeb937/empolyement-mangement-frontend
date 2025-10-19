import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import InsightsIcon from '@mui/icons-material/Insights';
import logoImg from '../../assets/images/logo.png'; // 👈 place your logo in assets/logo folder

export default function LandingPage() {
  return (
    <Box sx={{ bgcolor: '#f9fafb', minHeight: '100vh' }}>
      {/* 🌟 Navbar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Left side: logo + name */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              component="img"
              src={logoImg}
              alt="HealthMate Logo"
              sx={{ width: 40, height: 40 }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: '#1f2937', letterSpacing: 0.5 }}
            >
              HealthMate
            </Typography>
          </Box>

          {/* Right side: buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/login"
              sx={{
                color: '#1f2937',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { color: '#EA580C' },
              }}
            >
              Sign In
            </Button>
            <Button
            
              variant="contained"
              component={Link}
              to="/login"
              sx={{
                bgcolor: '#EA580C',
                textTransform: 'none',
                borderRadius: '10px',
                px: 2.5,
                py: 0.8,
                fontWeight: 600,
                '&:hover': { bgcolor: '#c2410c' },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 💡 Hero Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: '#1f2937',
                mb: 2,
              }}
            >
              HealthMate — <span style={{ color: '#EA580C' }}>Sehat ka Smart Dost</span>
            </Typography>

            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
              Your AI-powered health companion that explains medical reports, tracks vitals, and keeps
              you informed in plain English and Roman Urdu.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                component={Link}
                to="/login"
                sx={{
                  bgcolor: '#EA580C',
                  textTransform: 'none',
                  borderRadius: '10px',
                  px: 3,
                  py: 1.2,
                  '&:hover': { bgcolor: '#c2410c' },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/learn-more"
                sx={{
                  color: '#EA580C',
                  borderColor: '#EA580C',
                  textTransform: 'none',
                  borderRadius: '10px',
                  px: 3,
                  py: 1.2,
                  '&:hover': { borderColor: '#c2410c', color: '#c2410c' },
                }}
              >
                Learn More
              </Button>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
              alt="HealthMate Illustration"
              sx={{ width: '100%', maxWidth: 400, display: 'block', mx: 'auto' }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* 🚀 Features Section */}
      <Box sx={{ bgcolor: 'white', py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 700, mb: 6, color: '#1f2937' }}
          >
            Why Choose HealthMate?
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#EA580C' }} />,
                title: 'Understand Your Reports',
                desc: 'Upload medical reports and let our AI explain results in simple English & Roman Urdu.',
              },
              {
                icon: <InsightsIcon sx={{ fontSize: 40, color: '#EA580C' }} />,
                title: 'Track Vitals Easily',
                desc: 'Log your vitals like BP, sugar, weight, and monitor progress visually.',
              },
              {
                icon: <FavoriteIcon sx={{ fontSize: 40, color: '#EA580C' }} />,
                title: 'Stay Healthy with Insights',
                desc: 'Receive smart tips and summaries to improve your lifestyle and health.',
              },
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: '16px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <CardContent>
                    {feature.icon}
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, lineHeight: 1.6 }}
                    >
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ⚙️ Footer */}
      <Box sx={{ bgcolor: '#1f2937', color: 'white', py: 4, textAlign: 'center' }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} <strong>HealthMate</strong> — Sehat ka Smart Dost
        </Typography>
      </Box>
    </Box>
  );
}
