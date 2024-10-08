/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "male" | "female" | "other";
  declare type Status = "pending" | "scheduled" | "cancelled";
  
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }
  declare interface LoginUserParams {
    email: string;
    phone: string;
  }
  declare interface User extends CreateUserParams {
    id: string;
  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    userId: string;
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
  
  declare type CreateAppointmentParams = {
    userId: number;
    patientId: number;
    primaryPhysicianId: number;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
  };
  declare type CancelAppointmentParams = {
    appointmentId: number;
    reason : string;
    status : Status;
  };
  declare type UpdateAppointmentParams = {
    appointmentId: string;
    userId: string;
    appointment: Appointment;
    type: string;
  };
  declare type CreateDoctorParams = {
    email: string;
    password: string;
  }
  declare type EditDoctorParams = {
    userId: number
    avatar: File[]
    email: string
    gender: number,
    name: string,
    phone: string,
    dateOfBirth: string,
    department: string,
    password: string,
  }