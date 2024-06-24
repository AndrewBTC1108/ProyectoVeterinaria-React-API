import React, { useState, useEffect } from "react";
import useAmorPorTi from "../../hooks/useAmorPorTi";
import InputError from "../InputError";
import { useAuth } from "../../hooks/useAuth"

export default function ModalPet({isEditing = false}) {
    const { handleCloseModalPet, createPet, updatePet, mascota, userId } = useAmorPorTi();
    const {user} = useAuth({})
    console.log(userId);
    // Errores
    const [errors, setErrors] = useState([]);
    // Información de la mascota
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [species, setSpecies] = useState("");
    const [customSpecies, setCustomSpecies] = useState("");
    const [breed, setBreed] = useState("");
    const [color, setColor] = useState("");
    const [sex, setSex] = useState("");
    // Lógica de cambio en el select de especie
    const handleSpeciesChange = (e) => {
    const selectedSpecies = e.target.value.toLowerCase();
        if (selectedSpecies === "otro") {
            setSpecies(selectedSpecies);
        } else {
            setSpecies(selectedSpecies);
            setCustomSpecies("");
        }
    };
    // Lógica de cambio en el input de especie personalizada
    const handleCustomSpeciesChange = (e) => {
        setCustomSpecies(e.target.value);
    };

    useEffect(() => {
        //tiene que haber una mascota y isEditing debe ser verdadero
        if (mascota && isEditing) {
          // Si hay información de la mascota, establece los estados iniciales
          setName(mascota.name);
          setBirthDate(mascota.birth_date);
          setBreed(mascota.breed);
          setColor(mascota.color);
          setSex(mascota.sex);
          // Verifica si el valor de currentPet.species está en la lista de opciones del select
          if (["canino", "felino"].includes(mascota.species)) {
            setSpecies(mascota.species);
            setCustomSpecies("");
          } else {
            setSpecies("otro");
            setCustomSpecies(mascota.species);
          }
        }
    }, [mascota, isEditing]);// cuando el estado de isEditing cambie y cuando cambie mascota igual
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedSpecies = species.toLowerCase() === "otro" ? customSpecies : species;

        // Lógica para determinar si es una nueva mascota o una actualización
        if (isEditing) {
            updatePet(mascota.id, setErrors, name, birthDate, selectedSpecies, breed, color, sex);
        } else {
            const id = user.admin ? userId : user.id;
            createPet({
                id,
                name,
                birth_date: birthDate,
                species: selectedSpecies,
                breed,
                color,
                sex,
                setErrors,
            });
        }
    };
    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={handleCloseModalPet}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            </div>
            <h1 className="text-center text-4xl font-black">{isEditing ? "Editar Mascota" : "Crear Mascota"}</h1>
            <div className="bg-white shadow-md rounded-md mt-10 max-w-3xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="name"
                        >Nombre:</label>
                        <input 
                            type="text" 
                            id="name"
                            value={name}
                            className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                            name="name"
                            placeholder="Nombre de la mascota"
                            onChange={e => setName(e.target.value)}
                        />
                        <InputError messages={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                            <label
                                className="text-slate-800"
                                htmlFor="birth_date"
                            >Nacimiento:</label>
                            <input 
                                type="date" 
                                id="birth_date"
                                value={birthDate}
                                className="mt-2 w-full p-3 bg-gray-50"
                                name="birth_date"
                                onChange={e => setBirthDate(e.target.value)}
                            />
                            <InputError messages={errors.birth_date} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="species"
                        >Especie:</label>
                        <select 
                            name="species" 
                            id="species"
                            value={species}
                            className="mt-2 w-full p-3 bg-gray-50"
                            onChange={handleSpeciesChange}
                        >
                            <option>--Seleccione la especie--</option>
                            <option value="canino">canino</option>
                            <option value="felino">felino</option>
                            <option value="otro">otro</option>
                        </select>
                        <InputError messages={errors.species} className="mt-2" />
                        {/* Input para la especie personalizada */}
                        {species.toLowerCase() === "otro" && (
                            <div className="mt-4 mb-4">
                                <label
                                    className="text-slate-800"
                                    htmlFor="customSpecies"
                                >Otra especie:</label>
                                <input
                                    type="text"
                                    id="customSpecies"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="customSpecies"
                                    value={customSpecies}
                                    placeholder="Digite la especie"
                                    onChange={handleCustomSpeciesChange}
                                />
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="breed"
                        >Raza:</label>
                        <input 
                            type="text" 
                            id="breed"
                            value={breed}
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="breed"
                            placeholder="Raza de la mascota"
                            onChange={e => setBreed(e.target.value)}
                        />
                        <InputError messages={errors.breed} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="color"
                        >Color:</label>
                        <input 
                            type="text" 
                            id="color"
                            value={color}
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="color"
                            placeholder="Color de la mascota"
                            onChange={e => setColor(e.target.value)}
                        />
                        <InputError messages={errors.color} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="sex"
                        >Sexo:</label>
                        <select 
                            name="species" 
                            id="species"
                            className="mt-2 w-full p-3 bg-gray-50"
                            value={sex}
                            onChange={e => setSex(e.target.value)}
                        >
                            <option value="">--Seleccione el sexo--</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                        <InputError messages={errors.sex} className="mt-2" />
                        {/* <InputError messages={errors.error} className="mt-2" /> */}
                    </div>
                    <input 
                        type="submit"
                        value={ isEditing ? 'Guardar Cambios' : 'Crear Mascota'}
                        className="bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3
                        uppercase font-bold cursor-pointer"
                    />
                </form>
            </div>
        </>
    )
}