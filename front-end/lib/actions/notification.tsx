
// import * as signalR from '@microsoft/signalr';


// export const getNotification = ()=>{
//     let notifications = []
//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl("http://localhost:5228/notificationHub")
//       .withAutomaticReconnect()
//       .build();

//     connection.on("ReceiveNotification", (message) => {
//       console.log("Message received", message);
//       notifications = [...notifications, message];
//       console.log("Length of notifications", notifications.length);
//       console.log("Notifications received", notifications);
      
//     });

//     connection.start()
//     .then(() => console.log("Connected to SignalR Hub"))
//     .catch((err) => {
//       console.log("Failed to start connection");
//       console.error("Connection Error Details:", err);
//     });

//     return notifications
// }