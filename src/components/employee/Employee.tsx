import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddTaskIcon from '@mui/icons-material/AddTask';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


import ProfilePage from './MyProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// ✅ Navigation with dropdown for tasks
const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'tasks',
    title: 'Tasks',
    icon: <AddTaskIcon />,
    children: [
      { segment: 'today', title: 'Today Tasks' },
      { segment: 'pending', title: 'Pending Tasks' },
      { segment: 'processing', title: 'In Processing' },
      { segment: 'completed', title: 'Completed Tasks' },
      { segment: 'rejected', title: 'Rejected Tasks' },
    ],
  },
   {
    segment: 'profile',
    title: 'Profile',
    icon: <AccountCircleIcon />,
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

// ✅ Reusable Task Table with filter
function TaskTable({
  filter,
  title,
  color,
}: {
  filter: string;
  title: string;
  color: any;
}) {
  const [allTasks, setAllTasks] = useState<any[]>([]);
  const [userTasks, setUserTasks] = useState<any[]>([]);


  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/api/changeTaskStatus/${id}`, {
        newStatus,
      });
if (newStatus === 'Completed') {
        toast.success('Task marked as Completed!');
      }else if (newStatus === 'Rejected') {
        toast.error('Task marked as Rejected!');
      }else if (newStatus === 'In Processing') {
        toast.info('Task marked as In Processing!');
      }else if (newStatus === 'Pending') {
        toast.warn('Task marked as Pending!');
      }

      setUserTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // ✅ API get tasks
  const fetchtasks = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/getAllTasks'
      );
      setAllTasks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchtasks();
  }, []);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const userTasksfilter = allTasks.filter(
      (task) => task.member === user.name
    );
    setUserTasks(userTasksfilter);
  }, [allTasks, user.name]);

  // ✅ Final filtered tasks
  const filteredTasks = userTasks.filter((task) => {
    if (filter === 'Today') {
      const taskDate = new Date(task.dateTime).toDateString();
      const today = new Date().toDateString();
      return taskDate === today;
    } else {
      return task.status.toLowerCase() === filter.toLowerCase();
    }
  });


  return (
    
    <>
      <ToastContainer position="top-center" autoClose={1000} />
    
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" color={color} gutterBottom textAlign="center">
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Assigned Employee</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Due Date</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((userTask) => (
                <TableRow key={userTask._id}>
                  <TableCell>{userTask.member}</TableCell>
                  <TableCell>{userTask.taskdescription}</TableCell>
                  <TableCell>{userTask.status}</TableCell>
                  <TableCell>{userTask.dateTime}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        color="warning"
                        onClick={() =>
                          handleUpdateStatus(userTask._id, 'Pending')
                        }
                      >
                        Pending
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() =>
                          handleUpdateStatus(userTask._id, 'Completed')
                    
                        }
                      >
                        Complete
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="info"
                        onClick={() =>
                          handleUpdateStatus(userTask._id, 'In Processing')
                        }
                      >
                        Processing
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleUpdateStatus(userTask._id, 'Rejected')
                        }
                      >
                        Reject
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                  No tasks available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box></>
  );
}

function DemoPageContent({ pathname }: { pathname: string }) {
    const navigate = useNavigate();

  const logOutEmployee = ()=>{
               localStorage.removeItem('token');
              localStorage.removeItem('user');
              localStorage.removeItem('role');
              toast.warning("Logged out successfully!");
         setTimeout(() => {
           navigate('/');
         }, 2000);
  }
  switch (pathname) {
    case '/dashboard':
      return (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h4">Welcome, Employee</Typography>
          <Typography variant="body1">
            This is your Employee dashboard.
          </Typography>
        </Box>
      );

    case '/tasks/today':
      return <TaskTable title="Today’s Tasks" filter="Today" color="primary" />;

    case '/tasks/pending':
      return <TaskTable title="Pending Tasks" filter="Pending" color="warning" />;

    case '/tasks/processing':
      return (
        <TaskTable
          title="Tasks In Processing"
          filter="In Processing"
          color="info"
          
        />
      );

    case '/tasks/completed':
      return (
        <TaskTable
          title="Completed Tasks"
          filter="Completed"
          color="success"
        />
      );

    case '/tasks/rejected':
      return (
        <TaskTable title="Rejected Tasks" filter="Rejected" color="error" />
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
            Thank you for using the Employee Panel. Please log in again to
            continue.
          </Typography>



          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            onClick={logOutEmployee}
          >
            Go to Login
          </button> 
        </Box>
      );
   case '/profile':
      return (
       <ProfilePage/>
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

  const getuser = JSON.parse(localStorage.getItem('user') || '{}');
  console.log(getuser.name)


  return (
   <>
   <ToastContainer position="top-center" autoClose={3000} />
    <DemoProvider window={demoWindow}>
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: (
            // <ProfileMenu name={getuser.name} />
             <Avatar alt={getuser.name} sx={{ fontSize: '2rem', paddingBottom: '0.2rem' }} src="/static/images/avatar/2.jpg" />
          ),
          title: 'Employee Panel',
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
