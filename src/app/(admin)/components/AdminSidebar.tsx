import React from 'react';
import { ISidebar } from './interfaces';
import Sidebar from './Sidebar';
import NavLink from './NavLink';

const AdminSidebar: React.FC<ISidebar> = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <NavLink url='/admin-products' text='Products' />
      <NavLink url='/admin-services' text='Services' />
      <NavLink url='/admin-why-choose-us' text='Why Choose Us' />
      <NavLink url='/admin-testimonials' text='Partners' />
      <NavLink url='/admin-orders' text='Orders' />
      <NavLink url='/admin-form-submissions' text='Service Requests' />
      <NavLink url='/admin-tickets' text='Tickets' />
      <NavLink url='/admin-users' text='Users' />
      <NavLink url='/admin-promo-emails' text='Promo Emails' />
    </Sidebar>
  );
};

export default AdminSidebar;
