import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import InputError from "../../components/InputError"
import { useState, useEffect } from 'react'
import AuthSessionStatus from '../../components/AuthSessionStatus'

export default function Login() {

    const location = useLocation();

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/'
    })

    const [emailOrCedula, setEmailOrCedula] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const resetParam = queryParams.get('reset');
    
        if (resetParam && resetParam.length > 0 && errors.length === 0) {
            setStatus(atob(resetParam));
        } else {
            setStatus(null);
        }
    }, [location.search, errors]);

    const submitForm = async e => {
        e.preventDefault()

        login({
            email_or_cedula : emailOrCedula,
            password,
            setErrors,
            setStatus
        })
    }
    return (
        <>
            {/* {Your password has been reset.} */}
            <AuthSessionStatus className="mb-4" status={status} />
            <h1 className="text-4xl font-black">Iniciar Sesión</h1>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form
                    onSubmit={submitForm}
                    noValidate
                >
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="email_or_cedula"
                        >Email o Cedula:</label>
                        <input 
                            type="text" 
                            id="email_or_cedula"
                            value={emailOrCedula}
                            className="mt-2 w-full p-3 bg-gray-50"
                            onChange={event => setEmailOrCedula(event.target.value)}
                            name="email_or_cedula"
                            placeholder="Tu Email o Cedula"
                        />

                        <InputError messages={errors.email_or_cedula} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <label
                            className="text-slate-800" 
                            htmlFor="password"
                        >Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            className="mt-2 w-full p-3 bg-gray-50"
                            onChange={event => setPassword(event.target.value)}
                            name="password"
                            placeholder="Tu Password" 
                        />
                        <InputError messages={errors.password} className="mt-2" />
                    </div>
                    <input 
                        type="submit"
                        value="Iniciar Sesión"
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>
            <nav className="mt-5 flex justify-between">
                <Link to="/auth/register">
                    ¿No tienes cuenta? Crea una
                </Link>
                <Link to="/auth/forgot-password">
                    ¿Olvidaste tu password?
                </Link>
            </nav>
        </>
    )
}
