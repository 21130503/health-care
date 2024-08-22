import { Button } from "@/components/ui/button";
import DoctorModal from "@/components/ui/DoctorModal";
import LoginForm from "@/components/ui/forms/LoginForm";
import PatientForm from "@/components/ui/forms/PatientForm";
import { PasskeyModal } from "@/components/ui/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Login({searchParams}: SearchParamProps) {
  const isAdmin = searchParams?.admin === "true";
  const isDoctor = searchParams?.doctor === "true";
  return (
    <div className="flex h-screen max-h-screen">
       {isAdmin && <PasskeyModal />}
       {isDoctor && <DoctorModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src= '/assets/icons/logo-full.svg'
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
            />

            <LoginForm/>
            <div className="text-14-regular justify-between mt-20 flex">
                <p className="justify-items-end text-dark-600 xl:text-left">
                © 2024 CarePulse
                </p>
                <div>
                  <Link className="text-green-500 mr-5" href={"/register"}>Register</Link>
                  <Link className="text-green-500 mr-5" href={"/login?doctor=true"}>Doctor</Link>
                  <Link className="text-green-500" href={"/login?admin=true"}>Admin</Link>
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
