import React from 'react'
import { Route, Routes } from "react-router-dom";
import Dashboard from './component/Dashboard';


const AdminRouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/user" element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default AdminRouter