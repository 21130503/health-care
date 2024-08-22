"use client"
import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

const Success =  () => {
    const router = useRouter();

    const handleBack = () => {
      router.back();
    };
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
        <div className='success-img'>
            <Link href={'/'}>
                <Image
                    src={'/assets/icons/logo-full.svg'}
                    height={1000}
                    width={1000}    
                    alt='logo'
                    className='h-10 w-fit'
                />
            </Link>
            <section className='flex flex-col items-center'>
                <Image
                    src={'/assets/gifs/success-doctor.gif'}
                    height={300}
                    width={280}
                    alt='success'
                />
                <h2 className='header mb-6 max-w-[600px] text-center mt-5'>
                    Your <span className='text-green-500'>request to change information </span> has been sent to admin!
                </h2>
            </section>
            
        <Button onClick={handleBack} variant="outline" className="shad-primary-btn" >
            Back
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
        </div>
    </div>
  )
}

export default Success