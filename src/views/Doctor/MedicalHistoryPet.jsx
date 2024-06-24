import { useState } from "react";
import useAmorPorTi from "../../hooks/useAmorPorTi";
import InputError from "../../components/InputError";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function MedicalHistoryPet() {
    const navigate = useNavigate();
    const {mascota, appointment, createMedicalHistory} = useAmorPorTi();
    const [errors, setErrors] = useState([]);
    const [previous_treatments, setPrevious_treatments] = useState([]);
    const [surgical_procedures, setSurgical_procedures] = useState([]);
    const [reasonConsult, setReasonConsult] = useState('');
    const [observations, setObservations] = useState('');
    const [food, setFood ] = useState('');
    const [frequencyFood, setFrequencyFood] = useState('');
    const [nameTreatment, setNameTreatment] = useState('');
    const [dateTreatments, setDateTreatments] = useState('');
    const [nameSurgery, setNameSurgery] = useState('');
    const [dateSurgery, setDateSurgery] = useState('');
    console.log(previous_treatments);
    console.log(surgical_procedures);
    console.log(appointment.id)
    const handleClickPreviusTreatments = (e) => {
        e.preventDefault();
        let previusTreatments = {
            "pet_id": mascota.id,
            "name": nameTreatment,
            "date": dateTreatments
        };
        if(previusTreatments.pet_id && previusTreatments.date && previusTreatments.name){
            setPrevious_treatments([...previous_treatments, previusTreatments]);
        }
        setNameTreatment('');
        setDateTreatments('');
    }

    const handleClicksurgical_procedures = (e) => {
        e.preventDefault();
        let surgicalProcedures = {
            "pet_id": mascota.id,
            "name": nameSurgery,
            "date": dateSurgery
        };
        if(surgicalProcedures.pet_id  && surgicalProcedures.name && surgicalProcedures.date){
            setSurgical_procedures([...surgical_procedures, surgicalProcedures]);
        }
        setNameSurgery('');
        setDateSurgery('');
    }

    const handleRemoveItem = (array, setArray, index) => {
        const newArray = [...array];
        newArray.splice(index, 1);
        setArray(newArray);
    }

    const handleSubmitHistory = async (e) => {
        e.preventDefault();
        const pet_id = mascota.id;
        const appointment_id = appointment.id;
        //constant that is declared to store the value returned from the createMedicalHistory() function.
        /*
            await keyword is used to wait for the Promise that createMedicalHistory() returns to be resolved.
            Once the Promise is resolved, the resulting value is assigned to success(true).
        */
        const success = await createMedicalHistory(
            appointment_id,
            pet_id,
            reasonConsult,
            observations,
            food,
            frequencyFood,
            previous_treatments,
            surgical_procedures,
            setErrors
        );
        /*
            If success is true, it means that createMedicalHistory() was executed successfully and there were no errors. 
            In this case, it navigates to the '/doctor' page. If success is false, it means that there was some error in 
            createMedicalHistory(), so it does not navigate to the '/doctor' page.
        */
        if(success){
            navigate('/doctor');
        }
    }
    return (
        <>
            <Link
                to={'/doctor'}
            >
                <button
                className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                >Volver</button>
            </Link>
            <h1 className="mb-4 text-center text-4xl font-black">{mascota.name}</h1>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form
                    onSubmit={handleSubmitHistory}
                >
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="reasonConsult"
                        >Razon de la consulta:</label>
                        <input 
                            type="text" 
                            id="reasonConsult" 
                            name="reasonConsult" 
                            value={reasonConsult}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                            onChange={e => setReasonConsult(e.target.value)}
                        />
                        <InputError messages={errors.reasonConsult} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="observations"
                        >Observaciones:</label>
                        <input 
                            type="text" 
                            id="observations" 
                            name="observations" 
                            value={observations}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                            onChange={e => setObservations(e.target.value)}
                        />
                        <InputError messages={errors.observations} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="food"
                        >Alimento:</label>
                        <input 
                            type="text" 
                            id="food" 
                            name="food"
                            value={food} 
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                            onChange={e => setFood(e.target.value)}
                        />
                        <InputError messages={errors.food} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="frequencyFood"
                        >Frecuencia en el dia:</label>
                        <input 
                            type="number" 
                            id="frequencyFood" 
                            name="frequencyFood"
                            min={1}
                            value={frequencyFood}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                            onChange={e => setFrequencyFood(e.target.value)}
                        />
                        <InputError messages={errors.frequencyFood} className="mt-2" />
                    </div>
                    <input 
                        type="submit"
                        value={'Generar'}
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <h1 className="mb-4 text-center text-4xl font-black">Tratamientos anteriores(opcional)</h1>
                <form
                    onSubmit={handleClickPreviusTreatments}
                >
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="previous_treatments"
                        >Tratamiento anterior:</label>
                        <input 
                            type="text" 
                            id="previous_treatments" 
                            name="previous_treatments"
                            value={nameTreatment}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                            onChange={(e) => setNameTreatment(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="date"
                        >Fecha:</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date"
                            value={dateTreatments}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                            onChange={(e) => setDateTreatments(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit"
                        value={'Generar'}
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
                {previous_treatments.length > 0 && (
                    <div className="pt-4 flex gap-3">
                        {previous_treatments.map( treatment => (
                            <ul 
                                onClick={() => handleRemoveItem(previous_treatments, setPrevious_treatments, treatment)}
                                key={treatment}
                                className="list-outside text-center text-2xl font-black bg-customColor shadow-md rounded-md mt-10 px-5 py-5 cursor-pointer">
                                <li>{treatment.name}</li>
                                <li>{treatment.date}</li>
                            </ul>
                        ))}
                    </div>
                )}
            </div>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <h1 className="mb-4 text-center text-4xl font-black">Procedimientos quirurgicos(opcional)</h1>
                <form
                    onSubmit={handleClicksurgical_procedures}
                >
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="surgical_procedures"
                        >Procedimiento quirurgico:</label>
                        <input 
                            type="text" 
                            id="surgical_procedures" 
                            name="surgical_procedures"
                            value={nameSurgery}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                            onChange={(e) => setNameSurgery(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="date"
                        >Fecha:</label>
                        <input 
                            type="date" 
                            id="date" 
                            name="date"
                            value={dateSurgery}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                            onChange={(e) => setDateSurgery(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit"
                        value={'Generar'}
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
                {surgical_procedures.length > 0 && (
                    <div className="pt-4 flex gap-3">
                        {surgical_procedures.map( surgery => (
                            <ul 
                                onClick={() => handleRemoveItem(surgical_procedures, setSurgical_procedures, surgery)}
                                key={surgery}
                                className="list-outside text-center text-2xl font-black bg-customColor shadow-md rounded-md mt-10 px-5 py-5 cursor-pointer">
                                <li>{surgery.name}</li>
                                <li>{surgery.date}</li>
                            </ul>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
