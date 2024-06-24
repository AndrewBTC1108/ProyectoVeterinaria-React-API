import { useAuth } from "../../hooks/useAuth";
export default function MedicalHistoriePet({petHistorie}) {
    const {date, reasonConsult, observations, food, frequencyFood} = petHistorie;
    const {user} = useAuth({})
    return (
        <>
            <tr>
                <td className="py-2 px-4 border-b">{date}</td>
                <td className="py-2 px-4 border-b">{reasonConsult}</td>
                <td className="py-2 px-4 border-b">{observations}</td>
                <td className="py-2 px-4 border-b">{food}</td>
                <td className="py-2 px-4 border-b text-center">{frequencyFood}</td>
                {user && (user.admin || user.doctor) ?
                <td className="py-2 px-4 border-b">
                    <button
                        className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded ml-2"
                    >Eliminar</button>
                </td> : ""}
            </tr>  
        </>
    )
}
