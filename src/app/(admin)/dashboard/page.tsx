import React from 'react'
import { Session } from 'next-auth';
import { auth } from "@/lib/auth";
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/app/actions/auth';

async function Dashboard() {
  const session: Session | null = await auth();

  return (
    <div>
      Dashboard welcome: {session?.user?.name} | Email: {session?.user?.email}
      <form action={signOutAction}>
        <Button type='submit'>Logout</Button>
      </form>
    </div>
  )
}

export default Dashboard;
