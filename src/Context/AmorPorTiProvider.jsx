import { createContext, useState } from "react"
import {toast} from 'react-toastify' //contiene el evento y tipo de toast que se quiere usar
import clienteAxios from '../lib/axios'
import { mutate } from "swr";
const AmorPorTiContext = createContext();

const AmorPorTiProvider = ({children}) => {
    //hooks
    const [mascota, setMascota] = useState({})//empieza como un objeto vacio
    const [appointment, setAppointment] = useState({})
    const [userId, setUserId] = useState('')
    const [url, setUrl] = useState('');
    //to modals
    const [modalPet, setModalPet] = useState({ isOpen: false, isEditing: false});
    const [ModalAppointment, setModalAppointment] = useState({isOpen: false, isEditing: false});
    const [ModalVaccine, setModalVaccine] = useState({isOpen: false});
    const [ModalDeworming, setModalDeworming] = useState({isOpen: false});
    /***********************************************Area Mascotas*********************************************************************/
    //Crear 
    const createData = async ({ setErrors, urlAx, ...props }) => {
        //token
        const token = localStorage.getItem('AUTH_TOKEN');
        if (token) {
            try {
                const { data } = await clienteAxios.post(urlAx, { ...props }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                //vaciar el arreglo de errores
                setErrors([]);
                //url por si no es creado por medio de modal
                if (url) {
                    await mutate(url);
                    setUrl('');
                }
                //añadimos la notificacion de exito
                toast.success(data.message);
                return true;
            } catch (error) {
                setErrors(error.response.data.errors);
            }
        }
    };
    //Actualizar 
    const updateData = async ({ setErrors, urlAx, ...props}) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.patch(urlAx, {...props},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }   
                });
                //vaciar el arreglo de errores                   
                setErrors([])
                if (url) {
                    await mutate(url);
                    setUrl('');
                }
                //añadimos la notificacion de exito
                toast.success(data.message)
                return true
            } catch (error) {
                setErrors(error.response.data.errors);
            }
        }
    }
    //Eliminar
    const deleteData = async ({urlAx, urlD}) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token) {
            try {
                const {data} = await clienteAxios.delete(urlAx, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                await mutate(urlD);
                toast.success(data.message);
            } catch (error) {
                console.log(error)
            }
        }
    }
    /**********************************************************************************************************************************/
    /***********************************************Area Consultas*********************************************************************/
    const createAppointment = async ({setErrors, id = null, ...props}) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.post('api/appointments', {...props, user_id: id},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setErrors([])
                await mutate('api/appointments')
                handleCloseModalAppointment()
                toast.success(data.message)
            } catch (error) {
                if(error.response.data.errors.error){
                    handleCloseModalAppointment();
                    toast.error(error.response.data.errors.error[0])
                }else {
                    setErrors(error.response.data.errors);
                }
            }
        }
    }
    const updateAppointment = async (id, setErrors, date, hour, reason) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.patch(`api/appointments/${id}`,
                {
                    date,
                    hour_id: hour,
                    reason
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setErrors([])
                await mutate('api/appointments')
                //cerrar el modal
                handleCloseModalAppointment()
                toast.success(data.message)
            } catch (error) {
                if(error.response.data.errors.error){
                    handleCloseModalAppointment();
                    toast.error(error.response.data.errors.error[0])
                }else {
                    setErrors(error.response.data.errors);
                }
            }
        }
    }
    const deleteAppointment = async id => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token) {
            try {
                const {data} = await clienteAxios.delete(`api/appointments/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                await mutate('api/appointments')
                toast.success(data.message)
            } catch (error) {
                console.log(error)
            }
        }
    } 
    /**********************************************************************************************************************************/
    /***********************************************Area Historias Clinicas************************************************************/
    const createMedicalHistory = async (appointment_id, pet_id, reasonConsult, observations, food, frequencyFood, previous_treatments, surgical_procedures, setErrors) =>{
        if(localStorage.getItem('AUTH_TOKEN')){
            try {
              const {data} = await clienteAxios.post('api/medicalHistories', 
              {
                appointment_id,
                pet_id,
                reasonConsult,
                observations,
                food,
                frequencyFood,
                previous_treatments,
                surgical_procedures
              },
              {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
                }
              })
              setErrors([])
              toast.success(data.message)
              return true; // Returns true if the creation of the medical history was successful.
            } catch (error) {
                if(error.response.data.errors.error){
                    toast.error(error.response.data.errors.error[0])
                }else {
                    setErrors(error.response.data.errors);
                }
            }
        }
    }
    const createVaccine = async ({setErrors, ...props}) => {
        if(localStorage.getItem('AUTH_TOKEN')){
            try {
                const {data} = await clienteAxios.post('api/petsVD/vaccine', props,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
                }
            });
            setErrors([])
            handleCloseModalVaccine();
            toast.success(data.message)
            } catch (error) {
                setErrors(error.response.data.errors);
            }
        }
    }
    const createDeworming = async ({setErrors, ...props}) => {
        if(localStorage.getItem('AUTH_TOKEN')){
            try {
                const {data} = await clienteAxios.post('api/petsVD/deworming', props,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
                }
            });
            setErrors([])
            handleCoseModalDeworming();
            toast.success(data.message)
            } catch (error) {
                setErrors(error.response.data.errors);
            }
        }
    }
    /**********************************************************************************************************************************/
    const handleSetUrl = url => {
        setUrl(url);
    }
    //arrow function para la edicion de mascotas
    const handleSetPet = mascota => {
        setMascota(mascota)
    }
    //arrow function para la edicion de citas
    const handleSetAppointment = appointment => {
        setAppointment(appointment)
    }
    //arrow function to get user id
    const handlesetIdUser = id => {
        setUserId(id)
    }
    /************************************************************************/
    //Para abrir el modal de mascotas
    const handleClickModalPet = (isEditing) => {
        setModalPet({ isOpen: true, isEditing });
    };
    //para cerrar el Modal de Mascotas
    const handleCloseModalPet = () => {
        setModalPet({ isOpen: false, isEditing: false});
    };
    /************************************************************************/
    //Para abrir el modal de citas
    const handleClickModalAppointment = (isEditing) => {
        setModalAppointment({ isOpen: true, isEditing });
    };
    const handleCloseModalAppointment = () => {
        setModalAppointment({ isOpen: false, isEditing: false});
    };
    /************************************************************************/
    //modal vaccines
    const handleClickModalVaccine = () => {
        setModalVaccine({isOpen: true});
    }
    const handleCloseModalVaccine = () => {
        setModalVaccine({isOpen: false});
    }
    /************************************************************************/
    //modal Dewormings
    const handleClickModalDeworming = () => {
        setModalDeworming({isOpen: true});
    }
    const handleCoseModalDeworming = () => {
        setModalDeworming({isOpen: false});
    }
    
    return (
        <AmorPorTiContext.Provider
            value={{
                handleSetUrl,
                url,
                mascota,
                modalPet,
                handleClickModalPet,
                handleCloseModalPet,
                handlesetIdUser,
                userId,
                createData,
                updateData,
                deleteData,
                handleSetPet,
                createAppointment,
                updateAppointment,
                deleteAppointment,
                appointment,
                handleSetAppointment,
                handleClickModalAppointment,
                handleCloseModalAppointment,
                ModalAppointment,
                createMedicalHistory,
                handleClickModalVaccine,
                handleCloseModalVaccine,
                ModalVaccine,
                handleClickModalDeworming,
                handleCoseModalDeworming,
                ModalDeworming,
                createVaccine,
                createDeworming
            }}
        >{children}</AmorPorTiContext.Provider>
    )
}
export {
    AmorPorTiProvider
}
export default AmorPorTiContext