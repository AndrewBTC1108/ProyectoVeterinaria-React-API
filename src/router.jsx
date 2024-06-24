import { createBrowserRouter } from "react-router-dom"
import AuthLayout from "./Layouts/AuthLayout";//auth
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import ForgotPassword from "./views/Auth/ForgotPassword";
import PasswordReset from "./views/Auth/PasswordReset";
import VerifyEmail from "./views/Auth/VerifyEmail";
import AdminLayout from "./Layouts/AdminLayout";//Admin
import AppointmentsAdmin from './views/Admin/AppointmentsAdmin'
import AdminUsers from './views/Admin/AdminUsers'
import PetsUser from "./views/Admin/PetsUser";
import DoctorLayout from "./Layouts/DoctorLayout";//Doctor
import DoctorUsers from "./views/Doctor/DoctorUsers";
import MedicalHistoryPet from "./views/Doctor/MedicalHistoryPet";
import Layout from "./Layouts/Layout";//users
import Pets from "./views/Pets";
import Appointments from './views/Appointments';
import Profile from "./views/Profile";
import UserPet from "./views/UserPet"
import NotFound from "./views/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Pets />
            },
            {
                path: '/consultas',
                element: <Appointments />
            },
            {
                path: '/perfil',
                element: <Profile />
            },
            {
                path: '/userPet',
                element: <UserPet />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            },
            {
                path: '/auth/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/auth/reset-password',
                element: <PasswordReset />
            },
            {
                path: '/auth/verify-email',
                element: <VerifyEmail />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <AppointmentsAdmin/>
            },
            {
                path: '/admin/usuarios',
                element: <AdminUsers />
            },
            {
                path: '/admin/petsUser',
                element: <PetsUser />
            },
            {
                path: '/admin/userpet',
                element: <UserPet />
            }
        ]
    },
    {
        path: '/doctor',
        element: <DoctorLayout />,
        children: [
            {
                index: true,
                element: <AppointmentsAdmin />
            },
            {
                path: '/doctor/users',
                element: <DoctorUsers />
            },
            {
                path: '/doctor/petsUser',
                element: <PetsUser />
            },
            {
                path: '/doctor/userpet',
                element: <UserPet />
            },
            {
                path: '/doctor/medicalHistoryPet',
                element: <MedicalHistoryPet/>
            }
            
        ]
    },
    {// Ruta para manejar errores 404
        path: '*',
        element: <NotFound />
    }
]);

export default router
