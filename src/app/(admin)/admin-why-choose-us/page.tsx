'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MdDelete, MdEdit, MdRestore } from 'react-icons/md';
import WhyChooseUsForm from './components/WhyChooseUsForm';
import DeleteDialog from '@/components/DeleteDialog';
import { DataTable } from '@/components/ui/data-table';
import { IWhyChooseUs } from '../components/types';
import WhyChooseUsService from '@/endpoints/admin/WhyChooseUsService';

const Page = () => {
  const [data, setData] = useState<IWhyChooseUs[]>([]);
  const [entry, setEntry] = useState<Partial<IWhyChooseUs>>({});
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptyEntry: Partial<IWhyChooseUs> = {
    title: '',
    description: '',
    imageURL: '',
    isDeleted: false
  };

  const handleChange = (value: string | File, fieldName: string) => {
    setEntry(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleOpen = (
    mode: 'create' | 'update' = 'create',
    id?: string | number
  ) => {
    setOpen(!open);
    if (mode === 'update' && id !== undefined) {
      const selected = getEntry(id);
      setEntry(selected);
    } else {
      setEntry(emptyEntry);
    }
  };

  const handleDeleteOpen = (id: string | number) => {
    setIsDeleteOpen(!isDeleteOpen);
    const toDelete = getEntry(id);
    setEntry(toDelete);
  };

  const getEntry = (id: string | number) =>
    data.find(item => item.id === id) || emptyEntry;

  const columns: ColumnDef<IWhyChooseUs>[] = [
    { header: 'Title', accessorKey: 'title' },
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
      const svc = new WhyChooseUsService();
      if (entry.id) {
        await svc.update(entry.id, entry);
      } else {
        await svc.create(entry);
      }
      setIsModified(true);
      setEntry(emptyEntry);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const svc = new WhyChooseUsService();
      await svc.deleteOrRestore(entry.id!);
      setIsModified(true);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const init = async () => {
    try {
      const svc = new WhyChooseUsService();
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
      <h1 className='text-2xl my-4'>Manage Why Choose Us</h1>

      <WhyChooseUsForm
        entry={entry}
        // @ts-ignore
        handleChange={handleChange}
        handleOpen={() => handleOpen('create')}
        isLoading={isLoading}
        mode={open && entry.id ? 'update' : 'new'}
        open={open}
        save={save}
      />

      <DeleteDialog
        action={handleDelete}
        mode='delete'
        open={isDeleteOpen}
        toggleOpen={() => setIsDeleteOpen(!isDeleteOpen)}
        isLoading={isLoading}
        message='Are you sure you want to delete this entry?'
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
