import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from "axios";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { toast, ToastContainer } from 'react-toastify';

export default function CreateEmployeeForm() {
   

    interface FormData {
  name: string;
  email: string;
  password: string;
  department: string;
  age: string;
  dateTime: Date;
  image: File | null;
  imagePreview: string;
}

    const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
      password: '',
      department: '',
      age: '',
      dateTime: new Date(),
    image: null as File | null,
    imagePreview: '',
    })



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(name, value);
  };

  const handleDateChange = (newValue: Date | null) => {
    setFormData((prev) => ({ ...prev, dateTime: newValue || new Date() }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };
//   console.log(formData)

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {


const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/create`, formData);

    console.log("Employee Created:", response.data);
    toast.success(response.data.message || "Employee Created Successfully!");

    setFormData({
      name: '',
      email: '',
      password: '',
      department: '',
      age: '',
      dateTime: new Date(),
      image: null,
      imagePreview: '',
    });
  } catch (error:any) {
    console.log("Error creating employee:", error);

    toast.error(error.response?.data?.message || "Error creating employee");
  }
};

  return (

  <>
   <ToastContainer position="top-center" autoClose={3000} />

    
      <Box
        className="border-2 border-gray-400 "
        sx={{
          width: 800,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
       
          gap: 2,
          p: 4,
        }}
      >
        <TextField
          label="Full Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
         <TextField
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
    <FormControl fullWidth>
  <InputLabel id="department-label">Department</InputLabel>
  <Select
    labelId="department-label"
    id="department"
    name="department"
    value={formData.department}
    label="Department"
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, department: e.target.value }))
    }
  >
    <MenuItem value="Web Development">Web Development</MenuItem>
    <MenuItem value="HR">HR</MenuItem>
    <MenuItem value="C++ Programming">C++ Programming</MenuItem>
    <MenuItem value="Python Programming">Python Programming</MenuItem>
    <MenuItem value="C Programming">C Programming</MenuItem>
    <MenuItem value="Data Analytics">Data Analytics</MenuItem>
    <MenuItem value="Machine Learning">Machine Learning</MenuItem>
    <MenuItem value="Deep Learning">Deep Learning</MenuItem>
    <MenuItem value="Cyber Security">Cyber Security</MenuItem>
    <MenuItem value="Android Development">Android Development</MenuItem>
    <MenuItem value="IOS Development">IOS Development</MenuItem>




  </Select>
</FormControl>
        <TextField
          label="Age"
          variant="outlined"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleInputChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Select Date & Time"
            value={formData.dateTime}
            onChange={handleDateChange}
        
          />
        </LocalizationProvider>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" component="label">
            Upload Profile Image
            <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
          </Button>
          {formData.imagePreview && (
            <Avatar src={formData.imagePreview} sx={{ width: 56, height: 56 }} />
          )}
        </Stack>


   <Button
  variant="contained"
  color="primary"
  type="button"   // 👈 Important: submit na ho
  onClick={handleSubmit}
>
  Create Employee
</Button>
      </Box>

</>
  );
}
