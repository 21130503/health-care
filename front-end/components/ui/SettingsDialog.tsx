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
import { getDoctor } from '@/lib/actions/doctor';
import { ToastAction } from './toast';
import { useToast } from './use-toast';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from './command';
import { Separator } from './separator';
 const SettingsDialog =  () => {
    const [open, setOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()
    const closeModal = () => {
        setOpen(false);
        router.push("/");
    }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent className="shad-alert-dialog bg-dark-300">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center justify-between">
          More Settings
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
     
      
      <div>
      <Separator  className="my-2 bg-slate-300" />
        <h1 className='text-red-700 text-center cursor-pointer'>Report</h1>
        <Separator  className="my-2 bg-slate-300" />
        <h1 className='text-red-700 text-center cursor-pointer'>Log out</h1>
        <Separator  className="my-2 bg-slate-300" />
      </div>
    </AlertDialogContent>
</AlertDialog>

  )
}

export default SettingsDialog