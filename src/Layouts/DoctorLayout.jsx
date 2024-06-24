import {Outlet} from 'react-router-dom'
import ReactModal from "react-modal"
import { useAuth } from "../hooks/useAuth"
import DoctorSidebar from '../components/Doctor/DoctorSidebar'
import { ToastContainer } from "react-toastify"
import useAmorPorTi from "../hooks/useAmorPorTi"
import { customStylesModal } from "../helpers/index"
import ModalVaccines from '../components/Modals/ModalVaccines'
import ModalDewormings from '../components/Modals/ModalDewormings'
//hojas de estilo css
import "react-toastify/dist/ReactToastify.css"

export default function DoctorLayout() {
    useAuth({middleware: 'doctor'});

    const {ModalVaccine, ModalDeworming} = useAmorPorTi();
    const {customStyles} = customStylesModal();
    return (
        <>
            <div className='md:flex'>
                <DoctorSidebar />
                
                <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
                    <Outlet />
                </main>
            </div>

            <ReactModal isOpen={ModalVaccine.isOpen} style={customStyles}>
                <ModalVaccines/>
            </ReactModal>

            <ReactModal isOpen={ModalDeworming.isOpen} style={customStyles}>
                <ModalDewormings/>
            </ReactModal>
            
            <ToastContainer />
        </>
    )
}
