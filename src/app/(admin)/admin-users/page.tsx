'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MdDelete, MdEdit, MdRestore } from 'react-icons/md';
import UserForm from './components/UserForm';
import DeleteDialog from '@/components/DeleteDialog';
import { DataTable } from '@/components/ui/data-table';
import { IAppUser } from '../components/types';
import UserService from '@/endpoints/admin/UserService';

const Page = () => {
  const [data, setData] = useState<IAppUser[]>([]);
  const [user, setUser] = useState<Partial<IAppUser>>({});
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptyUser: Partial<IAppUser> = {
    userName: '',
    fullName: '',
    address: '',
    email: '',
    // @ts-ignore

    isDeleted: false
  };

  const handleChange = (value: string, fieldName: keyof IAppUser) => {
    setUser(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleOpen = (mode: 'create' | 'update' = 'create', id?: string) => {
    setOpen(!open);
    if (mode === 'update' && id !== undefined) {
      const selected = getUser(id);
      setUser(selected);
    } else {
      setUser(emptyUser);
    }
  };

  const handleDeleteOpen = (id: string) => {
    setIsDeleteOpen(!isDeleteOpen);
    const toDelete = getUser(id);
    setUser(toDelete);
  };

  const getUser = (id: string) =>
    data.find(item => item.id === id) || emptyUser;

  const columns: ColumnDef<IAppUser>[] = [
    { header: 'Username', accessorKey: 'userName' },
    { header: 'Full Name', accessorKey: 'fullName' },
    { header: 'Address', accessorKey: 'address' },
    { header: 'Email', accessorKey: 'email' },
    {
      header: 'Active',
      accessorKey: 'isDeleted',
      // @ts-ignore

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

          {
            // @ts-ignore
            !row.original.isDeleted ? (
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
            )
          }
        </div>
      )
    }
  ];

  // API calls
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const svc = new UserService();
      if (user.id) {
        await svc.update(user.id, user);
      } else {
        await svc.create(user);
      }
      setIsModified(true);
      setUser(emptyUser);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const svc = new UserService();
      await svc.deleteOrRestore(user.id!);
      setIsModified(true);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const init = async () => {
    try {
      const svc = new UserService();
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
      <h1 className='text-2xl my-4'>Manage Users</h1>

      <UserForm
        user={user}
        // @ts-ignore
        handleChange={handleChange}
        handleOpen={() => handleOpen('create')}
        isLoading={isLoading}
        mode={open && user.id ? 'update' : 'new'}
        open={open}
        save={save}
      />

      <DeleteDialog
        action={handleDelete}
        mode='delete'
        open={isDeleteOpen}
        toggleOpen={() => setIsDeleteOpen(!isDeleteOpen)}
        isLoading={isLoading}
        message='Are you sure you want to delete this user?'
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
