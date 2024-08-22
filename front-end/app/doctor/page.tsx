'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import Image from 'next/image';
import SettingsDialog from '@/components/ui/SettingsDialog';
import EditDoctorDialog from '@/components/ui/EditDoctorDialog';
import { getAllAppointmentForDoctor, getAllAppointmentTodayForDoctor } from '@/lib/actions/appointment';
import { Appointment } from '@/types/appwrite.types';
import { DataTable } from '@/components/ui/table/DataTable';
import { columnsAppointmentDoctorPage } from '@/components/ui/table/columns';
const DoctorPage = () => {
    const router = useRouter()
    const [isOpenSettings,setIsOpenSettings] = useState(false)
    const [isOpenEdit,setIsOpenEdit] = useState(false)
    const [appointment, setAppointment] = useState()
    const [loading, setLoading] = useState<boolean>(true);
    const [appointmentToday,setAppointmentToday] = useState<Array<any>>()
    let currentDoctor:any;
        const user = Cookies.get('doctor')
        if (user) {
            currentDoctor=JSON.parse(user)
        } else {
            router.push('/login')
        }
    console.log(currentDoctor);
    useEffect(() =>{
        const loadData = async () =>{
            setAppointment ( await getAllAppointmentForDoctor(currentDoctor.id))
            setAppointmentToday(await getAllAppointmentTodayForDoctor(currentDoctor.id))
        }
        loadData()
        const id = setTimeout(() =>{
            setLoading(false)
        },3000)
        return () => clearTimeout(id)
    },[])
    console.log("loading ", loading);
  return (
    <div className='container'>
        <header className='admin-header mt-6 flex'>
            <Image
              src={currentDoctor?.avatar}
              height={1000}
              width={1000}
              alt="doctor"
              className="max-w-[200px] max-h-[200px] object-cover border-dashed border-2 rounded-full"
            />
            <div className='information flex flex-col flex-1 ml-10 gap-3'>
                <div className='top flex items-center justify-between'>
                    <h1 className='text-2xl'>{currentDoctor?.name}</h1>
                    <div className='flex gap-10 items-center'>
                        <span onClick={()=>setIsOpenEdit(true)} className='py-2 px-10 bg-green-500 rounded-sm'>Edit Profile</span>
                        <span>
                            <Image
                            src='/assets/icons/settings.svg'
                            height={24}
                            width={24}
                            alt="settings"
                            className='cursor-pointer'
                            onClick={()=>setIsOpenSettings(true)}
                            />
                        </span>
                    </div>
                    </div>
                <h1>Department: <span className='text-green-500 capitalize'>{currentDoctor?.department}</span></h1>
                <div className='bottom'>
                    <h1><span className='text-green-500 mr-1'>{appointmentToday ? appointmentToday?.length :  0}</span> schedule today</h1>
                </div>
            </div>
        </header>
        <section>
            {
            loading ? <div className='w-full py-60 flex justify-center'>
                <Image
                    src='/assets/gifs/loading.gif'
                    height={80}
                    width={80}
                    alt='icon'
                />
            </div>: 
            <div className='mt-20'>
                <DataTable columns={columnsAppointmentDoctorPage} data={appointment} />
            </div>

            }
        </section>
        {isOpenSettings && <SettingsDialog/>}
        {isOpenEdit && <EditDoctorDialog doctor={currentDoctor}/>}
    </div>
  )
}

export default DoctorPage