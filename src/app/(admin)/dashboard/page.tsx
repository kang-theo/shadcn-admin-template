import React from 'react'
import AdminLayout from "@/app/(admin)/layout"
import { Session } from 'next-auth';
import { auth } from "@/lib/auth";
import { Button } from '@/components/ui/button';
import { CalendarDateRangePicker } from "@/components/dashboard/CalendarDateRangePicker";

async function Dashboard() {
  const session: Session | null = await auth();

  return (
    <AdminLayout>
      {/* page related components put here */}
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
        <div className="flex items-center space-x-2">
          < CalendarDateRangePicker />
          <Button>Download</Button>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard;
