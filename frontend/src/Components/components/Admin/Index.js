import React from 'react'
import Dashboard from './Dashboard'
import { Route, Routes } from "react-router-dom";
import CDrawer from './CDrawer';
import { Box } from '@mui/material';
import RecordUser from './RecordUser';

const AdminRouter = () => {
    return (
        <div>
            {/* <CDrawer /> */}
            <Box >

                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                    <Route path='userdata' element={<RecordUser />} />
                </Routes>
            </Box>
        </div>
    )
}

export default AdminRouter