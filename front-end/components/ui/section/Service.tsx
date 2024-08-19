import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface ServiceProps {
    userId : number
}
const Service = ({userId} : ServiceProps) => {
    const service = [
        {name: 'Make an appointment', link: `/patients/${userId}/register`, icon: 'add'},
        {name: 'Ask and answer ', link: '/topic', icon: 'question'},
        {name: 'Appointment schedule ', link: `/${userId}/records`, icon : 'schedule'},
        {name: 'Medical examination with AI', link: '/ai', icon: 'ai'}
  
    ]
  return (
    <div className='md:items-center service xl:flex items-center justify-between w-full xl:flex-row-reverse lg:flex-row-reverse  gap-3'>
         <Image
        height={100}
        width={400}
        src={'/assets/images/doctor-gif.gif'}
        alt='doctor-gif'
        />
        <section className=' xl:ml-40 sm:ml-20 flex-1 flex flex-wrap gap-16  max-w-[496px]'>
            {
                service.map((item, index) => (
                    <div key={index}
                     className='flex flex-col justify-center 
                                items-center service-item border 
                                rounded-xl text-center px-8 py-6 w-[200px] cursor-pointer
                                border-2
                                hover:border-cyan-400
                                '
                    >
                        <Image
                            height={50}
                            width={50}
                            src={`/assets/icons/${item.icon}.svg`}
                            alt={item.name}
                            className=''
                            />
                        <Link href={item.link} className='text-white capitalize mt-2'>
                            {item.name}
                        </Link>
                    </div>
                ))
            }
        </section>
       
    </div>
  )
}

export default Service