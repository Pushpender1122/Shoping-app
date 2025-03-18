import React, { useEffect, useState } from 'react'
import AdminPanel from './AdminDashBoard'
import { initializeAdminTour } from '../configs/tour'
const Adminhome = () => {
    const [pathList, setPathList] = useState(null);
    useEffect(() => {
        initializeAdminTour().drive()
        document.addEventListener('driver-move-next', () => {
            if (initializeAdminTour) {
                setPathList('admin-panel')
                initializeAdminTour().moveNext();
            }
        });
        document.addEventListener('driver-move-prev', () => {
            if (initializeAdminTour) {
                setPathList(null)
                initializeAdminTour().movePrevious();
            }
        });
        return () => {
            initializeAdminTour().destroy()
        }
    }, [])
    return (
        <div>
            <AdminPanel pathList={pathList} setPathList={setPathList} />
        </div>
    )
}

export default Adminhome
