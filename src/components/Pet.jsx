import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
//en este componente pasamos dos funciones, una para editar las mascotas y la otra para borrarlas
export default function Pet({pets, modalPet, setPet, deletePets, setUrl}) {
    let urlButton;
    const {user} = useAuth({})
    const {id, name, sex} = pets
    const { handleClickModalPet } = modalPet;
    const {handleSetPet} = setPet
    const {deleteData} = deletePets
    const {url} = setUrl;
    let button;
    let button2;

    //to delete
    const handleDelete = () => {
        deleteData({
            urlAx: `api/pets/${id}`, 
            urlD: url
        });
    }    
    //to urls and buttons
    if(user.admin) {
        urlButton = '/admin/userpet';
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
                onClick={handleDelete} 
                className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded ml-2"
            >Eliminar</button>
        );
    } else if(user.doctor) {
        urlButton = '/doctor/userpet';
    } else {
        urlButton = '/userPet';
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
                onClick={handleDelete} 
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
                        to={urlButton}
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
