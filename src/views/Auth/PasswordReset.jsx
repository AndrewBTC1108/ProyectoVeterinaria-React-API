import { useAuth } from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import InputError from "../../components/InputError"
import { useLocation } from "react-router-dom"
import AuthSessionStatus from '../../components/AuthSessionStatus'
export default function PasswordReset() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);

    const {resetPassword} = useAuth({middleware: 'guest'})

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = e => {
        e.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus
        })
    }


    useEffect(() =>{
        setEmail(searchParams.get('email'))
    },[searchParams.get('email')])
    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />
            <h1 className="text-4xl font-black">Nueva Password</h1>
            
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form
                    onSubmit={submitForm}
                    noValidate
                >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                        >Email:</label>
                        <input 
                            type="email" 
                            id="email"
                            value={email}
                            className="mt-2 w-full p-3 bg-gray-50"
                            onChange={event => setEmail(event.target.value)}
                            name="email"
                            placeholder="Tu Email"
                        />
                        <InputError messages={errors.email} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                        >Password:</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            className="mt-2 w-full p-3 bg-gray-50"
                            onChange={event => setPassword(event.target.value)}
                            name="password"
                            placeholder="Tu password"
                        />
                        <InputError messages={errors.password} className="mt-2"/>
                    </div>

                    <div className="mt-4">
                        <label 
                            htmlFor="passwordConfirmation"
                        >Confirm Password</label>

                        <input
                            id="passwordConfirmation"
                            type="password"
                            value={passwordConfirmation}
                            className="mt-2 w-full p-3 bg-gray-50"
                            onChange={event =>
                                setPasswordConfirmation(event.target.value)
                            }
                            required
                        />

                        <InputError
                            messages={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                    <input 
                        type="submit"
                        value="Cambiar Password"
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>
        </>
    )
}
