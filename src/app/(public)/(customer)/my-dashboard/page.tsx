// app/dashboard/page.jsx
'use client';

import { sendget, sendPost } from '@/endpoints/AllCalls';
import OrderService from '@/endpoints/OrderService';
import { useEffect, useState } from 'react';

// sample data (replace with API call later)

export default function Dashboard() {
  const [orders, setOrders] = useState<Record<string, string | number>[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Record<
    string,
    string | number
  > | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function init() {
    try {
      const svc = new OrderService();
      const list = await svc.getMyOrders();
      setOrders(list);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    init();
  }, []);

  if (!orders) {
    return <h1>Loading</h1>;
  }

  const handlePasswordChange = async () => {
    if (!selectedOrder) return;
    if (loading) return;
    if (!newPassword) {
      alert('Enter new password first!');
      return;
    }

    const svc = new OrderService();

    setLoading(true);

    try {
      await svc.changePassword({
        pass: newPassword,
        orderid: selectedOrder?.id
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <h1 className='text-3xl font-bold text-blue-900 mb-6'>Dashboard</h1>

      {/* Active Orders */}
      <section className='mb-12'>
        <h2 className='text-2xl font-semibold text-green-700 mb-4'>
          Active Products
        </h2>
        <div className='grid md:grid-cols-2 gap-6'>
          {orders
            .filter(o => {
              // @ts-ignore
              return o.isActive;
            })
            .map(order => (
              <div
                key={order.id}
                className='bg-white p-6 rounded-xl shadow-md border border-gray-200'
              >
                <h3 className='font-bold text-lg'>{order.domainName}</h3>
                <p className='text-gray-600'>
                  {
                    // @ts-ignore
                    order?.packageName?.split('_').slice(-1)[0]
                  }
                </p>
                <p className='text-sm text-gray-500'>
                  Expiry Date: {new Date(order.expiryDate).toDateString()}
                </p>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className='mt-4 bg-primary hover:primary/80 text-white px-4 py-2 rounded-xl'
                >
                  View Details
                </button>
              </div>
            ))}
        </div>
      </section>

      {/* Expired Orders */}
      <section>
        <h2 className='text-2xl font-semibold text-red-700 mb-4'>
          Other Products
        </h2>
        {orders.filter(o => {
          // @ts-ignore
          return o.isActive == false;
        }).length === 0 ? (
          <p className='text-gray-500'>No inactive product 🎉</p>
        ) : (
          <div className='grid md:grid-cols-2 gap-6'>
            {orders
              .filter(o => {
                // @ts-ignore
                return o.isActive == false;
              })
              .map(order => (
                <div
                  key={order.id}
                  className='bg-white p-6 rounded-xl shadow-md border border-red-200'
                >
                  <h3 className='font-bold text-lg'>{order.domainName}</h3>
                  <p className='text-gray-600'>{order.packageName}</p>
                  <p className='text-sm text-gray-500'>
                    Expired on: {new Date(order.expiryDate).toDateString()}
                  </p>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className='mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl'
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
        )}
      </section>

      {/* Details Modal */}
      {selectedOrder && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative'>
            <button
              onClick={() => setSelectedOrder(null)}
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
            >
              ✕
            </button>

            <h2 className='text-xl font-bold mb-4'>
              Product Details - {selectedOrder.domainName}
            </h2>
            <div className='space-y-2 text-gray-700'>
              <p>
                <strong>Package:</strong>{' '}
                {
                  // @ts-ignore
                  selectedOrder?.packageName?.split('_').slice(-1)[0]
                }
              </p>
              <p>
                <strong>Product Type:</strong> {selectedOrder.producttype}
              </p>
              <p>
                <strong>Expiry Date:</strong>{' '}
                {new Date(selectedOrder.expiryDate).toDateString()}
              </p>
              <p>
                <strong>Paid Amount:</strong> ${selectedOrder.paidAmount}
              </p>
              <p>
                <strong>Username:</strong> {selectedOrder.hostedUsername}
              </p>
              <p>
                <strong>Password:</strong> {selectedOrder.hostedPassword}
              </p>
              <p>
                <strong>Nameservers:</strong> {selectedOrder.nameserver1},{' '}
                {selectedOrder.nameserver2}
              </p>
            </div>

            {/* Password Change */}
            <div className='mt-6'>
              <label className='block font-medium mb-1'>
                Change Hosted Password
              </label>
              <input
                type='text'
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder='Enter new password'
                className='w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <button
                onClick={handlePasswordChange}
                className='bg-primary hover:primary/80 text-white px-4 py-2 rounded-xl'
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
