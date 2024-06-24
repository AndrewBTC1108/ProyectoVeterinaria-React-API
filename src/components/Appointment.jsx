import { Link } from "react-router-dom";
import {useAuth} from "../hooks/useAuth"
export default function Appointment({appointment, modalAppointment, setAppointment, deleteApp, setPet, setUrl}) {
    const {user} = useAuth({});
    // Destructuring del objeto appointment con valores por defecto
    const {
        id,
        pet_id: { name: petName } = {},  // Destructuring con valor por defecto
        date,
        hour_id: { hour } = {},  // Destructuring con valor por defecto
        user_id: { name: userName } = {}  // Destructuring con valor por defecto
    } = appointment;
    const {handleClickModalAppointment} = modalAppointment
    const {deleteData} = deleteApp
    const {handleSetAppointment} = setAppointment
    const {handleSetPet} = setPet
    const {url} = setUrl;
    let button;
    let button2;

    //to delete
    const handleDelete = () => {
        deleteData({
            urlAx: `api/appointments/${id}`, 
            urlD: url
        });
    }  

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
                onClick={handleDelete} 
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
                <td className="text-left py-2 px-4 border-b">
                        {(user && user.admin) || user.doctor ? userName : petName}
                </td>
                <td className="text-left py-2 px-4 border-b">
                    {(user && user.admin) || user.doctor ? petName : date}
                </td>
                <td className="text-left py-2 px-4 border-b">
                    {hour}
                </td>
                <td className="text-left py-2 px-4 border-b">
                    {button}
                    {button2}
                </td>
            </tr>
        </>
    )
}
