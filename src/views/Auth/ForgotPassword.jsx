import { Link } from "react-router-dom"
import InputError from "../../components/InputError"
import { useAuth } from "../../hooks/useAuth"
import { useState } from "react"
import AuthSessionStatus from '../../components/AuthSessionStatus'
export default function ForgotPassword() {

    const {forgotPassword} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/'
    })

    const [email_or_cedula, setEmail_or_cedula] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = e => {
        e.preventDefault()

        forgotPassword({ email_or_cedula, setErrors, setStatus })
    }
    return (
        <>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <h1 className="text-4xl font-black">Reestablecer Password</h1>
                <p className="my-4">¿Ha olvidado su password? No hay problema. Indíquenos su dirección de correo electrónico o su cedula
                    y le enviaremos un enlace para restablecer la password que le permitirá elegir una nueva.
                </p>
                {/*"We have emailed your password reset link."*/}

                <AuthSessionStatus className="mb-4" status={status} />
                
                <form
                    className="my-4"
                    onSubmit={submitForm}
                    noValidate
                >
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="email_or_cedula"
                        > Email o Cedula:</label>
                        <input
                            type="text"
                            id="email_or_cedula"
                            value={email_or_cedula}
                            className="mt-2 w-full p-3 bg-gray-50"
                            onChange={ e => setEmail_or_cedula(e.target.value)}
                            name="email_or_cedula"
                            placeholder="Tu Email o Cedula"
                        />
                        <InputError messages={errors.email_or_cedula} className="mt-2" />
                    </div>
                    <input
                        type="submit"
                        value="Enviar Instrucciones"
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
                <nav className="mt-5 flex justify-between">
                    <Link to="/auth/login">
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                    <Link to="/auth/register">
                        ¿No tienes cuenta? Crea una
                    </Link>
                </nav>
            </div>
        </>
    )
}
