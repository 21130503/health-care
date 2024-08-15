"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/appwrite.types";


import "react-datepicker/dist/react-datepicker.css";
import AppointmentForm from "./forms/AppointmentForm";
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
 } from "./dialog";

export const AppointmentModal = ({
  patientId,
  userId,
  appointmentId,
  type,
}: {
  patientId: string;
  userId: string;
  appointmentId: number;
  type: "schedule" | "cancel";
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} appointment
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointmentId={appointmentId}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};