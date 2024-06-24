import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import InputError from "../../components/InputError"

export default function Register() {

    //para leer lo que ingresamos a los inputs
    const [cedula, setCedula] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [errors, setErrors] = useState([]) //para los erroes del formulario, se guardaran los mensajes

    const {register} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const submitForm = e => {
        e.preventDefault()

        register({
            cedula,
            name,
            last_name: lastName,
            phone_number: phoneNumber,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }

    return (
        <>
            <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
            <p>Crea tu Cuenta llenando el formulario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form 
                    onSubmit={submitForm}
                    noValidate
                >
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="cedula"
                        >Cedula:</label>
                        <input
                            type="text"
                            id="cedula"
                            value={cedula}
                            maxLength={10}
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="cedula"
                            placeholder="Tu Cedula"
                            onChange={event => setCedula(event.target.value)}
                        />

                        <InputError messages={errors.cedula} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="name"
                        >Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="name"
                            placeholder="Tu Nombre"
                            onChange={event => setName(event.target.value)}
                        />

                        <InputError messages={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="last_name"
                        >Apellido:</label>
                        <input
                            type="text"
                            id="last_name"
                            value={lastName}
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="last_name"
                            placeholder="Tu Apellido"
                            onChange={event => setLastName(event.target.value)}
                        />

                        <InputError messages={errors.last_name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="phone_number"
                        >Telefono:</label>
                        <input
                            type="text"
                            id="phone_number"
                            value={phoneNumber}
                            maxLength={10}
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="phone_number"
                            placeholder="Tu Telefono"
                            onChange={event => setPhoneNumber(event.target.value)}
                        />

                        <InputError messages={errors.phone_number} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="email"
                        >Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="email"
                            onChange={event => setEmail(event.target.value)}
                            placeholder="Tu Email"
                        />
                        <InputError messages={errors.email} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="password"
                        >Password:</label>
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
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="password_confirmation"
                        >Repetir Password:</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            value={passwordConfirmation}
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password_confirmation"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            placeholder="Repetir Password"
                        />
                        <InputError
                            messages={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Crear Cuenta"
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
                <nav className="mt-5 flex justify-between">
                    <Link to="/auth/login">
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Link>
                    <Link to="/auth/forgot-password">
                        ¿Olvidaste tu password?
                    </Link>
                </nav>
            </div>
        </>
    )
}
