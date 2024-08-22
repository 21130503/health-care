"use client"
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getServerSideProps } from '@/lib/actions/cheerio';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js';

const Drugs = () => {
  const router = useRouter()
  const typedRef = useRef(null);
  const [value , setValue] = useState<string>('')
  useEffect(() => {
      const options = {
        strings: ["Please fill in the name of the medicine", 'We will let you know how it works'],
        typeSpeed: 20,
      };

      const typed = new Typed(typedRef.current, options);
      // Cleanup typed instance on unmount
      return () => {
        typed.destroy();
      };
    
  }, []);
  const redirect = ()=>{
    router.push(`/drugs/${value}`)
  }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    redirect()
  }
  return (
    <div className='h-screen flex flex-col mx-auto flex max-w-7xl flex-col space-y-14 text-'>
        
        <Header/>
        <main className='flex-1 flex justify-center items-center gap-5 flex-col'>
          <div className="typed-summary text-2xl font-bold mb-10" ref={typedRef}></div>
            <div className='max-w-[1000px] min-w-[600px] flex gap-2 border  rounded-3xl px-3 py-2'
            >
              <Image
              src= {'/assets/icons/search.svg'}
              className='icon-search'
              width={32}
              height={32}
              alt='icon'
              ></Image>
              <form onSubmit={(e)=>handleSubmit(e)} className='flex-1' >
                <input value={value}
                onChange={(e)=>setValue(e.target.value)}
                 className='outline-none w-full border-none px-3 py-2' placeholder='Name drug'/>
                
              </form>
              </div>
              <Button onClick={()=>redirect()} className='bg-green-500'>Search</Button>
        </main>
    </div>
  )
}

export default Drugs