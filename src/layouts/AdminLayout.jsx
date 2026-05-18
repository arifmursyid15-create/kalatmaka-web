import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopNav from '../components/admin/AdminTopNav';
import AdminFooter from '../components/admin/AdminFooter';

const AdminLayout = () => {
  return (
    <div className="bg-[#F5F0EA] text-[#3B2A23] min-h-screen">
      <AdminSidebar />
      <main className="ml-[280px] min-h-screen flex flex-col">
        <AdminTopNav />
        <div className="flex-1">
          <Outlet />
        </div>
        <AdminFooter />
      </main>
    </div>
  );
};

export default AdminLayout;
