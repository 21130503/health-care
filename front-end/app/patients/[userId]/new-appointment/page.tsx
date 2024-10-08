
import AppointmentForm from "@/components/ui/forms/AppointmentForm";
import { getAllDoctor } from "@/lib/actions/doctor.action";
import { getPatient } from "@/lib/actions/patient.action";
import Image from "next/image";

export default async function NewAppointment({params: {userId}}: SearchParamProps)  {
    const patient  = await getPatient(userId);
    const doctors = await getAllDoctor()
    
    
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src= '/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
            />

            <AppointmentForm
                type="create"
                userId={userId}
                patientId = {patient.id}
                doctors={doctors}
            />
            
            <p className="justify-items-end text-dark-600 xl:text-left copyright mt-10 py-12">
                © 2024 CarePulse
            </p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
