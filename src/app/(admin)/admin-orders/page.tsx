'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MdDelete, MdEdit, MdRestore } from 'react-icons/md';
import OrderForm from './components/OrderForm';
import DeleteDialog from '@/components/DeleteDialog';
import { DataTable } from '@/components/ui/data-table';
import { IOrder } from '../components/types';
import OrderService from '@/endpoints/admin/OrderService';

const Page = () => {
  const [data, setData] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<Partial<IOrder>>({});
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptyOrder: Partial<IOrder> = {
    ownBy: '',
    packageName: '',
    producttype: '',
    expiryDate: '',
    domainName: '',
    payedAmount: 0,
    hostedUsername: '',
    hostedPassword: '',
    nameserver1: '',
    nameserver2: '',
    isActive: true,
    isDeleted: false
  };

  const handleChange = (value: string | number, fieldName: string) => {
    setOrder(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleOpen = (
    mode: 'create' | 'update' = 'create',
    id?: string | number
  ) => {
    setOpen(!open);
    if (mode === 'update' && id !== undefined) {
      const selected = getOrder(id);
      setOrder(selected);
    } else {
      setOrder(emptyOrder);
    }
  };

  const handleDeleteOpen = (id: string | number) => {
    setIsDeleteOpen(!isDeleteOpen);
    const toDelete = getOrder(id);
    setOrder(toDelete);
  };

  const getOrder = (id: string | number) =>
    data.find(item => item.id === id) || emptyOrder;

  const columns: ColumnDef<IOrder>[] = [
    { header: 'Owned By', accessorKey: 'ownBy' },
    { header: 'Package', accessorKey: 'packageName' },
    { header: 'Product Type', accessorKey: 'producttype' },
    { header: 'Domain', accessorKey: 'domainName' },
    { header: 'Expiry Date', accessorKey: 'expiryDate' },
    { header: 'Paid Amount', accessorKey: 'payedAmount' },
    {
      header: 'Active',
      accessorKey: 'isActive',
      cell: ({ row }) => <div>{row.original.isActive ? 'Yes' : 'No'}</div>
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: ({ row }) => (
        <div className='flex gap-4 items-center'>
          <Button
            variant='secondary'
            size='sm'
            onClick={() => handleOpen('update', row.original.id)}
          >
            <MdEdit />
          </Button>
          {!row.original.isDeleted ? (
            <Button
              variant='destructive'
              size='sm'
              onClick={() => handleDeleteOpen(row.original.id)}
            >
              <MdDelete />
            </Button>
          ) : (
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handleDeleteOpen(row.original.id)}
            >
              <MdRestore />
            </Button>
          )}
        </div>
      )
    }
  ];

  // API calls
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const svc = new OrderService();
      if (order.id) {
        await svc.update(order.id, order);
      } else {
        await svc.create(order);
      }
      setIsModified(true);
      setOrder(emptyOrder);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const svc = new OrderService();
      await svc.deleteOrRestore(order.id!);
      setIsModified(true);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const init = async () => {
    try {
      const svc = new OrderService();
      const list = await svc.getAll();
      setData(list);
      setIsModified(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (isModified) init();
  }, [isModified]);

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl my-4'>Manage Orders</h1>

      <OrderForm
        order={order}
        // @ts-ignore
        handleChange={handleChange}
        handleOpen={() => handleOpen('create')}
        isLoading={isLoading}
        mode={open && order.id ? 'update' : 'new'}
        open={open}
        save={save}
      />

      <DeleteDialog
        action={handleDelete}
        mode='delete'
        open={isDeleteOpen}
        toggleOpen={() => setIsDeleteOpen(!isDeleteOpen)}
        isLoading={isLoading}
        message='Are you sure you want to delete this order?'
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
