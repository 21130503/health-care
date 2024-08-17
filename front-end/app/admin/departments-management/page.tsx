import { HeaderAdmin } from '@/components/headerAdmin'
import { columnsDepartment } from '@/components/ui/table/columns'
import { DataTableDepartment } from '@/components/ui/table/DataTableDeparment'
import { getDepartments } from '@/lib/actions/department.action'
import React from 'react'

const DepartmentPage =async () => {
    const departments = await getDepartments()
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <HeaderAdmin/>
        <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Departments 🏪</h1>
          <p className="text-dark-700">
          Manage all your departments here
          </p>
        </section>
        <DataTableDepartment columns={columnsDepartment} data={departments} />
        </main>
    </div>
  )
}

export default DepartmentPage