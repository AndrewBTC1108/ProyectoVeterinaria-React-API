import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
export default function AdminUser({userd, handleUser, modalAppointmentCreate}) {
    let url;
    let button;  
    const {user} = useAuth({})
    const {cedula, name, last_name, email, phone_number} = userd;
    const {handlesetIdUser} = handleUser
    const {handleClickModalAppointment} = modalAppointmentCreate;

    if (user.admin) {
        url = '/admin/petsUser';
        button = (
            <button
                className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded ml-2"
                onClick={() => {
                    handlesetIdUser(userd.id)
                    handleClickModalAppointment(false)
                }}
            >Agendar Consulta</button>
        );
    }

    return (
        <>
            <tr>
                <td className="text-left py-2 px-4 border-b">{cedula}</td>
                <td className="text-left py-2 px-4 border-b">{name}</td>
                <td className="text-left py-2 px-4 border-b">{last_name}</td>
                <td className="text-left py-2 px-4 border-b">{email}</td>
                <td className="text-left py-2 px-4 border-b">{phone_number}</td>
                <td className="text-left py-2 px-4 border-b flex">
                    <Link
                        to={url}
                    >
                        <button
                            onClick={() => {
                                handlesetIdUser(userd.id)
                            }}
                            className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                        >Mascotas</button>
                    </Link>
                    {button}
                </td>
            </tr>
        </>
    )
}
