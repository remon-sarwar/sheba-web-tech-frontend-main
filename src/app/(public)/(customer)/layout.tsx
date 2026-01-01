import Navbar from '@/components/Navbar';
import SidebarNavItem from './components/SidebarNavItem';

export default function CustomerLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='mt-[88px] flex justify-center w-full'>
      <div className='flex w-full lg:w-10/12 gap-4'>
        <div className='w-4/12 p-4 rounded-md border border-gray-300'>
          <SidebarNavItem url='/my-dashboard' label='Dashboard' />
          <SidebarNavItem url='/my-profile' label='Profile' />
          <SidebarNavItem url='/my-tickets' label='Tickets' />
          
        </div>
        <div className='w-8/12'>{children}</div>
      </div>
    </div>
  );
}
