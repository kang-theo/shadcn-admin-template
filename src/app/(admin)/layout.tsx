import React from "react";
import { MainNav } from "@/components/layout/navs/MainNav";
import { ProfileNav } from "@/components/layout/navs/ProfileNav";

function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Tailwind Mobile Responsive
    // components not changes with pages put here
    <div className='hidden flex-col md:flex'>
      <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
          <p>Logo</p>
          <MainNav className='mx-6' />
          <div className='ml-auto flex items-center space-x-4'>
            <ProfileNav />
          </div>
        </div>
      </div>

      <div className='flex-1 space-y-4 p-8 pt-6'>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
