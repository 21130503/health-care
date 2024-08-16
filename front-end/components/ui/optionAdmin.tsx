'use client'
import React, { useState } from 'react'
import DropdownMenuAdmin from './DropdownMenuAdmin'

const OptionAdmin = () => {
    const [open , setOpen] = useState<boolean>(false)
  return (
    <div>
        <p onClick={()=>setOpen((prev)=> !prev)} className="relative cursor-pointer text-16-semibold relative">Admin Dashboard</p>
        {open && <DropdownMenuAdmin className='absolute top-18 right-24' setOpen={setOpen} open= {open}/> }
    </div>
  )
}

export default OptionAdmin