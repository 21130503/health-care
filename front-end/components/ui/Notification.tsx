"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import * as signalR from '@microsoft/signalr';
import DropdownNotification from './DropdownNotification'
interface Props {
  temporary: Array<any>
}
const NotificationComp = ({temporary}:Props) => {
    const [notifications, setNotifications] = useState(temporary);
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
        console.log("Length of notifications", notifications);
        
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
    <p>
      <DropdownNotification notification ={notifications}/>
    </p>
  )
}

export default NotificationComp