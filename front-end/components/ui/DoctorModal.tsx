'use client'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from 'next/image';
import { DoctorFormValidation } from '@/lib/validation';
import { Form, useFormField } from './form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormFieldType } from './forms/PatientForm';
import CustomFormField from './CustomFormField';
import { useRouter } from 'next/navigation';
import { Button } from './button';
import SubmitButton from './forms/SubmitButton';
const DoctorModal = () => {
    const [open, setOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const closeModal = () => {
        setOpen(false);
        router.push("/");
    }
    const form = useForm<z.infer<typeof DoctorFormValidation>>({
        resolver: zodResolver(DoctorFormValidation),
        defaultValues: {
          email: "",
          password: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof DoctorFormValidation>) {
        console.log(values)
      }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent className="shad-alert-dialog bg-dark-300">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center justify-between">
          Are you doctor sure?
          <Image
                src="/assets/icons/close.svg"
                alt="close"
                width={20}
                height={20}
                onClick={() => closeModal()}
                className="cursor-pointer"
              />
          </AlertDialogTitle>
        <AlertDialogDescription>
        Login to continue
        </AlertDialogDescription>
      </AlertDialogHeader>
    <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} > 
      <div className='mb-4'>
              <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="email"
                      label="Email address"
                      placeholder="johndoe@gmail.com"
                      iconSrc="/assets/icons/email.svg"
                      iconAlt="email"
                      
              />
              <CustomFormField
                      fieldType={FormFieldType.PASSWORD}
                      control={form.control}
                      name="password"
                      label="Password"
                      placeholder="Password"
                      iconSrc="/assets/icons/key.svg"
                      iconAlt="email"   
              />
      </div>
      <SubmitButton isLoading={isLoading}>Login</SubmitButton>
      </form>
  </Form>
    </AlertDialogContent>
</AlertDialog>

  )
}

export default DoctorModal