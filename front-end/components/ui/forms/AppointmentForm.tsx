"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
import { Dispatch, SetStateAction, useState } from "react"
import { CreateAppointmentSchema, getAppointmentSchema, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "../select"
import { cancelAppointment, createAppointment, updateAppointment } from "@/lib/actions/appointment"
import { Appointment } from "@/types/appwrite.types"
import Image from "next/image"
interface AppointmentProps {
    userId : string,
    patientId : string,
    type: 'create' | 'cancel' | 'schedule',
    appointmentId?:number,
    setOpen?: Dispatch<SetStateAction<boolean>>;
    doctors: Array<any>;
}
const AppointmentForm = ({type, patientId,userId,appointmentId,setOpen,doctors}: AppointmentProps)=> {
  const router = useRouter()
  const [isLoading,setIsLoading] =useState(false)
  // console.log(appointment);
  
  // 1. Define your form.
  const AppointFormValidation = getAppointmentSchema(type)
  const form = useForm<z.infer<typeof AppointFormValidation>>({
    resolver: zodResolver(AppointFormValidation),
    defaultValues: {
      reason: "",
      note: "",
      cancellationReason: "",
      schedule : new Date(),
      primaryPhysicianId: "0",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointFormValidation>) {
    console.log("Hi,hẻe");
    setIsLoading(true)
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }
    try {
        if(type ==='create' && patientId){
          //  @ts-ignore
            const appointmentData = {
                userId,
                patientId,
                primaryPhysicianId: +values.primaryPhysicianId,
                reason: values.reason!,
                schedule:new Date(values.schedule),
                status: status as Status,
                note: values.note,
            }
            // @ts-ignore
            const newAppointment = await createAppointment(appointmentData)
            if(newAppointment){
                form.reset()
                router.push(
                    `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.appointmentId}`
                  );
            }
        }

        else if(type === 'schedule') {
          
          const appointmentToUpdate = {
            userId,
            appointmentId: appointment?.$id!,
            appointment: {
              ...appointment,
              primaryPhysicianId: values.primaryPhysicianId,
              schedule: new Date(values.schedule),
              status: status as Status,
              cancellationReason: values.cancellationReason,
            },
            type,
          };
          
          const updatedAppointment = await updateAppointment(appointmentToUpdate);
          
          if (updatedAppointment) {
            setOpen && setOpen(false);
            form.reset();
          }
        }
        else if(type === 'cancel'){
          const appointmentToUpdate = {
            status,
            appointmentId,
            reason : values.cancellationReason
          };
          console.log("Reson :", appointmentToUpdate);
          // @ts-ignore
          const update = await cancelAppointment(appointmentToUpdate)
          if (update) {
            setOpen && setOpen(false);
            form.reset();
          }
        }
    } catch (error) {
      console.log(error);
      
    }
    setIsLoading(false);
    }
  let buttonLabel;
  switch (type) {
    case 'create':
      buttonLabel = "Create Appointment"
      break;
    case 'cancel':
      buttonLabel = "Cancel Appointment"
      break;
    case 'schedule':
        buttonLabel = 'Schedule Appointment'
        break;
    default:
      throw new Error("Invalid type");
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header capitalize">{type} Appointment</h1>
            <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
        </section>
        {type !== 'cancel' && (
            <>
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysicianId"
                    label="Doctor"
                    placeholder="Select a doctor"
                >
                    {doctors.map((doctor, i) => (
                    <SelectItem key={doctor.name + i} value={doctor.id.toString()}>
                        <div className="flex cursor-pointer items-center gap-2">
                        <Image
                            src={doctor.avatar}
                            width={32}
                            height={32}
                            alt="doctor"
                            className="rounded-full border border-dark-500"
                        />
                        <p>{doctor.name}</p>
                        </div>
                    </SelectItem>
                    ))}
                </CustomFormField>
                <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="schedule"
                    label="Expected appointment date"
                    showTimeSelect='true'
                    dateFormat="MM/dd/yyyy  -  h:mm aa"
                />
                <div className={`flex flex-col gap-6  ${type === "create" && "xl:flex-row"}`}>
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="reason"
                        label="Reason for appointment"
                        placeholder="Enter reason for appointment"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="notes"
                        label="Comments/notes"
                        placeholder="Enter notes"
                    />
                </div>
            </>
        )}
         {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}
        <Submit isLoading={isLoading}
            className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
         {buttonLabel}
        </Submit>
      </form>
    </Form>
  )
}

export default AppointmentForm