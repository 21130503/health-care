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
import { DoctorAddFormValidation, DoctorFormValidation, LoginFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, getUser } from "@/lib/actions/patient.action"
import { GenderOptions } from "@/constants"
import { RadioGroupItem,RadioGroup } from "../radio-group"
import { Label } from "../label"
import { SelectItem } from "../select"
import { Department } from "@/types/appwrite.types"
import FileUpload from "../FileUpload"
import { addDoctor } from "@/lib/actions/doctor.action"


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
interface Props {
    department : Array<Department>;
}
const AddDoctorForm = ({department}: Props)=> {
  const router = useRouter()
  const [isLoading,setIsLoading] =useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof DoctorAddFormValidation>>({
    resolver: zodResolver(DoctorAddFormValidation),
    defaultValues: {
      email: "",
      phone: "",
      name: "",
      dateOfBirth: new Date(),
      gender: GenderOptions[0],
      department: '',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof DoctorAddFormValidation>) {
    setIsLoading(true)
    try {
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('name', values.name);
        formData.append('phone', values.phone);
        formData.append('gender', values.gender.toString());
        formData.append('department', values.department);
        formData.append('dateOfBirth', values.dateOfBirth.toISOString());
        if (values.avatar && values.avatar.length > 0) {
              values.avatar.forEach((file) => {
                  formData.append('avatar', file);
              });
        }
        const newDoctor = await addDoctor(formData)
        if(newDoctor){
            router.push(`/admin/doctor-management`)
        }

    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Add Doctor 👨‍⚕️</h1>
            <p className="text-dark-700">Add doctors to your hospital</p>
        </section>
         <CustomFormField control = {form.control} 
            fieldType= {FormFieldType.INPUT}
            name= 'email'
            label = 'Email'
            placeholder = 'johndoe@gmail.com'
            iconSrc = '/assets/icons/email.svg'
            iconAlt = 'Email'
        />
         <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField control = {form.control} 
            fieldType= {FormFieldType.INPUT}
            name= 'name'
            label = 'Name'
            placeholder = '+(84) 7957165506'
            
            />
            <CustomFormField control = {form.control} 
            fieldType= {FormFieldType.PHONE_INPUT}
            name= 'phone'
            label = 'Phone Number'
            placeholder = '+(84) 7957165506'
            
            />
         </div>
         <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="dateOfBirth"
                label="Date Of Birth"
                showTimeSelect='true'
                dateFormat="MM/dd/yyyy  -  h:mm aa"
            />
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer capitalize">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
         </div>
         <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="department"
            label="Department"
            placeholder="Select a department"
          >
            {department.map((department, i) => (
              <SelectItem key={department.name + i} value={department.id.toString()}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{department.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="avatar"
            label="Avatar"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUpload files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        <Submit isLoading={isLoading}>
          Get started
        </Submit>
      </form>
    </Form>
  )
}

export default AddDoctorForm