'use  client'

import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Button } from './../../../components/ui/button'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

const NavbarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.startsWith('/learning/teacher')
    const isStudentPage = pathname?.startsWith('/learning/chapter')

    return (
        <div className='ml-auto flex gap-x-2'>
            {isTeacherPage || isStudentPage ? (
                <Link href='/learning'>
                    <Button size='sm' variant='ghost'>
                        <LogOut />
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href="/learning/teacher/courses">
                    <Button size='sm' variant='ghost'>
                        Teacher Mode
                    </Button>
                </Link>
            )}
            <UserButton afterSignOutUrl='/' />
        </div>
    )
}

export default NavbarRoutes