"use client"
import { addMessage, getMessages } from '@/lib/actions/message.action'
import { Message } from '@/types/appwrite.types'
import React, { use, useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
import { cn } from '@/lib/utils'
import * as signalR from '@microsoft/signalr';

import InputMessage from './inputMessage'
interface Props {
    idTopic: number
}
const ContentTopic = ({idTopic}: Props) => {
  const [message, setMessage] =  useState<Message>();
  const messageEndRef = useRef<HTMLDivElement>(null); // Tạo ref cho phần tử cuối cùng của danh sách tin nhắn
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
    // @ts-ignore
    const data: Message = {
      message: msg,
      from: user.id,
      topicId: idTopic,
      createdAt: new Date(),
    }
    // @ts-ignore
    setMessage((prev) => [...prev, data]);
    // @ts-ignore
    const res = await addMessage(data)
    scrollToBottom();
  }
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [conn, setConnection] = React.useState<any>(null);
    useEffect(() => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5228/notificationHub", 
          {
            skipNegotiation: true,
            transport:signalR.HttpTransportType.WebSockets,
          }
        )
        .configureLogging(signalR.LogLevel.Information)
        .build();

        setConnection(connection);
        connection.on("ReceiveMessage", (message) => {
          console.log("Message received", message);
          if(message.value[0].topicId ===idTopic){
            setMessage(message.value);
          }
          scrollToBottom();
      });
      
  
      connection.start()
      .then(() => console.log("Connected to SignalR Hub"))
      .catch((err) => {
        console.log("Failed to start connection");
        console.error("Connection Error Details:", err);
      });
  
      return () => {
        connection.stop();
      };
    }, []);
  return (
    <div>
      <div
       className='flex flex-col gap-6 xl:h-[400px]  lg:h-[650px] overflow-x-scroll custom-scroll pb-12'>
        {message?.map((item,index) => (
          <div key={item.id} className={user.id == item.from ? ` flex justify-end`: ` flex`}>
            <h3 className={cn('bg-pink-700 px-2 py-3 max-w-[300px]',
              user.id == item.from ? 'rounded-3xl rounded-br-none': 'rounded-3xl rounded-bl-none'
            )}>{item.message}</h3>
          </div>
        ))}
        <div ref={messageEndRef} /> 
      </div>
      <InputMessage handleSendMessage = {handleSendMessage}/>
    </div>
  )
}

export default ContentTopic