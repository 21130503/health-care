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
        connection.on("ReceiveNotification", (message) => {
          console.log("Message received", message);
          setNotifications(message.value);
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