"use client"
import Header from '@/components/header'
import { columns, columnsAppointment } from '@/components/ui/table/columns'
import { DataTableAppointment } from '@/components/ui/table/DataTableAppointment'
import { getAllAppointmentByUser } from '@/lib/actions/appointment'
import React from 'react'

const Records = async ({params: {userId}}: SearchParamProps) => {
    const appointments = await getAllAppointmentByUser(userId)
    console.log("appointments -hmm: ", appointments);
    
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <Header/>
        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>All your appointments 💕</h1>
                <p className='text-dark-700'>Please check the schedule for your convenience 🎗️</p>
            </section>
            <DataTableAppointment columns={columnsAppointment} data={appointments}/>
        </main>
    </div>
  )
}

export default Records