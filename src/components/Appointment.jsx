import { Link } from "react-router-dom";
import {useAuth} from "../hooks/useAuth"
export default function Appointment({appointment, modalAppointment, setAppointment, deleteApp, setPet}) {
    const {user} = useAuth({});
    const {pet_id, date, hour_id, user_id} = appointment
    const {handleClickModalAppointment} = modalAppointment
    const {deleteAppointment} = deleteApp
    const {handleSetAppointment} = setAppointment
    const {handleSetPet} = setPet
    let button;
    let button2;

    if (!user.doctor || user.admin) {
        button = (
            <button
                className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                onClick={() => {
                    handleSetAppointment(appointment)
                    handleClickModalAppointment(true)
                }}
            >Modificar</button>
        );

        button2 = (
            <button
                onClick={() => deleteAppointment(appointment.id)} 
                className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded ml-2"
            >Cancelar</button>
        );
    } else if (user && user.doctor) {
        button = (
            <Link
                to={'/doctor/medicalHistoryPet'}
            >
                <button 
                    className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                    onClick={() => {
                        handleSetAppointment(appointment);
                        handleSetPet(pet_id)
                    }}
                >Iniciar Consulta
                </button>
            </Link>
        );
    }
    
    return (
        <>
            <tr>
                <td className="text-left py-2 px-4 border-b">{(user && user.admin || user.doctor) ? user_id.name : pet_id.name}</td>
                <td className="text-left py-2 px-4 border-b">{(user && user.admin || user.doctor) ? pet_id.name : date }</td>
                <td className="text-left py-2 px-4 border-b">{hour_id.hour}</td>
                <td className="text-left py-2 px-4 border-b">
                    {button}
                    {button2}
                </td>
            </tr>
        </>
    )
}
