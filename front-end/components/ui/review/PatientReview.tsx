"use client"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { TemporaryDoctor } from "@/types/appwrite.types"
import Image from "next/image"
import { formatDateTime } from "@/lib/utils"
import { Button } from "../button"
import { handleTemporary } from "@/lib/actions/temporary"
interface Props {
  patient: any;
}
const PatientReview = ({patient}: Props)=> {
  const router = useRouter()
  const [isLoading,setIsLoading] =useState(false)
  return (
        <div>
          <section className="mb-12 space-y-4">
          <h1 className="header">Overview Patient 📑</h1>
              <p className="text-dark-700">Check the doctor's eligibility.</p>
          </section>
          <div className="flex flex-col gap-6 xl:flex-row">
            <div>
              <label>Email</label>
              <div className='mt-2 flex rounded-md border-x-dark-500 bg-dark-400'>
                      
                <Image
                    src= {'/assets/icons/email.svg'}
                    height = {24}
                    width= {24}
                    alt = { 'icon'}
                    className='ml-2'
                />
                <Input
                  disabled
                  value={patient?.email}
                    className='shad-input border-0'
                />
                  </div>
            </div>
            <div>
              <label>Full Name</label>
              <div className='mt-2 flex rounded-md border-x-dark-500 bg-dark-400'>
                      
                <Image
                    src= {'/assets/icons/user.svg'}
                    height = {24}
                    width= {24}
                    alt = { 'icon'}
                    className='ml-2'
                />
                <Input
                  disabled
                  value={patient?.name}
                    className='shad-input border-0'
                />
                  </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 xl:flex-row mt-4">
            <div>
              <label>Phone Number</label>
              <div className='mt-2 flex rounded-md border-x-dark-500 bg-dark-400'>
                      
                <Image
                    src= {'/assets/icons/phone.svg'}
                    height = {24}
                    width= {24}
                    alt = { 'icon'}
                    className='ml-2'
                />
                <Input
                  disabled
                  value={patient?.phone}
                    className='shad-input border-0'
                />
                  </div>
            </div>
            <div>
              <label>Gender</label>
              <div className='mt-2 flex rounded-md border-x-dark-500 bg-dark-400'>
                      
                <Image
                    src= {'/assets/icons/user.svg'}
                    height = {24}
                    width= {24}
                    alt = { 'icon'}
                    className='ml-2'
                />
                <Input
                  disabled
                  value={patient?.gender}
                    className='capitalize shad-input border-0 max-w-[200px]'
                />
                  </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 xl:flex-row mt-4">
            <div>
              <label>Date Of Birth</label>
              <div className='mt-2 flex rounded-md border-x-dark-500 bg-dark-400'>
                      
                <Image
                    src= {'/assets/icons/calendar.svg'}
                    height = {24}
                    width= {24}
                    alt = { 'icon'}
                    className='ml-2'
                />
                <Input
                  disabled
                  value={formatDateTime(patient.birthDate).dateOnly}
                    className='shad-input border-0'
                />
                  </div>
            </div>
            <div>
              <label>Address</label>
              <div className='mt-2 flex rounded-md border-x-dark-500 bg-dark-400'>
                      
                <Image
                    src= {'/assets/icons/department.svg'}
                    height = {24}
                    width= {24}
                    alt = { 'icon'}
                    className='ml-2'
                />
                <Input
                  disabled
                  value={patient?.address}
                    className=' capitalize shad-input border-0'
                />
                  </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 xl:flex-row mt-4">
            <div>
              <label>Current medications</label>
              <div className='mt-2 flex rounded-md border-x-dark-500 bg-dark-400'>
                      
                <Image
                    src= {'/assets/icons/calendar.svg'}
                    height = {24}
                    width= {24}
                    alt = { 'icon'}
                    className='ml-2'
                />
                <Input
                  disabled
                  value={patient?.currentMedication}
                    className='shad-input border-0'
                />
                  </div>
            </div>
            <div>
              <label>Allergies</label>
              <div className='mt-2 flex rounded-md border-x-dark-500 bg-dark-400'>
                      
                <Image
                    src= {'/assets/icons/department.svg'}
                    height = {24}
                    width= {24}
                    alt = { 'icon'}
                    className='ml-2'
                />
                <Input
                  disabled
                  value={patient?.allergies}
                    className=' capitalize shad-input border-0'
                />
                  </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 xl:flex-row mt-4">
            <div>
              <label>Family medical history</label>
              <div className='mt-2 flex rounded-md border-x-dark-500 bg-dark-400'>
                      
                <Image
                    src= {'/assets/icons/calendar.svg'}
                    height = {24}
                    width= {24}
                    alt = { 'icon'}
                    className='ml-2'
                />
                <Input
                  disabled
                  value={patient?.familyMedicalHistory}
                    className='shad-input border-0'
                />
                  </div>
            </div>
            <div>
              <label>Past medical history</label>
              <div className='mt-2 flex rounded-md border-x-dark-500 bg-dark-400'>
                      
                <Image
                    src= {'/assets/icons/department.svg'}
                    height = {24}
                    width= {24}
                    alt = { 'icon'}
                    className='ml-2'
                />
                <Input
                  disabled
                  value={patient?.pastMedicalHistory}
                    className=' capitalize shad-input border-0'
                />
                  </div>
            </div>
          </div>
          <Image
            src={patient.identificationDocument}
            height={128}
            width={128}
            alt="avatar"
            className="mt-3"
          />
          <div className="mt-6 flex gap-4 items-center justify-start">
            <Button onClick={()=> router.back()} className="bg-green-500">
              
              <span>Back</span>
              
            </Button>
            
          </div>
        </div>
  )
}

export default PatientReview