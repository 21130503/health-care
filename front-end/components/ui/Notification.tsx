"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import * as signalR from '@microsoft/signalr';


const NotificationComp = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    useEffect(() => {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5228/notificationHub")
        .withAutomaticReconnect()
        .build();
  
      connection.on("ReceiveNotification", (message) => {
        console.log("Message received", message);
        setNotifications(prevNotifications => {
            console.log("Previous notifications length:", prevNotifications.length);
            return [...prevNotifications, message];
        });
        console.log("Length of notifications", notifications.length);
        
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
    <span className='relative' >
            <Image
              src={'/assets/icons/notification.svg'}
              height={32}
              width={32}
              alt='Notifications'
            />
            <span className='absolute flex items-center 
            justify-center -top-3.5 -right-3.5 h-4 w-4 border
             border-slate-600 p-3 rounded-3xl'>{notifications.length}</span>
          </span>
  )
}

export default NotificationComp