import { Button } from "@/components/ui/button";
import DoctorModal from "@/components/ui/DoctorModal";
import AddDoctorForm from "@/components/ui/forms/AddDoctorForm";
import LoginForm from "@/components/ui/forms/LoginForm";
import PatientForm from "@/components/ui/forms/PatientForm";
import { PasskeyModal } from "@/components/ui/PasskeyModal";
import { getDepartments } from "@/lib/actions/department.action";
import { getAllDoctor } from "@/lib/actions/doctor.action";
import Image from "next/image";
import Link from "next/link";

export default async function AddDoctorPage({searchParams}: SearchParamProps) {
  const departments = await getDepartments()
  return (
    <div className="flex h-screen max-h-screen">

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px]">
          <Image
            src= '/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
            />

            <AddDoctorForm department ={departments}/>
            <div className="text-14-regular justify-between mt-20 flex">
                <p className="justify-items-end text-dark-600 xl:text-left">
                © 2024 CarePulse
                </p>
                <div>
            </div>
            </div>

        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
