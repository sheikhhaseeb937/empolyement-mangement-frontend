import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


export default function AddTask() {
  interface Employee {
  _id: string;
  name: string;
  department: string;
}
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  interface FormData {
    department: string;
    member: string;
    description: string;
    dateTime: Date;
  }

  const [formData, setFormData] = useState<FormData>({
    department: "",
    member: "",
    description: "",
    dateTime: new Date(),
  });
console.log(formData)
  // Departments (you can also fetch this dynamically)
  const departments = [
    "Web Development",
    "HR",
    "C++ Programming",
    "Python Programming",
    "C Programming",
    "Data Analytics",
    "Machine Learning",
    "Deep Learning",
    "Cyber Security",
    "Android Development",
    "IOS Development",
  ];

  // Fetch all employees on mount
  const allgetEmployee = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/getAll`);
      const allDataEmployee = response.data.data;
      setEmployees(allDataEmployee);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    allgetEmployee();
  }, []);

  // Filter employees based on department
  const filteredMembers = employees
    .filter((emp) => emp.department === formData.department)
    .map((emp) => emp.name); 

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        // "http://localhost:5000/api/addtask",
        `${import.meta.env.VITE_BASE_URL}/api/addtask`,
{
    selectedDepartment: formData.department,
    member: formData.member,
    taskdescription: formData.description,
    dateTime: formData.dateTime,
}
      );
      console.log("✅ Task Added:", response.data);
      toast.success(response.data?.message || "Task added successfully");
      setFormData({
        department: "",
        member: "",
        description: "",
        dateTime: new Date(),
      });
    } catch (error: any) {
      console.error("❌ Error adding task:", error);
      toast.error(error.response?.data?.message || "Error adding task");
    }
  };

  return (
   <>
     <ToastContainer position="top-center" autoClose={3000} />
   
    <Box
      className="border-2 border-gray-400"
      sx={{
        width: 600,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 4,
      }}
    >
      {/* Department Autocomplete */}
      <Autocomplete
        options={departments}
        value={formData.department}
        onChange={(e: React.ChangeEvent<HTMLInputElement>, newValue) => setFormData((prev) => ({
          ...prev,
          department: newValue || "",
          member: "",
        }))
        }
        renderInput={(params) => (
          <TextField {...params} label="Select Department" variant="outlined" />
        )}
      />

      {/* Member Autocomplete - dynamic based on department */}
      {formData.department && (
        <Autocomplete
          options={filteredMembers}
          value={formData.member}
          onChange={(e, newValue) =>
            setFormData((prev) => ({ ...prev, member: newValue || "" }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={`${formData.department} Members`}
              variant="outlined"
            />
          )}
        />
      )}

      {/* Description */}
      <TextField
        name="description"
        label="Task Description"
        multiline
        rows={3}
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
      />

      {/* Date & Time Picker */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Select Date & Time"
          value={formData.dateTime}
          onChange={(newValue) =>
            setFormData((prev) => ({ ...prev, dateTime: newValue || new Date() }))
          }

        />
      </LocalizationProvider>

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Task
      </Button>
    </Box></>
  );
}
