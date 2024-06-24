import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
//en este componente pasamos dos funciones, una para editar las mascotas y la otra para borrarlas
export default function Pet({pets, modalPet, setPet, deletePets}) {
    let url;
    const {user} = useAuth({})
    const {name, sex} = pets
    const { handleClickModalPet } = modalPet;
    const {handleSetPet} = setPet
    const {deletePet} = deletePets
    let button;
    let button2;

    //to urls and buttons
    if(user.admin) {
        url = '/admin/userpet';
        button = (
            <button 
                onClick={() => {
                    handleSetPet(pets)
                    handleClickModalPet(true)
                }} 
                className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
            >Editar</button>
        );  
        button2 = (
            <button 
                onClick={() => deletePet(pets.id)} 
                className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded ml-2"
            >Eliminar</button>
        );
    } else if(user.doctor) {
        url = '/doctor/userpet';
    } else {
        url = '/userPet';
        button = (
            <button 
                onClick={() => {
                    handleSetPet(pets)
                    handleClickModalPet(true)
                }} 
                className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
            >Editar</button>
        );
        button2 = (
            <button 
                onClick={() => deletePet(pets.id)} 
                className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded ml-2"
            >Eliminar</button>
        );
    }
    return (
        <>
            <tr>
                <td className="py-2 px-4 border-b">{name}</td>
                <td className="py-2 px-4 border-b">{sex}</td>
                <td className="py-2 px-4 border-b">
                    {button}
                    <Link
                        to={url}
                    >
                        <button 
                            onClick={() => {
                                handleSetPet(pets)
                            }}
                            className="bg-yellow-500 hover:bg-yellow-800 text-white px-2 py-1 rounded ml-2"
                        >Info Mascota</button>
                    </Link>
                    {button2}
                </td>
            </tr>
        </>
    )
}
