import React from 'react';
import { Outlet } from 'react-router-dom';

import { UserDetails } from '@/components/UserDetails';

const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="mx-auto flex h-screen max-h-screen w-[450px] flex-col items-center justify-between border bg-gray-100 px-4">
      <UserDetails />
      <Outlet />
    </div>
  );
};

export { AuthenticatedLayout };
