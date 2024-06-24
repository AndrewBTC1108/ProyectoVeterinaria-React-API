import React, { useState, useEffect } from "react";
import useAmorPorTi from "../../hooks/useAmorPorTi";
import { fetcher } from "../../hooks/Fetcher";
import InputError from "../InputError";
import useSWR from "swr";
import { useAuth } from "../../hooks/useAuth"
export default function ModalAppointments({isEditing = false}) {
  let availablePets;
  let availableHours;
  const {user} = useAuth({})
  //destructuring
  const {handleCloseModalAppointment, appointment, createAppointment, updateAppointment, userId} = useAmorPorTi();
  // to get current Date ISOformat (yyyy-mm-dd)
  const today = new Date().toISOString().split('T')[0];
  //hooks
  const [date, setDate] = useState('') //to Dates
  const [hour, setHour] = useState('')
  const [pet, setPet] = useState('')
  const [reason, setReason] = useState('')
  const [errors, setErrors] = useState([]);
  // to get availablePets using useSWR
  const { data: availablePetsData, error: availablePetsError } = useSWR(
    `api/availablePets?userId=${userId}`,fetcher
  );
  //to get available hours by Date
  const { data: hoursData, error: hoursError } = useSWR(
    date ? `api/hours?date=${date}` : null, fetcher, 
    {
      refreshInterval: 1000
    }
  );
  // use availablePetsData en the component
  availablePets = availablePetsData ? availablePetsData.data : [];
  availableHours = hoursData ? hoursData.data : [];
  useEffect(() => {
    if(appointment && isEditing){
      setDate(appointment.date)
      setReason(appointment.reason)
    }
  }, [appointment, isEditing])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isEditing){
      updateAppointment(appointment.id, setErrors, date, hour, reason)
    }else {
      const id = user && user.admin ? userId : user.id;
      createAppointment({
        id,
        date,
        pet_id: pet,
        hour_id: hour,
        reason,
        setErrors
      })
    }
  }
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
                value={date}
                onChange={(e) => {
                  setDate(e.target.value)
                }}
                min={today}
              />
              <InputError messages={errors.date} className="mt-2" />
            </div>
            <div className="mb-4">
              <label
                  className="text-slate-800"
                  htmlFor="hour"
                >Hora:</label>
                <select 
                  name="hour" 
                  id="hour"
                  value={hour}
                  className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                  onChange={e => setHour(e.target.value)}
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
                  htmlFor="pet"
                  className="text-slate-800"
                >Mascota:</label>
                <select 
                  name="pet" 
                  id="pet"
                  className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                  onChange={e => setPet(e.target.value)}
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
                value={reason}
                className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                onChange={e => setReason(e.target.value)}
              />
              <InputError messages={errors.reason} className="mt-2" />
            </div>
            <input 
                type="submit"
                value={isEditing ? 'Guardar Cambios' : 'Agendar Consulta'}
                className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                uppercase font-bold cursor-pointer rounded-lg"
            />
          </form>
        </div>
      </>
  )
}