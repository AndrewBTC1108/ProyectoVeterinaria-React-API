import { Link } from 'react-router-dom';
import useAmorPorTi from "../../hooks/useAmorPorTi"
import Button from "../../components/Button"
import Pet from "../../components/Pet";
import useSWR from "swr";
import { useEffect } from 'react';
import Spinner from "../../components/Spinner";
import { useAuth } from '../../hooks/useAuth';
import {fetcher} from "../../hooks/Fetcher"
export default function PetsUser() {
  const {user} = useAuth({});
  let urlButton;
  let Pets;
  const {handleSetPet, deleteData, handleClickModalPet, userId, handleSetUrl, url} = useAmorPorTi()
  useEffect(() => {
      handleSetUrl(`api/pets?user_id=${userId}`);
  },[handleSetUrl]);
  //obtener mascotas
  const { data: availablePetsData, error: availablePetsError, isLoading } = useSWR(
      url, fetcher
  );
  Pets = availablePetsData ? availablePetsData.data : [];
  // Check if the pets object is empty
  // make sure that pets are defined before trying to access their properties we add a null check before the line
  const hasPets = Object.values(Pets).length > 0;

  //validate if the user is admin o doctor to show a button
    if(user.doctor) {
      urlButton = '/doctor/users';
    }else if(user.admin){
      urlButton = '/admin/usuarios';
    }

  if(isLoading) return(<Spinner />)
  
  return (
    <>
        <div
            className=''
        >
            <Link
                to={urlButton}
            >
            <button
                className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
            >Volver</button>
            </Link>
      </div>
      <h1 className="mb-4 text-center text-4xl font-black">Mascotas del usuario </h1>
      <div className="pt-10">
        {hasPets ? (
        // Renderizar el contenido del div si hay mascotas
        <div>
          <div className='overflow-auto'>
            <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
                  <thead>
                      <tr>
                        <th className="text-left py-2 px-4 border-b">Nombre</th>
                        <th className="text-left py-2 px-4 border-b">Sexo</th>
                        <th className="text-left py-2 px-4 border-b">Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                      {Pets.map(pet => (
                          <Pet
                              key={pet.id}
                              pets={pet}
                              modalPet={{handleClickModalPet}}
                              deletePets={{deleteData}}
                              setPet={{handleSetPet}}
                              setUrl={{url}}
                          />
                      ))}
                  </tbody>
            </table>
          </div>
          {!user.doctor && (
            <div className="mt-4 text-center">
              <Button onClick={() => handleClickModalPet(false)}>
                Nueva Mascota
              </Button>
            </div>
          )}
        </div>
        ) : (
        <div>
            <p className="mb-4 text-center font-medium">El usuario no tiene mascotas registradas.</p>
            {!user.doctor && (
              <div className="text-center">
                <Button onClick={() => handleClickModalPet(false)}>
                  Crear Mascota
                </Button>
              </div>
            )}
        </div>
        )}
      </div>
    </>
  )
}
