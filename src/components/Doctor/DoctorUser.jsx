import { Link } from 'react-router-dom'
export default function DoctorUser({userd, handleUser, modalVac, modalDew}) {
    // eslint-disable-next-line react/prop-types
    const {cedula, name, last_name, email, phone_number} = userd;
    const {handlesetIdUser} = handleUser
    const {handleClickModalVaccine} = modalVac
    const {handleClickModalDeworming} = modalDew

    return (
        <>
            <tr>
                <td className="text-left py-2 px-4 border-b">{cedula}</td>
                <td className="text-left py-2 px-4 border-b">{name}</td>
                <td className="text-left py-2 px-4 border-b">{last_name}</td>
                <td className="text-left py-2 px-4 border-b">{email}</td>
                <td className="text-left py-2 px-4 border-b">{phone_number}</td>
                <td className="text-left py-2 px-4 border-b flex gap-1">
                    <Link
                        to={'/doctor/petsUser'}
                    >
                        <button
                            onClick={() => {
                                handlesetIdUser(userd.id)
                            }}
                            className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                        >Mascotas</button>
                    </Link>
                        <button
                            onClick={() => {
                                handlesetIdUser(userd.id)
                                handleClickModalVaccine()
                            }}
                            className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                        >Vacunas</button>
                        <button
                            onClick={() => {
                                handlesetIdUser(userd.id)
                                handleClickModalDeworming()
                            }}
                            className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                        >desparasitación</button>
                </td>
            </tr>
        </>
    )
}
