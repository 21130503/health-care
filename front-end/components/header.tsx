import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import DropdownMenuUser from './ui/DropMenuUser'

const Header = () => {
    const [currentUser, setCurrentUser] = useState(undefined)
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)
    const route = useRouter()
    useEffect(()=>{
      const user = Cookies.get('user')
      console.log("user", user);
      
      if(user){
        setCurrentUser(JSON.parse(user))
      }
      else{
        route.push('/login')
      }
    }, [])
  return (
    <div>
        <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <div className='flex gap-2 items-center'>
          <span className=' relative flex items-center 
            justify-center h-4 w-4 border font-bold
             cursor-pointer border-slate-600 p-4 rounded-3xl' 
             
             onClick={()=>setOpenDropdown(true)}
             >
              {currentUser?.name.charAt()}
              {openDropdown && <DropdownMenuUser className='absolute top-12 r-10'   open={openDropdown} setOpen={setOpenDropdown} />}

              </span>
          <p className="text-16-semibold">{currentUser?.name}</p>
        </div>
      </header>
    </div>
  )
}



export default Header


