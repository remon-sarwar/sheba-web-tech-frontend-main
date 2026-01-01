'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MdDelete, MdEdit, MdRestore } from 'react-icons/md';
import PlatformServiceForm from './components/ServiceForm';
import DeleteDialog from '@/components/DeleteDialog';
import { DataTable } from '@/components/ui/data-table';
import { IPlatformService } from '../components/types';
import PlatformServiceService from '@/endpoints/admin/PlatformServiceService';

const Page = () => {
  const [data, setData] = useState<IPlatformService[]>([]);
  const [service, setService] = useState<Partial<IPlatformService>>({});
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptyService: Partial<IPlatformService> = {
    name: '',
    description: '',
    imageURL: '',
    isDeleted: false
  };

  const handleChange = (value: string | File, fieldName: string) => {
    setService(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleOpen = (
    mode: 'create' | 'update' = 'create',
    id?: string | number
  ) => {
    setOpen(!open);
    if (mode === 'update' && id !== undefined) {
      const selected = getService(id);
      setService(selected);
    } else {
      setService(emptyService);
    }
  };

  const handleDeleteOpen = (id: string | number) => {
    setIsDeleteOpen(!isDeleteOpen);
    const toDelete = getService(id);
    setService(toDelete);
  };

  const getService = (id: string | number) =>
    data.find(item => item.id === id) || emptyService;

  const columns: ColumnDef<IPlatformService>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Description', accessorKey: 'description' },
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
      const svc = new PlatformServiceService();
      console.log({ service }, 'Save function');
      if (service.id) {
        await svc.update(service.id, service);
      } else {
        await svc.create(service);
      }
      setIsModified(true);
      setService(emptyService);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const svc = new PlatformServiceService();
      await svc.deleteOrRestore(service.id!);
      setIsModified(true);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const init = async () => {
    try {
      const svc = new PlatformServiceService();
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
      <h1 className='text-2xl my-4'>Manage Platform Services</h1>

      <PlatformServiceForm
        service={service}
        // @ts-ignore
        handleChange={handleChange}
        handleOpen={() => handleOpen('create')}
        isLoading={isLoading}
        mode={open && service.id ? 'update' : 'new'}
        open={open}
        save={save}
      />

      <DeleteDialog
        action={handleDelete}
        mode='delete'
        open={isDeleteOpen}
        toggleOpen={() => setIsDeleteOpen(!isDeleteOpen)}
        isLoading={isLoading}
        message='Are you sure you want to delete this platform service?'
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
