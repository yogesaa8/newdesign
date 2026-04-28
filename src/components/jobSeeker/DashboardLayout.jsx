import React from 'react'
import MainLayout from './layout/MainLayout'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
     return (
          <MainLayout>
               <Outlet />
          </MainLayout>
     )
}

export default DashboardLayout