import { ID, Query } from "node-appwrite"
import { databases, env, messaging } from "../appwrite.config"
import { formatDateTime, parseStringify } from "../utils"
import { Appointment } from "@/types/appwrite.types"
import { revalidatePath } from "next/cache"

export const createAppointment = async (appointment: CreateAppointmentParams)=>{
    try {
        // const newAppointment = await databases.createDocument(
        //     env.DATABASE_ID,
        //     env.APP_COLLECTION_ID,
        //     ID.unique(),
        //     appointment
        // )
        // return parseStringify(newAppointment)
        console.log("HELU");
        console.log("appointment", appointment);
        
    }
    catch(error:any){
        console.log(error)
    }
}
export const getAppointment = async (appointmentId:string)=>{
    try {
        const appointment = await databases.getDocument(
            env.DATABASE_ID,
            env.APP_COLLECTION_ID,
            appointmentId
        )
        return parseStringify(appointment)
    }catch (error) {
        console.log(error)
    }
}
export const getRecentAppointmentList = async () => {
    try {
      const appointments = await databases.listDocuments(
        env.DATABASE_ID!,
        env.APP_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );
      const initialCounts = {
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
      };
  
      const counts = (appointments.documents as Appointment[]).reduce(
        (acc, appointment) => {
          switch (appointment.status) {
            case "scheduled":
              acc.scheduledCount++;
              break;
            case "pending":
              acc.pendingCount++;
              break;
            case "cancelled":
              acc.cancelledCount++;
              break;
          }
          return acc;
        },
        initialCounts
      );
  
      const data = {
        totalCount: appointments.total,
        ...counts,
        documents: appointments.documents,
      };
  
      return parseStringify(data);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the recent appointments:",
        error
      );
    }
};
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending sms:", error);
  }
};

//  UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    const updatedAppointment = await databases.updateDocument(
      env.DATABASE_ID!,
      env.APP_COLLECTION_ID,
      appointmentId,
      appointment
    );
    console.log(appointment);

    if (!updatedAppointment) throw Error;
    const timeZone = '7'
    console.log("I'm HERE");
    
    const smsMessage = `Greetings from CarePulse. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;
    // await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    alert('Lỗi')
    
    console.error("An error occurred while scheduling an appointment:", error);
  }
};
