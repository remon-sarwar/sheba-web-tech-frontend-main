'use client';
import React, { useState } from 'react';

import AdminSidebar from './AdminSidebar';
import Topbar from './Topbar';
import { ILayout } from './interfaces';

const AdminLayout: React.FC<ILayout> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className='flex flex-row w-full items-start'>
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={'flex flex-col items-start w-full lg:ml-[240px]'}>
        <Topbar />
        <div className='py-4 px-2 lg:px-4 w-full mt-[72px] z-40'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
