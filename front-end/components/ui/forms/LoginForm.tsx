"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Cookies from 'js-cookie';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from './SubmitButton'
import Submit from "./SubmitButton"
import { useState } from "react"
import { LoginFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, getUser } from "@/lib/actions/patient.action"

export enum FormFieldType {
    INPUT ='input',
    TEXTAREA  ='textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX='checkbox',
    DATE_PICKER = 'datePicker',
    SELECT= 'select',
    SKELETON = 'skeleton',
    PASSWORD ='password' 
}
 
const LoginForm = ()=> {
  const router = useRouter()
  const [isLoading,setIsLoading] =useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({phone,email}: z.infer<typeof LoginFormValidation>) {
    setIsLoading(true)
    try {
      const userData = {
        phone,
        email,
      }
      const data=  await getUser(userData)
      Cookies.set('user', JSON.stringify(data.user))
      console.log("data: ",data);
      
      if(data.status ===200){
        // router.push(`/patients/${user.newUser.$id}/register`)
        router.push(`/`)
      }
      else {
        alert('Thất bại')
        setIsLoading(false)
      }
        

    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Login ✋</h1>
            <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
         <CustomFormField control = {form.control} 
            fieldType= {FormFieldType.INPUT}
            name= 'email'
            label = 'Email'
            placeholder = 'johndoe@gmail.com'
            iconSrc = '/assets/icons/email.svg'
            iconAlt = 'Email'
        />
         <CustomFormField control = {form.control} 
            fieldType= {FormFieldType.PHONE_INPUT}
            name= 'phone'
            label = 'Phone Number'
            placeholder = '+(84) 7957165506'
            
        />
        <Submit isLoading={isLoading}>
          Get started
        </Submit>
      </form>
    </Form>
  )
}

export default LoginForm