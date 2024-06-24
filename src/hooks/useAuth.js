import { useEffect } from "react";
import useSWR from 'swr' //Hook de SWR (stale-while-revalidate) para realizar solicitudes de datos con caché automática.
import { useNavigate, useLocation } from "react-router-dom"; //Hook de React Router para navegar entre rutas.
import clienteAxios from '../lib/axios';
import {fetchUser} from "./authService"

//funcion arrow
//hook que se exporta, toma 2 argumentos como props, middleware y url
export const useAuth = ({ middleware, redirectIfAuthenticated}) => {

    let token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate() //para enviar al usuario a cualquier url
    const location = useLocation()//permite acceder al objeto de ubicación actual (location object).
    //interfaz del navegador que te permite trabajar con los parámetros de consulta de una URL.
    //Esto te permite acceder y manipular los parámetros de búsqueda de la URL de una manera fácil y estructurada.
    const searchParams = new URLSearchParams(location.search)

    const { data: user, error, mutate } = useSWR(
        token ? '/api/user' : null,
        () => fetchUser(token),
        {
            shouldRetryOnError: false,
        }
    );

    const csrf = async  () =>{ 
       await clienteAxios.get('/sanctum/csrf-cookie')
    }

    const register = async ({setErrors, ...props}) => {
        await csrf()

        setErrors([])

        try {
            await mutate()//forzar a que haga la accion de lvalidacion mas rapido
            const { data } = await clienteAxios.post('/api/register', props) //para obtener el token
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrors([])//reiniciar el arreglo de errores
            token = localStorage.getItem('AUTH_TOKEN')
        } catch (error) {
            console.log(error)
            setErrors(error.response?.data?.errors)
            // setErrores(Object.values(error?.response?.data?.message))
        }
    }

    const login = async ({setErrors, setStatus, ...props}) => {
        await csrf()

        setErrors([])
        setStatus(null)

        try {
            await mutate()//forzar a que haga la accion de lvalidacion mas rapido
            const { data } = await clienteAxios.post('/api/login', props) //para obtener el token
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrors([])//reiniciar el arreglo de errores
            token = localStorage.getItem('AUTH_TOKEN')
        } catch (error) {
            setErrors(error.response.data.errors)
        }
    }

    const forgotPassword = async ({ setErrors, setStatus, email_or_cedula }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        clienteAxios
            .post('/api/forgot-password', { email_or_cedula })
            .then(response => {
                console.log('Server Response:', response.data);
                setStatus(response.data.status)})
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        clienteAxios
            .post('/api/reset-password', { token: searchParams.get('token'), ...props })
            .then(response =>
                navigate('/auth/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const profileChange = async ({setErrors, setStatus, ...props}) => {
        await csrf()
        setErrors([])
        setStatus(null)
        //primero requerimos el token
        const token = localStorage.getItem('AUTH_TOKEN')
        clienteAxios.patch('/api/profile', props, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setStatus(response.data.status)
            // Después de completar el cambio de perfil, forzamos una recarga de los datos de usuario
            mutate();
        })
        .catch(error => {
            setErrors(error.response.data.errors)
        })
    }

    const passwordChange = async ({setErrors, setStatus, ...props}) => {
        await csrf()
        setErrors([])
        setStatus(null)
        //primero requerimos el token
        const token = localStorage.getItem('AUTH_TOKEN')
        clienteAxios.put('/api/password', props, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
        .then(response => setStatus(response.data.status))
        .catch(error => {
            setErrors(error.response.data.errors)
        })
    }

    const resendEmailVerification = ({ setStatus }) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        clienteAxios.post('/api/email/verification-notification', null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        await csrf()
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
            window.location.pathname = '/auth/login'
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(() => {
        console.log("Middleware:", middleware);
        // console.log("User:", user);
        // console.log("Error:", error);
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            navigate(redirectIfAuthenticated)
        if (
            window.location.pathname === '/auth/verify-email' &&
            user?.email_verified_at
        )
            navigate(redirectIfAuthenticated)
        if (middleware === 'auth') {
            if (!user) {
                navigate('/auth/login');
            } else if (!user?.email_verified_at) {
                // Aquí puedes cambiar la redirección según tus necesidades
                navigate('/auth/verify-email');  // Por ejemplo, redirige a la página de perfil
            }
        }
        if (middleware === 'guest' && user && user.admin) {
            navigate('/admin')
        }
        if(middleware === 'admin' && (!user || !user.admin)) {
            navigate('/')
        }
        if(middleware === 'auth' && user && user.admin) {
            navigate('/admin')
        }
        if(middleware === 'guest' && user && user.doctor){
            navigate('/doctor')
        }
        if(middleware === 'doctor' && (!user || !user.doctor)) {
            navigate('/')
        }
        if(middleware === 'auth' && user && user.doctor) {
            navigate('/doctor')
        }
        if (middleware === 'auth' && error) logout()
        // Verificar si hay un token en la URL
        if (window.location.pathname === '/auth/reset-password' && !searchParams.get('token'))
            // Si no hay token, redirigir a la página deseada
            navigate('/auth/login');
    }, [user, error])
    return {
        user,
        register,
        login,
        logout,
        resendEmailVerification,
        profileChange,
        passwordChange,
        forgotPassword,
        resetPassword
    }

}