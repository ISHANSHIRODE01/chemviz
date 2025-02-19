'use client'
import React from 'react'
import SidebarItem from './SidebarItem'
import { Layout, Compass, List, BarChart } from 'lucide-react'
import { usePathname } from 'next/navigation'

const guestroutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/learning"
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/learning/search"
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/learning/teacher/courses" 
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/learning/teacher/analytics"
    }
]

const SidebarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.includes('/teacher')
    const routes = isTeacherPage ? teacherRoutes : guestroutes
    return (
        <div className='flex flex-col w-full'>
            {routes.map((route, index) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}

export default SidebarRoutes