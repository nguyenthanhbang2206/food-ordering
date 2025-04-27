import React from 'react'
import { Routes , Route} from 'react-router-dom'
import { Admin } from '../Admin/Admin'
import { CustomerRoutes } from '../../Routes/CustomerRoutes'

export const Routers = () => {
  return (
    <Routes>
        <Route path="/admin/restaurant/*" element={<Admin />} />
        <Route path="/*" element={<CustomerRoutes />} />
        
    </Routes>
  )
}
