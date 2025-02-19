import React from 'react'
import { Menu } from 'lucide-react'
import Sidebar from "./Sidebar"
import { Sheet, SheetContent, SheetTrigger } from "./../../../components/ui/sheet"

const MobileSidebar = () => {
    
    return (
        
        <Sheet className='md:hidden lg:hidden pr-4 hover:opacity-75 transition-all'>
            <SheetTrigger>
                <Menu className='md:hidden lg:hidden' />
            </SheetTrigger>
            <SheetContent side='left' className='p-0 bg-white'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar