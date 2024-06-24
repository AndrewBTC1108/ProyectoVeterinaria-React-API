import useAmorPorTi from "../../hooks/useAmorPorTi";
import Appointment from "../../components/Appointment"
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../hooks/Fetcher";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";

export default function AppointmentsAdmin() {
    const {handleSetAppointment, handleClickModalAppointment, deleteData, handleSetPet, handleSetUrl, url} = useAmorPorTi()
    useEffect(() => {
        handleSetUrl('api/appointments');
    },[handleSetUrl]);
    // to get current Date ISOformat (yyyy-mm-dd)
    const today = new Date().toISOString().split('T')[0];
    //hooks
    const [date, setDate] = useState(today)

    //get the available appointments according to the selected date
    const {data: availableAppointmentsData, error: availableAppointmentsError, isLoading} = useSWR(
       date ? `api/appointments?date=${date}` : null, fetcher,
       {
        refreshInterval: 1000
       }
    );
    let availableAppointments = availableAppointmentsData ? availableAppointmentsData.data : [];
    const hasAppointments = Object.values(availableAppointments).length > 0;

    if(isLoading) return(<Spinner />)

    return (
        <div className="pt-10 text-center">
            <h1 className="mb-4 text-4xl font-black">Consultas Agendadas</h1>
            <div className="mb-4 flex flex-col">
                <label
                    className="text-slate-800 text-xl font-normal"
                    htmlFor="date"
                >Selecciona una Fecha</label>
                <input 
                    type="date"
                    id="date" 
                    className="m-auto mt-2 w-96 p-3 bg-gray-50"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value)
                    }}
                    min={today}
                />
            </div>

            <div>
                {hasAppointments ? (
                    <div className="pt-10">
                        <h1 className="mb-4 text-center text-4xl font-black">Consultas</h1>
                        <div className="overflow-auto">
                            <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left py-2 px-4 border-b">Usuario</th>
                                        <th className="text-left py-2 px-4 border-b">Mascota</th>
                                        <th className="text-left py-2 px-4 border-b">Hora</th>
                                        <th className="text-left py-2 px-4 border-b">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {availableAppointments.map(appointment => (
                                        <Appointment
                                            key={appointment.id}
                                            appointment={appointment}
                                            modalAppointment={{handleClickModalAppointment}}
                                            deleteApp={{deleteData}}
                                            setAppointment={{handleSetAppointment}}
                                            setPet={{handleSetPet}}
                                            setUrl={{url}}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ):(
                    <div>
                        <h1 className="mb-4 text-center text-4xl font-black">No hay Consultas</h1>
                    </div>
                )}
            </div>
        </div>
    )
}
