'use client'
import React from 'react'
import MobileSidebar from './MobileSidebar'
import NavbarRoutes from './NavbarRoutes'

const Navbar = () => {
    return (
        <div className='p-4 border-b flex items-center h-full bg-white shadow-sm '>
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    )
}

export default Navbar