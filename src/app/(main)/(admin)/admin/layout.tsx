import React from 'react';
import AdminSideBar from './AdminSideBar';

export default function layout({ children }: { children: React.ReactNode }) {


    return (
        <div className='flex items-start'>
            <AdminSideBar className=' min-w-[50px] lg:min-w-[300px] border-r-2 h-screen sticky top-0 left-0' />
            <div id='hide-scrollbar' className=' overflow-auto flex-grow max-w-[calc(100%-50px)]  '>
                {children}
            </div>
        </div>
    )
}


