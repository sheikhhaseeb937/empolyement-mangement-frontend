import React from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
 

} from "@mui/material";
import Grid from '@mui/material/Grid';  


const ProfilePage: React.FC = () => {
  // Local storage se user data nikalna
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6">No profile data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          {/* Avatar and Name */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Avatar
              alt={user.name}
              src={user.avatar || "/static/images/avatar/1.jpg"} // agar image na ho to default avatar
              sx={{ width: 100, height: 100, mb: 2 ,fontSize: '4rem' }}
            />
            <Typography variant="h5" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography color="text.secondary">{user.role || "User"}</Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Details */}
          <Grid container spacing={10}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
     
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Department
              </Typography>
              <Typography variant="body1">{user.department || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Typography variant="body1">{user.status || "Active"}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

      
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
