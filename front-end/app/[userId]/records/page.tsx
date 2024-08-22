"use client"
import Header from '@/components/header'
import { columns, columnsAppointment } from '@/components/ui/table/columns'
import { DataTableAppointment } from '@/components/ui/table/DataTableAppointment'
import { getAllAppointmentByUser } from '@/lib/actions/appointment'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Records = ({params: {userId}}: SearchParamProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [appointments, setAppointment] = useState();

  useEffect(() =>{
    const loadData = async () =>{
        setAppointment ( await getAllAppointmentByUser(userId))
    }
    loadData()
    const id = setTimeout(() =>{
        setLoading(false)
    },5000)
    return () => clearTimeout(id)
},[])

console.log("appointments ", appointments);
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <Header/>
        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>All your appointments 💕</h1>
                <p className='text-dark-700'>Please check the schedule for your convenience 🎗️</p>
            </section>
            {
            loading ? <div className='w-full py-60 flex justify-center'>
                <Image
                    src='/assets/gifs/success.gif'
                    height={80}
                    width={80}
                    alt='icon'
                />
            </div>: 
            <div className='mt-20'>
                <DataTableAppointment columns={columnsAppointment} data={appointments}/>
            </div>

            }
        </main>
    </div>
  )
}

export default Records