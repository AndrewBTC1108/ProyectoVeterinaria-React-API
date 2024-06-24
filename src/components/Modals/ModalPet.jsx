import React, { useState, useEffect } from "react";
import useAmorPorTi from "../../hooks/useAmorPorTi";
import InputError from "../InputError";
import { useAuth } from "../../hooks/useAuth"

export default function ModalPet({isEditing = false}) {
    const { handleCloseModalPet, createData, updateData, mascota, userId, handleSetUrl } = useAmorPorTi();
    const { user } = useAuth({});
    useEffect(() => {
        //validar si el usuario es admin primero
        if (!user.admin) {
            handleSetUrl(`api/pets`);
        } else {
            handleSetUrl(`api/pets?user_id=${userId}`);
        }
    }, [user, handleSetUrl]);
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        name: '',
        birth_date: '',
        species: '',
        customSpecies: '',
        breed: '',
        color: '',
        sex: ''
    });

    // Estado para errores
    const [errors, setErrors] = useState([]);

    // Estado para verificar si ha sido modificado
    const [isModified, setIsModified] = useState(false);

    // Lógica para cambio en el select de especie
    const handleSpeciesChange = (e) => {
        const selectedSpecies = e.target.value.toLowerCase();
        setFormData(prevData => ({
            ...prevData,
            species: selectedSpecies,
            customSpecies: selectedSpecies === "otro" ? prevData.customSpecies : ''
        }));
        setIsModified(true);
    };

    // Lógica para cambio en el input de especie personalizada
    const handleCustomSpeciesChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            customSpecies: e.target.value
        }));
        setIsModified(true);
    };

    // Efecto para inicializar datos cuando se edita una mascota existente
    useEffect(() => {
        if (mascota && isEditing) {
            setFormData({
                name: mascota.name || '',
                birth_date: mascota.birth_date || '',
                species: ["canino", "felino"].includes(mascota.species) ? mascota.species : 'otro',
                customSpecies: ["canino", "felino"].includes(mascota.species) ? '' : mascota.species,
                breed: mascota.breed || '',
                color: mascota.color || '',
                sex: mascota.sex || ''
            });
            setIsModified(false); // Resetear estado modificado
        }
    }, [mascota, isEditing]);

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
        const selectedSpecies = formData.species.toLowerCase() === "otro" ? formData.customSpecies : formData.species;

        if (isEditing) {
            const updatedData = {};
            for (const key in formData) {
                if (formData[key] !== mascota[key]) {
                    updatedData[key] = formData[key];
                }
            }
            const success = await updateData({
                ...updatedData,
                setErrors,
                urlAx:`api/pets/${mascota.id}`
            });
            if (success) handleCloseModalPet();
        } else {
            const id = user.admin ? userId : user.id; 
            const success = await createData({
                ...formData,
                species: selectedSpecies,
                setErrors,
                urlAx: user.admin ? `api/pets?user_id=${id}` : 'api/pets'
            });
            if (success) handleCloseModalPet();
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
                            value={formData.name}
                            className="mt-2 w-full p-3 bg-gray-50 border border-black rounded-lg"
                            name="name"
                            placeholder="Nombre de la mascota"
                            onChange={handleChange}
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
                                value={formData.birth_date}
                                className="mt-2 w-full p-3 bg-gray-50"
                                name="birth_date"
                                onChange={handleChange}
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
                            value={formData.species}
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
                        {formData.species.toLowerCase() === "otro" && (
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
                                    value={formData.customSpecies}
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
                            value={formData.breed}
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="breed"
                            placeholder="Raza de la mascota"
                            onChange={handleChange}
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
                            value={formData.color}
                            className="mt-2 w-full p-3 bg-gray-50"
                            name="color"
                            placeholder="Color de la mascota"
                            onChange={handleChange}
                        />
                        <InputError messages={errors.color} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label
                            className="text-slate-800"
                            htmlFor="sex"
                        >Sexo:</label>
                        <select 
                            name="sex" 
                            id="sex"
                            className="mt-2 w-full p-3 bg-gray-50"
                            value={formData.sex}
                            onChange={handleChange}
                        >
                            <option>--Seleccione el sexo--</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                        <InputError messages={errors.sex} className="mt-2" />
                        {/* <InputError messages={errors.error} className="mt-2" /> */}
                    </div>
                    <input 
                        type="submit"
                        value={ isEditing ? 'Guardar Cambios' : 'Crear Mascota'}
                        className={`bg-customColor hover:bg-customColorShadow text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer ${!isModified && isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isModified && isEditing}
                    />
                </form>
            </div>
        </>
    )
}