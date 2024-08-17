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
import { DoctorFormValidation, EditDoctorValidation } from '@/lib/validation';
import { Form, FormControl, useFormField } from './form';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FormFieldType } from './forms/PatientForm';
import CustomFormField from './CustomFormField';
import { useRouter } from 'next/navigation';
import { Button } from './button';
import SubmitButton from './forms/SubmitButton';
import { getDoctor, updateDoctor } from '@/lib/actions/doctor';
import { ToastAction } from './toast';
import { useToast } from './use-toast';
import FileUpload from "./FileUpload"
interface Doctor {
    email: string,
    name: string,
    phone: string,
    gender: string,
    avatar: string,
    dateofbirth: string,
    password: string,
    department: string,
}
interface EditDoctorDialog {
    doctor :Doctor
}
const EditDoctorDialog =  ({doctor}: EditDoctorDialog) => {
    const [open, setOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()
    const closeModal = () => {
        setOpen(false);
        router.push("/");
    }
    const form = useForm<z.infer<typeof EditDoctorValidation>>({
        resolver: zodResolver(EditDoctorValidation),
        defaultValues: {
          email: doctor.email,
          name: doctor.name,
          phone: doctor.phone,
          gender: doctor.gender,
          password: doctor.password,
          department: doctor.department,
          confirmPassword: doctor.password,
          avatar: null,
          dateofbirth: new Date(),
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof EditDoctorValidation>) {
        const formData = new FormData();
        const dateofbirth = new Date(values.dateofbirth);
      
        // Append các trường khác vào FormData
        formData.append('userId', doctor.id.toString());
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('name', values.name);
        formData.append('phone', values.phone);
        formData.append('gender', values.gender.toString());
        formData.append('department', values.department);
        formData.append('dateOfBirth', dateofbirth.toISOString());

        // Append các file vào FormData
        if (values.avatar && values.avatar.length > 0) {
          console.log("hELEE");
          
            values.avatar.forEach((file) => {
                formData.append('avatar', file);
            });
        }
        const doctorEdit = await updateDoctor(formData);
        
      }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent className="shad-alert-dialog bg-dark-300">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center justify-between">
          Edit Profile
          <Image
                src="/assets/icons/close.svg"
                alt="close"
                width={20}
                height={20}
                onClick={() => closeModal()}
                className="cursor-pointer"
              />
          </AlertDialogTitle>
      </AlertDialogHeader>
    <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} > 
      <div className='mb-4'>
             <div className='flex items-center gap-20 flex-col xl:flex-row'>
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
                          fieldType={FormFieldType.INPUT}
                          control={form.control}
                          name="name"
                          label="Full Name"
                          placeholder="johndoe@gmail.com"
                          iconSrc="/assets/icons/email.svg"
                          iconAlt="email"
                          
                  />
             </div>
               <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                />
              <div className='flex mt-3 items-center gap-20 flex-col xl:flex-row'>
                  <CustomFormField
                          fieldType={FormFieldType.PASSWORD}
                          control={form.control}
                          name="password"
                          label="Password"
                          placeholder="Password"
                          iconSrc="/assets/icons/key.svg"
                          iconAlt="email"   
                  />
                  <CustomFormField
                          fieldType={FormFieldType.PASSWORD}
                          control={form.control}
                          name="confirmPassword"
                          label="ConfirmPassword"
                          placeholder="Password"
                          iconSrc="/assets/icons/key.svg"
                          iconAlt="email"   
                  />
              </div>
              <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="dateofbirth"
              label="Date of birth"
            />
              <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="department"
              label="Department"
              placeholder={doctor.department}
            />
             <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="avatar"
            label="Avatar"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUpload height={100} width={100} files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
      </div>
      <SubmitButton isLoading={isLoading}>Update</SubmitButton>
      </form>
  </Form>
    </AlertDialogContent>
</AlertDialog>

  )
}

export default EditDoctorDialog