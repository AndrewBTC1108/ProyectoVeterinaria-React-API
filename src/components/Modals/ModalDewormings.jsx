import useAmorPorTi from "../../hooks/useAmorPorTi"
import { useState } from "react";
import useSWR from "swr";
import InputError from "../InputError";
import { fetcher } from "../../hooks/Fetcher";
export default function ModalDewormings() {
    const [pet_id, setPet_id] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState([]);
    const {handleCoseModalDeworming, userId, createDeworming} = useAmorPorTi();
    // to get Pets using useSWR
    const { data: Pets, error: availablePetsError } = useSWR(
        `/api/petsVD?userId=${userId}`,fetcher
    );
    // use availablePetsData en the component
    let availablePets = Pets ? Pets.data : [];
    const handleSubmit =  e =>{
        e.preventDefault();
        createDeworming({
            pet_id,
            name,
            date,
            setErrors
        });
    }
    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={handleCoseModalDeworming}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            </div>
            <h1 className="text-center text-4xl font-black">Registrar desparasitación</h1>
            <div className="bg-white shadow-md rounded-md mt-10 max-w-3xl mx-auto">
                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="pet"
                        >Mascota:</label>
                        <select 
                            name="pet" 
                            id="pet"
                            className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                            onChange={e => setPet_id(e.target.value)}
                            >
                            <option>--Seleccione la mascota--</option>
                            {availablePets.map(petOption => (
                                <option
                                    key={petOption.id}
                                    value={petOption.id}
                                >{petOption.name}</option>
                            ))}
                        </select>
                        <InputError messages={errors.pet_id} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="name"
                        >Nombre:</label>
                        <input 
                            name="name" 
                            id="name"
                            className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                            placeholder="Nombre del Producto"
                            onChange={e => setName(e.target.value)}
                        />
                        <InputError messages={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="date"
                        >Fecha:</label>
                        <input 
                            name="date" 
                            id="date"
                            type="date"
                            className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                            placeholder="Fecha de la desparasitación"
                            onChange={e => setDate(e.target.value)}
                        />
                        <InputError messages={errors.date} className="mt-2" />
                    </div>
                    <input 
                        type="submit"
                        value={'Registrar Desparasitación'}
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer rounded-lg"
                    />
                </form>
            </div>
        </>
    )
}
