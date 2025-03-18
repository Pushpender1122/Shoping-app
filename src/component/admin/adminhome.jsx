import React, { useEffect } from 'react'
import AdminPanel from './AdminDashBoard'
import { initializeAdminTour } from '../configs/tour'
const Adminhome = () => {
    useEffect(() => {
        initializeAdminTour().drive()
        return () => {
            initializeAdminTour().destroy()
        }
    })

    return (
        <div>
            <AdminPanel />
        </div>
    )
}

export default Adminhome
