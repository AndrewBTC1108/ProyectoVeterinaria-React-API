import { Link } from "react-router-dom";
import useAmorPorTi from "../hooks/useAmorPorTi";
import MedicalHistoriePet from "../components/MedicalPetData/MedicalHistoriePet";
import PreviusTreatments from "../components/MedicalPetData/PreviusTreatments";
import SurgicalProcedures from "../components/MedicalPetData/SurgicalProcedures";
import { fetcher } from "../hooks/Fetcher";
import {useAuth} from "../hooks/useAuth";
import useSWR from "swr";
export default function UserPet() {
    let url;
    const {user} = useAuth({}); 
    const {mascota} = useAmorPorTi();
    const {name, birth_date, species, breed, sex, color} = mascota;
    let medicalHistoriesPet;
    let previous_treatments;
    let surgical_procedures;

    const { data: medicalPetData, error: medicalHistoriesPetDataError } = useSWR(
        `api/medicalHistories?pet_id=${mascota.id}`, fetcher
    )
    medicalHistoriesPet = medicalPetData ? medicalPetData.medicalHistoriesPet : [];
    previous_treatments = medicalPetData ? medicalPetData.previous_treatments : [];
    surgical_procedures = medicalPetData ? medicalPetData.surgical_procedures : [];

    //validate if the user is admin o doctor to show a button
    if(user.doctor) {
        url = '/doctor/petsUser';
    }else if(user.admin){
        url = '/admin/petsUser';
    } else {
        url = '/'
    }
    return (
        <>
            <div
                className=''
            >
                <Link
                    to={url}
                >
                    <button
                        className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
                    >Volver</button>
                </Link>
            </div>
            <h1 className="mb-4 text-center text-4xl font-black">Mascota: <span className="font-normal">{name}</span></h1>
            <div className="overflow-auto">
                <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-96 mb-12">
                    <thead>
                        <tr>
                            <th className="text-left py-2 px-4 border-b">Nombre</th>
                            <th className="text-left py-2 px-4 border-b">Sexo</th>
                            <th className="text-left py-2 px-4 border-b">Nacimiento</th>
                            <th className="text-left py-2 px-4 border-b">Especie</th>
                            <th className="text-left py-2 px-4 border-b">Raza</th>
                            <th className="text-left py-2 px-4 border-b">Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4">{name}</td>
                            <td className="py-2 px-4">{sex}</td>
                            <td className="py-2 px-4">{birth_date}</td>
                            <td className="py-2 px-4">{species}</td>
                            <td className="py-2 px-4">{breed}</td>
                            <td className="py-2 px-4">{color}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2 className="mb-4 text-center text-4xl font-black">HISTORIAS CLINICAS</h2>
            <div className="overflow-auto">
                <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-96 mb-12">
                    <thead>
                        <tr>
                            <th className="text-left py-2 px-4 border-b">Fecha</th>
                            <th className="text-left py-2 px-4 border-b">Motivo</th>
                            <th className="text-left py-2 px-4 border-b">Observaciones</th>
                            <th className="text-left py-2 px-4 border-b">Comida</th>
                            <th className="text-left py-2 px-4 border-b">Frecuencia al dia</th>
                            {user && (user.admin || user.doctor) ? <th className="text-left py-2 px-4 border-b">Acciones</th> : "" }
                        </tr>
                    </thead>
                    <tbody>
                        {medicalHistoriesPet.map(petHisories => (
                            <MedicalHistoriePet
                                key={petHisories.id}
                                petHistorie={petHisories}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex flex-col md:flex-row justify-around">
                <div className="flex flex-col">
                    <h2 className="text-center font-black">TRATAMIENTOS ANTERIORES</h2>
                    <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10">
                        <thead>
                            <tr>
                                <th className="text-left py-2 px-4 border-b">Nombre</th>
                                <th className="text-left py-2 px-4 border-b">Fecha</th>
                                {user && (user.admin || user.doctor) ? <th className="text-left py-2 px-4 border-b">Acciones</th> : "" }
                            </tr>
                        </thead>
                        <tbody>
                            {previous_treatments.map(treatment => (
                                <PreviusTreatments
                                    key={treatment.id}
                                    treatmentPet={treatment}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-center font-black">PROCEDIMIENTOS QUIRÚRGICOS</h2>
                    <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10">
                        <thead>
                            <tr>
                            <th className="text-left py-2 px-4 border-b">Nombre</th>
                            <th className="text-left py-2 px-4 border-b">Fecha</th>
                            {user && (user.admin || user.doctor) ? <th className="text-left py-2 px-4 border-b">Acciones</th> : "" }
                            </tr>
                        </thead>
                        <tbody>
                            {surgical_procedures.map(surgeyP => (
                                <SurgicalProcedures
                                    key={surgeyP.id}
                                    surgicalPro={surgeyP}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
