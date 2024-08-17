import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import CustomFormField from "./CustomFormField"
import { FormFieldType } from "./forms/PatientForm"
import { Form } from "./form"
import Submit from "./forms/SubmitButton"
import { DepartmentValidation, LoginFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addDepartment } from "@/lib/actions/department.action"
export function DialogAddDepartment() {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading,setIsLoading] =useState(false)

  const form = useForm<z.infer<typeof DepartmentValidation>>({
    resolver: zodResolver(DepartmentValidation),
    defaultValues: {
      name: "",
    },
  })
  async function onSubmit(values: z.infer<typeof DepartmentValidation>) {
    setIsLoading(true)
    const  newDepartment = await addDepartment(values.name)
    if(newDepartment){
      form.reset(),
      setOpen(false),
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-700">
        <DialogHeader>
          <DialogTitle>Add Department</DialogTitle>
          <DialogDescription>
            Add a department to your hospital.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <CustomFormField control = {form.control} 
            fieldType= {FormFieldType.INPUT}
            name= 'name'
            label = 'Name'
            placeholder = 'Obstetrics'
            iconSrc = '/assets/icons/department.svg'
            iconAlt = 'Department'
        />
         <DialogFooter>
          <Submit isLoading={isLoading} className="bg-green-500">Save</Submit>
        </DialogFooter>
        </form>
        </Form>
        </div>
       
      </DialogContent>
    </Dialog>
  )
}
