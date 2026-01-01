'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MdDelete, MdEdit, MdRestore } from 'react-icons/md';
import TicketForm from './components/TicketForm';
import DeleteDialog from '@/components/DeleteDialog';
import { DataTable } from '@/components/ui/data-table';
import { ITicket } from '../components/types';
import TicketService from '@/endpoints/admin/TicketService';

const Page = () => {
  const [data, setData] = useState<ITicket[]>([]);
  const [ticket, setTicket] = useState<Partial<ITicket>>({});
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptyTicket: Partial<ITicket> = {
    title: '',
    description: '',
    userId: '',
    status: '',
    isDeleted: false
  };

  const handleChange = (value: string, fieldName: string) => {
    setTicket(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleOpen = (
    mode: 'create' | 'update' = 'create',
    id?: string | number
  ) => {
    setOpen(!open);
    if (mode === 'update' && id !== undefined) {
      const selected = getTicket(id);
      setTicket(selected);
    } else {
      setTicket(emptyTicket);
    }
  };

  const handleDeleteOpen = (id: string | number) => {
    setIsDeleteOpen(!isDeleteOpen);
    const toDelete = getTicket(id);
    setTicket(toDelete);
  };

  const getTicket = (id: string | number) =>
    data.find(item => item.id === id) || emptyTicket;

  const columns: ColumnDef<ITicket>[] = [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Description', accessorKey: 'description' },
    { header: 'User ID', accessorKey: 'userId' },
    { header: 'Status', accessorKey: 'status' },
    {
      header: 'Active',
      accessorKey: 'isDeleted',
      cell: ({ row }) => <div>{!row.original.isDeleted ? 'Yes' : 'No'}</div>
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

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const svc = new TicketService();
      if (ticket.id) {
        await svc.update(ticket.id, ticket);
      } else {
        await svc.create(ticket);
      }
      setIsModified(true);
      setTicket(emptyTicket);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const svc = new TicketService();
      await svc.deleteOrRestore(ticket.id!);
      setIsModified(true);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const init = async () => {
    try {
      const svc = new TicketService();
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
      <h1 className='text-2xl my-4'>Manage Tickets</h1>

      <TicketForm
        ticket={ticket}
        // @ts-ignore
        handleChange={handleChange}
        handleOpen={() => handleOpen('create')}
        isLoading={isLoading}
        mode={open && ticket.id ? 'update' : 'new'}
        open={open}
        save={save}
      />

      <DeleteDialog
        action={handleDelete}
        mode='delete'
        open={isDeleteOpen}
        toggleOpen={() => setIsDeleteOpen(!isDeleteOpen)}
        isLoading={isLoading}
        message='Are you sure you want to delete this ticket?'
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
