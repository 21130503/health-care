import PatientReview from '@/components/ui/review/PatientReview'
import { getPatientById } from '@/lib/actions/patient.action'
import Image from 'next/image'
import React from 'react'

const ViewPatient = async({params: {id}} : SearchParamProps) => {
    const {patient} = await getPatientById(id)
  return (
    <div className="flex h-screen max-h-screen">

   <section className="remove-scrollbar container my-auto">
     <div className="sub-container max-w-[800px]">
       <Image
         src= '/assets/icons/logo-full.svg'
         height={1000}
         width={1000}
         alt="patient"
         className="mb-12 h-10 w-fit"
         />

         <PatientReview patient={patient} />
         <div className="text-14-regular justify-between mt-20 flex">
             <p className="justify-items-end text-dark-600 xl:text-left">
             © 2024 CarePulse
             </p>
         </div>

     </div>
   </section>
   <Image
     src="/assets/images/appointment-img.png"
     height={1000}
     width={1000}
     alt="patient"
     className="side-img max-w-[30%]"
   />
 </div>
  )
}

export default ViewPatient