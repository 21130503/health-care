"use client"
import { getMessages } from '@/lib/actions/message.action'
import { Message } from '@/types/appwrite.types'
import React, { use, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { cn } from '@/lib/utils'
import { Input } from 'postcss'
import InputMessage from './inputMessage'
interface Props {
    idTopic: number
}
const ContentTopic = ({idTopic}: Props) => {
  const [message, setMessage] =  useState<Message>();
  const user = JSON.parse(Cookies.get("user"))
  console.log("user", user);
  
  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages(idTopic);
      setMessage(fetchedMessages);
    };
    
    fetchMessages();
  }, [idTopic]);
  const handleSendMessage = async (msg: string) =>{
    
  }
  return (
    <div>
      <div className='flex flex-col gap-6 h-[650px]'>
        {message?.map((item,index) => (
          <div key={item.id} className={user.id == item.from ? ` flex justify-end`: ` flex`}>
            <h3 className={cn('bg-pink-700 px-2 py-3 max-w-[300px]',
              user.id == item.from ? 'rounded-3xl rounded-br-none': 'rounded-3xl rounded-bl-none'
            )}>{item.message}</h3>
          </div>
        ))}
      </div>
      <InputMessage handleSendMessage = {handleSendMessage}/>
    </div>
  )
}

export default ContentTopic