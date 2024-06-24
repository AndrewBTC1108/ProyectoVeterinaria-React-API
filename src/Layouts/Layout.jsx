import ReactModal from "react-modal"
import useAmorPorTi from "../hooks/useAmorPorTi"
import { useAuth } from "../hooks/useAuth"
import {Outlet} from 'react-router-dom'
import Sidebar from "../components/Sidebar"
import { ToastContainer } from "react-toastify"
import ModalPet from "../components/Modals/ModalPet"
import ModalAppointments from "../components/Modals/ModalAppointments"
import { customStylesModal } from "../helpers/index"
//hojas de estilo css
import "react-toastify/dist/ReactToastify.css"

ReactModal.setAppElement('#root')

export default function Layout() {

    useAuth({middleware: 'auth'})

    const {modalPet, ModalAppointment} = useAmorPorTi()
    const {customStyles} = customStylesModal()
    
    return (
        <>
            <div className='md:flex'>
                <Sidebar />
                
                <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
                    <Outlet />
                </main>
            </div>

            <ReactModal isOpen={modalPet.isOpen} style={customStyles}>
                <ModalPet
                    isEditing={modalPet.isEditing}
                />
            </ReactModal>

            <ReactModal isOpen={ModalAppointment.isOpen} style={customStyles}>
                <ModalAppointments
                    isEditing={ModalAppointment.isEditing}
                />
            </ReactModal>

            <ToastContainer />
        </>
    )
}
