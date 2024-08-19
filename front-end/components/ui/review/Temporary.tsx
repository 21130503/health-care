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
  temporary : TemporaryDoctor
 }
const TemporaryForm = ({temporary}:Props)=> {
  const router = useRouter()
  const [isLoading,setIsLoading] =useState(false)
  const handelAccept  =async()=>{
    setIsLoading(true)
    const status  = await handleTemporary({id: temporary.id, type: "accept",email: temporary.email})
    if(status){
      setIsLoading(false)
      router.push(`/admin/doctor-management`)
    }
  }
  const handelDenied  =async()=>{
    setIsLoading(true)
    const status  = await handleTemporary({id: temporary.id, type: "denied",email: temporary.email})
    if(status){
      setIsLoading(false)
      router.push(`/admin/doctor-management`)
    }
  }
  return (
        <div>
          <section className="mb-12 space-y-4">
          <h1 className="header">Overview review 📑</h1>
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
                  value={temporary?.email}
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
                  value={temporary?.name}
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
                  value={temporary?.phone}
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
                  value={temporary?.gender}
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
                  value={formatDateTime(temporary.dateOfBirth).dateOnly}
                    className='shad-input border-0'
                />
                  </div>
            </div>
            <div>
              <label>Department</label>
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
                  value={temporary?.department}
                    className=' capitalize shad-input border-0'
                />
                  </div>
            </div>
          </div>
          <Image
            src={temporary.avatar}
            height={128}
            width={128}
            alt="avatar"
            className="mt-3"
          />
          <div className="mt-6 flex gap-4 items-center justify-start">
            <Button onClick={()=>handelAccept()} className="bg-green-500">
              {
                isLoading? (<Image
                  src={'/assets/icons/loader.svg'}
                  alt='loader'
                  width={24}
                  height={24}
                  className='animate-spin'
                />):(<span>Accept</span>)
              }
            </Button>
            <Button onClick={()=>{handelDenied()}} className="bg-red-500">Deny</Button>
          </div>
        </div>
  )
}

export default TemporaryForm