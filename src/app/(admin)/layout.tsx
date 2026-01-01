import Navbar from '@/components/Navbar';
import AdminLayout from './components/AdminLayout';

export default function AdminDashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
