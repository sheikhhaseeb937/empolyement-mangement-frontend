// DashboardLayoutBranding.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateEmployeeForm from './Addmember';
import Person2Icon from '@mui/icons-material/Person2';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddTask from './Addtask';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logimg from '../../assets/images/logo.jpg'
import "react-toastify/dist/ReactToastify.css";



const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'addtask',
    title: 'Add Task',
    icon: <AddTaskIcon />,
  },
  {
    segment: 'departments',
    title: 'IT Departments',
    icon: <ApartmentIcon />,
  },
  {
    segment: 'members',
    title: 'Members',
    icon: <PeopleIcon />,
  },
  {
    segment: 'create-employee',
    title: 'Create Employee',
    icon: <AddCircleIcon />,
  },
  {
    segment: 'logout',
    title: 'Logout',
    icon: <LogoutIcon />,
  },

  
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

 function DemoPageContent({ pathname }: { pathname: string }) {
  interface Employee {
  name: string;
  department: string;
  email: string;
}



const [employees, setEmployees] = React.useState([]);
const [selectedEmployee , SetSelectedEmployee] = React.useState<Employee | null>(null)
const [ispopUp ,setIspopUp] = React.useState(false)

const [editInputs, setEditInputs] = React.useState({
name: '',
email:'',
password:'',
department:'',


});
   const navigate = useNavigate();

  const logoutAdmin = ()=>{
               localStorage.removeItem('token');
              localStorage.removeItem('user');
              localStorage.removeItem('role');
              toast.warning("Logged out successfully!");
              setTimeout(() => {
                navigate('/admin');
              }, 2000);
  }

  const allEmployee = async ()=>{
    try {
  const allgetEmployee = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/getAll`);
  console.log(allgetEmployee.data);
  setEmployees(allgetEmployee.data.data);
} catch (error:any) {
  console.log(error)
} 
  }
  React.useEffect(() => {
    allEmployee();
  }, []);
  console.log(employees)

  ///Delete memeber
  const handleDelete = async (id:string)=>{
    console.log("dlete",id)

    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/deleteMember/${id}`);
      console.log(response)
      toast.success(response.data?.message)
      allEmployee()
    } catch (error:any) {
      console.log(error)
      toast.error(error.message)
    }
  }


  ///editbtn
const handleEdit =async (id:string)=>{
  // console.log(id)
const employeeEdit = employees.find((emp:{_id:string})=>emp._id === id)
// console.log(employeeEdit)
if(employeeEdit){
SetSelectedEmployee(employeeEdit)
setIspopUp(true)

}
console.log(employeeEdit)
}

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setEditInputs((prev) => ({ ...prev, [name]: value }));
  console.log(editInputs)
};
// console.log(selectedEmployee._id)
const handleEditSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    if (!selectedEmployee) return;
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/editMember/${selectedEmployee._id}`, editInputs);
    console.log(response);
    toast.success(response.data?.message);
    allEmployee();
    setIspopUp(false);
    setEditInputs({
      name: '',
      email: '',
      password: '',
      department: '',
    });
  
  } catch (error:any) {
    console.log(error);
    toast.error(error.message);
  }
};

  switch (pathname) {
    case '/dashboard':
      return (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h4">Welcome, Admin</Typography>
          <Typography variant="body1">This is your admin dashboard.</Typography>
        </Box>
      );
       case '/addtask':
      return (
        <div>

                <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            px: 2,
          }}
        >
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const formValues = Object.fromEntries(data.entries());
              alert('Employee Created:\n' + JSON.stringify(formValues, null, 2));
            }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              width: '100%',
              maxWidth: 450,
              p: 4,
              borderRadius: 3,
             
              backgroundColor: 'background.paper',
            }}
          >
            <Typography sx={{  fontSize: "2rem" }} variant="h5" gutterBottom textAlign="center">
              <AddTaskIcon sx={{ mr: 1, fontSize: "3rem" }} /> Add New Task
            </Typography>
            <AddTask />
          </Box>
        </Box>
        </div>
      
        
      );

    case '/departments':
      return (
        <Box sx={{ py: 4 }}>
          <Typography
            className="text-blue-500 font-bold text-center text-5xl"
            variant="h5"
            gutterBottom
          >
            IT Departments
          </Typography>
          <ul className="px-4 md:px-14 py-2 flex flex-col gap-4">
            {[
        
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
  
            ].map((dept) => (
              <li
                key={dept}
                className="text-center border-2 border-gray-400 p-4 text-xl md:text-2xl rounded-xl hover:bg-gray-400 transition"
              >
                {dept}
              </li>
            ))}
          </ul>
        </Box>
      );

    case '/members':
      return (
        <Box sx={{ py: 4, px: { xs: 2, md: 6 } }}>
          <Typography variant="h5" gutterBottom>
            Team Members
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="team members table">
              <TableHead>
                <TableRow>

                  <TableCell>
                    <strong>👤 Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>📧 Departement</strong>
                  </TableCell>
                    <TableCell>
                    <strong> JoingDate</strong>
                  </TableCell>
                      <TableCell>
                    <strong> Email</strong>
                  </TableCell>
                      <TableCell>
                    <strong> Password</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employees.map((member:{name: string, department: string, dateTime: string, email: string, password: string, _id : string}, index:number) => (
                  console.log(member),
                  <TableRow key={index}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>{member.dateTime}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.password}</TableCell>
                    <TableCell  >
                         <Button onClick={()=>handleEdit(member._id)} className='bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 hover:text-white' variant="outlined" color="warning">
                        Edit
                      </Button>
                      <Button onClick={()=>handleDelete(member._id)} className='bg-red-500  text-white py-1 px-2 rounded hover:bg-red-600 hover:text-white' variant="outlined" color="error">
                        Delete
                      </Button>
                     
                    </TableCell>
                  </TableRow>


                

                ))}

                {ispopUp && (
    //                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-5">
    // <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl">
    //   <h2 className="text-xl font-bold mb-4 text-center">Edit Product</h2>
    //   <form className="space-y-4">
    //     <input
    //       type="text"
    //       name="pname"

    //       placeholder="Product Name"
    //       className="w-full p-2 border rounded"
    //     />
    //     <input
    //       type="text"
    //       name="price"
 
    //       placeholder="Price"
    //       className="w-full p-2 border rounded"
    //     />
        
    //     <div className="flex justify-end gap-2 pt-2">
    //       <button
    //         type="button"
         
    //         onClick={()=>setIspopUp(false)}
    //         className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
    //       >
    //         Cancel
    //       </button>
    //       <button
       
    //         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    //       >
    //         Save
    //       </button>
    //       </div>
    //     </form>
    //     </div>
    //     </div>
<>


      <div className="fixed bg-black/20 backdrop-blur-md   inset-0 z-50 flex items-center justify-center bg-black bg-opacity-5">
<form onSubmit={handleEditSubmit}>
  
          <Box
            className="border-2 border-gray-400 bg-black w-full max-w-lg p-6 rounded-xl shadow-xl "
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
              label="Name"
              variant="outlined"
              name="name"
              value={editInputs.name}
              onChange={handleInputChange}
            />
            <TextField
              label="Email Address"
              variant="outlined"
              name="email"
              type="email"
              value={editInputs.email}
              onChange={handleInputChange}
            />
             <TextField
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={editInputs.password}
              onChange={handleInputChange}
            />
        <FormControl fullWidth>
      <InputLabel id="department-label">Department</InputLabel>
      <Select
        labelId="department-label"
        id="department"
        name="department"

        label="Department"
                value={editInputs.department}
        onChange={handleInputChange}
      
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
     
    
       <div className="flex justify-end gap-2 pt-2">
         <button
            type="button"
         
            onClick={()=>setIspopUp(false)}
            className="bg-yellow-400 text-black hover:bg-yellow-500 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
       type='submit'
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          </div>
    
         
          </Box>
</form>
          
          </div></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );

    case '/create-employee':
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            px: 2,
          }}
        >
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const formValues = Object.fromEntries(data.entries());
              alert('Employee Created:\n' + JSON.stringify(formValues, null, 2));
            }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              width: '100%',
              maxWidth: 450,
              p: 4,
              borderRadius: 3,
             
              backgroundColor: 'background.paper',
            }}
          >
            <Typography sx={{  fontSize: "2rem" }} variant="h5" gutterBottom textAlign="center">
              <Person2Icon sx={{ mr: 1, fontSize: "3rem" }} /> Create New Employee
            </Typography>
            <CreateEmployeeForm />
          </Box>
        </Box>
      );

case '/logout':
  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h4" color="error" gutterBottom>
        You have been logged out
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for using the Admin Panel. Please log in again to continue.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={logoutAdmin}
      >
        Go to Login
      </Button>
    </Box>
  );

    default:
      return (
        <Box sx={{ py: 4 }}>
          <Typography>404 - Page not found</Typography>
        </Box>
      );
      
    
 
  }


}

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBranding(props: DemoProps) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
<>
<ToastContainer position="top-center" autoClose={3000} />
    <DemoProvider window={demoWindow}>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: (
            <img
              src={logimg}
              alt="Soluation logo"
              style={{ height: 40 ,borderRadius: '100px' }}
            />
          ),
          title: 'Admin Panel',
          homeUrl: '/dashboard',
        }}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        
        <DashboardLayout>
          
          <DemoPageContent pathname={router.pathname} />
          
    
        </DashboardLayout>
      </AppProvider>
    </DemoProvider></>
  );
}
