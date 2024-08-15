import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}
export interface Doctor extends Models.Document{
  id : number,
  name: string,
  phone: string,
  email: string,
  password: string,
  gender: number,
  department: string,
  avatar: string,
  dateofbirth: Date,

}
export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: Doctor;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}
export interface AppointmentForDataTable extends Models.Document {
  patient: string,
  status: Status,
  schedule: Date,
  doctor: string,
  avatarDoctor: string
}