import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import InputError from "../components/InputError"
import AuthSessionStatus from '../components/AuthSessionStatus'
export default function Profile() {

    //para leer lo que ingresamos a los inputs
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const {passwordChange, profileChange, user} = useAuth({
        middleware: 'auth'
    })

    // const id = user?.id

    useEffect(() => {
        // Establecer el estado inicial cuando el componente se monta
        setName(user?.name || '');
        setLastName(user?.last_name || '');
        setPhoneNumber(user?.phone_number || '');
        setEmail(user?.email || '');
    }, [user]); // Solo vuelve a ejecutar el efecto si cambia 'user'

    const submitFormProfile = e => {
        e.preventDefault()

        profileChange({
            name,
            last_name: lastName,
            email,
            phone_number: phoneNumber,
            setStatus,
            setErrors
        })
    }

    const submitFormPasswordChange = e => {
        e.preventDefault()

        passwordChange({
            current_password: currentPassword,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus
        })
    }
    return (
        <div className="pt-10">
            <h1 className="text-center text-4xl font-black">Mi Perfil</h1>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10 max-w-2xl mx-auto">
                <h2 className="text-center text-2xl font-black">Información del perfil</h2>
                <p className="text-center">Actualice la información del perfil de su cuenta y su dirección de correo electrónico.</p>
                <AuthSessionStatus className="mb-4" status={status} />
                <form 
                    onSubmit={submitFormProfile}
                    noValidate
                >
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
                            onChange={e => setName(e.target.value)}
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
                            onChange={e => setLastName(e.target.value)}
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
                            onChange={e => setPhoneNumber(e.target.value)}
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
                            placeholder="Tu Email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <InputError messages={errors.email} className="mt-2" />
                    </div>
                    <input 
                        type="submit"
                        value="Guardar"
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10 max-w-2xl mx-auto">
                <h2 className="text-center text-2xl font-black">Actualizar contraseña</h2>
                <p className="text-center">Asegúrese de que su cuenta utiliza una contraseña larga y aleatoria para permanecer seguro.</p>
                <AuthSessionStatus className="mb-4" status={status} />
                <form 
                    onSubmit={submitFormPasswordChange}
                >
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="update_password_current_password"
                        >Password Actual:</label>
                        <input
                            type="password"
                            id="update_password_current_password"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="current_password"
                            placeholder="Tu Password Actual"
                            onChange={e => setCurrentPassword(e.target.value)}
                        />
                        <InputError messages={errors.current_password} className="mt-2"/>
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="update_password_password"
                        >Nuevo Password:</label>
                        <input
                            type="password"
                            id="update_password_password"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password"
                            placeholder="Tu Nuevo Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <InputError messages={errors.password} className="mt-2"/>
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="update_password_password_confirmation"
                        >Repetir Password:</label>
                        <input
                            type="password"
                            id="update_password_password_confirmation"
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="password_confirmation"
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                        <InputError messages={errors.password_confirmation} className="mt-2"/>
                    </div>
                    <input 
                        type="submit"
                        value="Guardar"
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>
        </div>
    )
}
