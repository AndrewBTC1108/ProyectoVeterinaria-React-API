import {Outlet} from 'react-router-dom'
import ReactModal from "react-modal"
import { useAuth } from "../hooks/useAuth"
import AdminSidebar from '../components/Admin/AdminSidebar'
import { ToastContainer } from "react-toastify"
import useAmorPorTi from "../hooks/useAmorPorTi"
import { customStylesModal } from "../helpers/index"
import ModalAppointments from '../components/Modals/ModalAppointments'
import ModalPet from '../components/Modals/ModalPet'
//hojas de estilo css
import "react-toastify/dist/ReactToastify.css"

export default function AdminLayout() {
    useAuth({middleware: 'admin'})

    const {ModalAppointment, modalPet} = useAmorPorTi()
    const {customStyles} = customStylesModal()
    return (
        <>
            <div className='md:flex'>
                <AdminSidebar />
                
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
