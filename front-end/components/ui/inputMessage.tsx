"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './button'
interface Props {
    handleSendMessage : (msg: string)=>void
}
const InputMessage = ({handleSendMessage}:Props) => {
    const [value,setValue] = useState<string>("")
    const handleSubmit = (e:any) => {
        e.preventDefault()
        handleSendMessage(value)
        setValue("")
    }
  return (
    <div className='flex gap-5 mt-4'>
        <form onSubmit={(e)=>handleSubmit(e)} className='flex-1 flex gap-5'>
            <input type="text" className='flex-1 outline-none px-3 py-2 border rounded-2xl' value={value}
                onChange={(e)=>setValue(e.target.value)}
            />
            <Button type='submit'>
            <Image
                src={'/assets/icons/send.svg'}
                width={32}
                height={32}
                alt='icon'
                className=''
            />
            </Button>
        </form>
    </div>
  )
}

export default InputMessage