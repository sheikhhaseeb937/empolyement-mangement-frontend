
import { Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardLayoutBranding from './components/AdminDashboard/Adminpanel'
import LoginPage from './components/auth pages/login'
import AdminLoginPage from './components/auth pages/AdminLogin'
import Employee from './components/employee/Employee'
import ProtectedRoute from './AuthGurad/AuthGurad'
import AdminGurad from './AuthGurad/AdminGurad'
import PageAccess from './AuthGurad/EmpolyeePageGurad'
import NotFoundPage from './AuthGurad/PagenotFound'
// import DashboardLayoutBranding from './components/employee/Employee'

function App() {


  return (
    <>
      <div>


        <Routes>

          {/* //AuthGurad */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />

          </Route>

{/* //PageAccess */}
          <Route element={<PageAccess />}>
            <Route path="/employeePage" element={<Employee />} />
          </Route>

{/* ///Admin page  */}
          <Route element={<AdminGurad />}>

            <Route path="/admin/dashboard" element={<DashboardLayoutBranding />} />

          </Route>

{/* ////PagenotFound */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>


      </div>
    </>
  )
}

export default App
