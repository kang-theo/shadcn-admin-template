import React from 'react'
import { Session } from 'next-auth';
import { auth } from "@/lib/auth";

async function Dashboard() {
  const session: Session | null = await auth();

  return (
    <div>Dashboard welcome: {session?.user?.name} | Email: {session?.user?.email}</div>
  )
}

export default Dashboard;
