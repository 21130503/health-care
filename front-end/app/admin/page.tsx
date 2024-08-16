
import { StatCard } from '@/components/ui/StatCard';
import { columns, Payment } from '@/components/ui/table/columns';
import  {DataTable} from '@/components/ui/table/DataTable';
import { getRecentAppointmentList } from '@/lib/actions/appointment';
import React, { useEffect, useState } from 'react'
import { HeaderAdmin } from '@/components/headerAdmin';


const AdminPage = async() => {
    const appointments = await getRecentAppointmentList();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <HeaderAdmin/>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  )
}

export default AdminPage