import { HeaderAdmin } from '@/components/headerAdmin'
import { columnsDoctor } from '@/components/ui/table/columns'
import { DoctorDataTable } from '@/components/ui/table/DataTable'
import { getAllDoctor } from '@/lib/actions/doctor.action'
import React from 'react'

const DoctorManagement = async() => {
  const doctors = await getAllDoctor()
  console.log("doctors: ",doctors);
  
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <HeaderAdmin/>
      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Doctor Management 👨‍⚕️</h1>
          <p className='text-dark-700'>
            Here you can manage your doctors and their schedule.
          </p>
        </section>
        <DoctorDataTable columns={columnsDoctor} data={doctors}/>
      </main>
    </div>
  )
}

export default DoctorManagement