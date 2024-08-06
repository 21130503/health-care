'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Image from 'next/image';
const DoctorPage = () => {
    const router = useRouter()
    const [isOpenSettings,setIsOpenSettings] = useState(false)
    let currentDoctor;
        const user = Cookies.get('user')
        if (user) {
            currentDoctor=JSON.parse(user)
        } else {
            router.push('/')
        }
    console.log(currentDoctor);
    
  return (
    <div className='container'>
        <header className='admin-header mt-6 flex'>
            <Image
              src={currentDoctor.avatar}
              height={1000}
              width={1000}
              alt="doctor"
              className="max-w-[200px] max-h-[200px] object-cover border-dashed border-2 rounded-full"
            />
            <div className='information flex flex-col flex-1 ml-10 gap-3'>
                <div className='top flex items-center justify-between'>
                    <h1 className='text-2xl'>{currentDoctor.name}</h1>
                    <div className='flex gap-10 items-center'>
                        <span className='py-2 px-10 bg-green-500 rounded-sm'>Edit Profile</span>
                        <span>
                            <Image
                            src='/assets/icons/settings.svg'
                            height={24}
                            width={24}
                            alt="settings"
                            className='cursor-pointer'
                            />
                        </span>
                    </div>
                    </div>
                <h1>Department: <span className='text-green-500 capitalize'>{currentDoctor.department}</span></h1>
                <div className='bottom'>
                    <h1><span className='text-green-500 mr-1'>0</span> schedule</h1>
                </div>
            </div>
        </header>
        <section></section>
    </div>
  )
}

export default DoctorPage