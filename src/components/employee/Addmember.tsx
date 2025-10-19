import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  MenuItem,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddMember() {
  const [memberData, setMemberData] = useState({
    name: "",
    gender: "",
    age: "",
  });

  const [members, setMembers] = useState([]);

  // ✅ Fetch all members
  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/getAllMembers`
      );
      setMembers(response.data || []);
    } catch (error) {
      console.error("Error fetching members:", error);
      toast.error("Failed to load members.");
    }
  };

  // ✅ Add new member
  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!memberData.name || !memberData.gender || !memberData.age) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/addMember`,
        memberData
      );
      console.log(response);

      if (response.status === 201) {
        toast.success("Member added successfully!");
        setMemberData({ name: "", gender: "", age: "" });
        fetchMembers();
      }
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member.");
    }
  };

  // ✅ Delete member
  const handleDeleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/deleteMember/${id}`
      );
      if (response.status === 200) {
        toast.success("Member deleted successfully!");
        fetchMembers();
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member.");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, textAlign: "center", color: "#EA580C" }}
      >
        👥 Add New Member
      </Typography>

      {/* ✅ Add Member Form */}
      <Box
        component="form"
        onSubmit={handleAddMember}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 500,
          mx: "auto",
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          label="Full Name"
          value={memberData.name}
          onChange={(e) =>
            setMemberData({ ...memberData, name: e.target.value })
          }
          fullWidth
        />

        <TextField
          select
          label="Gender"
          value={memberData.gender || ""}
          onChange={(e) =>
            setMemberData({ ...memberData, gender: e.target.value })
          }
          fullWidth
        >
          <MenuItem value="">Select Gender</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        <TextField
          label="Age"
          type="number"
          value={memberData.age}
          onChange={(e) =>
            setMemberData({ ...memberData, age: e.target.value })
          }
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{
            bgcolor: "#EA580C",
            textTransform: "none",
            "&:hover": { bgcolor: "#c2410c" },
          }}
        >
          Add Member
        </Button>
      </Box>

      {/* ✅ Members List */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, textAlign: "center", color: "#1f2937" }}
        >
          Team Members
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {members.length > 0 ? (
            members.map((member) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={member._id}>
                <Card
                  sx={{
                    textAlign: "center",
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: "#EA580C",
                        mx: "auto",
                        mb: 2,
                      }}
                    >
                      {member.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.gender} • {member.age} years
                    </Typography>

                    <Button
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={() => handleDeleteMember(member._id)}
                      sx={{ mt: 1, textTransform: "none" }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "center", mt: 2 }}
            >
              No members added yet.
            </Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
