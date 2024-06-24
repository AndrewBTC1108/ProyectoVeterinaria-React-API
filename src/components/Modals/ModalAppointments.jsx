import React, { useState, useEffect } from "react";
import useAmorPorTi from "../../hooks/useAmorPorTi";
import { fetcher } from "../../hooks/Fetcher";
import InputError from "../InputError";
import useSWR from "swr";
import { useAuth } from "../../hooks/useAuth"
export default function ModalAppointments({isEditing = false}) {
  const {user} = useAuth({})
  //destructuring
  const {handleCloseModalAppointment, appointment, createData, updateData, userId, handleSetUrl} = useAmorPorTi();
  useEffect(() => {
    //validar si el usuario es admin primero
    if (!user.admin) {
        handleSetUrl(`api/appointments`);
    } else {
        handleSetUrl(`api/pets?user_id=${userId}`);
    }
  }, [user, handleSetUrl]);
  // to get current Date ISOformat (yyyy-mm-dd)
  const today = new Date().toISOString().split('T')[0];
  const [errors, setErrors] = useState([]);
  // Estado para verificar si ha sido modificado
  const [isModified, setIsModified] = useState(false);

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    date: "",
    hour_id: "",
    pet_id: "",
    reason: ""
  });
  // to get availablePets using useSWR
  const { data: availablePetsData, error: availablePetsError } = useSWR(
    `api/availablePets?userId=${userId}`,fetcher
  );
  //to get available hours by Date
  const { data: hoursData, error: hoursError } = useSWR(
    formData.date ? `api/hours?date=${formData.date}` : null, fetcher, 
    {
      refreshInterval: 1000
    }
  );
  // use availablePetsData en the component
  let availablePets = availablePetsData ? availablePetsData.data : [];
  let availableHours = hoursData ? hoursData.data : [];
  // Efecto para inicializar datos cuando se edita una cita existente
  useEffect(() => {
    if (appointment && isEditing) {
      setFormData({
        date: appointment.date || "",
        hour_id: appointment.hour_id ? appointment.hour_id.id : "",
        pet_id: appointment.pet_id ? appointment.pet_id.id : "",
        reason: appointment.reason || ""
      });
      setIsModified(false); // Resetear estado modificado
    }
  }, [appointment, isEditing]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setIsModified(true);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, hour_id, pet_id, reason } = formData;
    if (isEditing) {
      const updatedData = {};
      for (const key in formData) {
        if (formData[key] !== appointment[key]) {
          updatedData[key] = formData[key];
        }
      }
      const success = await updateData({
        ...updatedData,
        date,
        setErrors,
        urlAx: `api/appointments/${appointment.id}`
      });
      if (success) handleCloseModalAppointment();
    } else {
      const id = user && user.admin ? userId : user.id;
      const success = await createData({
        date,
        pet_id,
        hour_id,
        reason,
        setErrors,
        urlAx: user.admin ? `api/appointments?user_id=${id}` : 'api/appointments'
      });
      if (success) handleCloseModalAppointment();
    }
  };
  return (
      <>
        <div className="flex justify-end">
            <button
                onClick={handleCloseModalAppointment}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </button>
        </div>
        <h1 className="text-center text-4xl font-black">{isEditing ? "Cambiar Consulta" : "Agendar Consulta"}</h1>
        {isEditing && (
          <div className="flex flex-col items-center">
            <p className="pt-4"><span className="font-black">Mascota:</span> {appointment.pet_id.name}</p>
            <p className="pt-4"><span className="font-black">Fecha de la consulta:</span> {appointment.date}</p>
            <p className="pt-4"><span className="font-black">Hora de la consulta:</span> {appointment.hour_id.hour}</p>
          </div>
        )}
        <div className="bg-white shadow-md rounded-md mt-10 max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="text-slate-800"
                htmlFor="date"
              >Fecha:</label>
              <input 
                type="date"
                id="date" 
                className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                value={formData.date}
                name="date"
                onChange={handleChange}
                min={today}
              />
              <InputError messages={errors.date} className="mt-2" />
            </div>
            <div className="mb-4">
              <label
                  className="text-slate-800"
                  htmlFor="hour_id"
                >Hora:</label>
                <select 
                  name="hour_id" 
                  id="hour_id"
                  value={formData.hour_id}
                  className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                  onChange={handleChange}
                >
                  <option>--Seleccione la hora--</option>
                  {availableHours.map(hourOption => (
                    <option 
                      key={hourOption.id} 
                      value={hourOption.id}
                    >{hourOption.hour}</option>
                  ))}
                </select>
                <InputError messages={errors.hour_id} className="mt-2" />
                <InputError messages={errors.error} className="mt-2" />
            </div>
            {!isEditing && (
            <div className="mb-4">
                <label 
                  htmlFor="pet_id"
                  className="text-slate-800"
                >Mascota:</label>
                <select 
                  name="pet_id" 
                  id="pet_id"
                  className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                  onChange={handleChange}
                >
                  <option>--Seleccione una mascota--</option>
                  {availablePets.map(pet => (
                    <option key={pet.id} value={pet.id}>{pet.name}</option>
                  ))}
                </select>
                <InputError messages={errors.pet_id} className="mt-2" />
            </div>
            )}
            <div className="mb-4">
              <label 
              className="text-slate-800"
                htmlFor="reason"
              >Motivo:</label>
              <input 
                type="text"
                id="reason"
                name="reason"
                value={formData.reason}
                className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                onChange={handleChange}
              />
              <InputError messages={errors.reason} className="mt-2" />
            </div>
            <input 
                type="submit"
                value={isEditing ? 'Guardar Cambios' : 'Agendar Consulta'}
                className={`bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg ${!isModified && isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isModified && isEditing}
            />
          </form>
        </div>
      </>
  )
}