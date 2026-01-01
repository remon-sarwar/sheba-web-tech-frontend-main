'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MdDelete, MdEdit, MdRestore } from 'react-icons/md';
import TestimonialForm from './components/TestimonialForm';
import DeleteDialog from '@/components/DeleteDialog';
import { DataTable } from '@/components/ui/data-table';
import { ITestimonial } from '../components/types';
import TestimonialService from '@/endpoints/admin/TestimonialService';

const Page = () => {
  const [data, setData] = useState<ITestimonial[]>([]);
  const [testimonial, setTestimonial] = useState<Partial<ITestimonial>>({});
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptyTestimonial: Partial<ITestimonial> = {
    name: '',
    designation: '',
    quote: '',
    imageURL: '',
    isDeleted: false
  };

  const handleChange = (value: string | File, fieldName: string) => {
    setTestimonial(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleOpen = (
    mode: 'create' | 'update' = 'create',
    id?: string | number
  ) => {
    setOpen(!open);
    if (mode === 'update' && id !== undefined) {
      const selected = getTestimonial(id);
      setTestimonial(selected);
    } else {
      setTestimonial(emptyTestimonial);
    }
  };

  const handleDeleteOpen = (id: string | number) => {
    setIsDeleteOpen(!isDeleteOpen);
    const toDelete = getTestimonial(id);
    setTestimonial(toDelete);
  };

  const getTestimonial = (id: string | number) =>
    data.find(item => item.id === id) || emptyTestimonial;

  const columns: ColumnDef<ITestimonial>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Designation', accessorKey: 'designation' },
    { header: 'Quote', accessorKey: 'quote' },
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
      const svc = new TestimonialService();
      if (testimonial.id) {
        await svc.update(testimonial.id, testimonial);
      } else {
        await svc.create(testimonial);
      }
      setIsModified(true);
      setTestimonial(emptyTestimonial);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const svc = new TestimonialService();
      await svc.deleteOrRestore(testimonial.id!);
      setIsModified(true);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const init = async () => {
    try {
      const svc = new TestimonialService();
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
      <h1 className='text-2xl my-4'>Manage Testimonials</h1>

      <TestimonialForm
        testimonial={testimonial}
        // @ts-ignore
        handleChange={handleChange}
        handleOpen={() => handleOpen('create')}
        isLoading={isLoading}
        mode={open && testimonial.id ? 'update' : 'new'}
        open={open}
        save={save}
      />

      <DeleteDialog
        action={handleDelete}
        mode='delete'
        open={isDeleteOpen}
        toggleOpen={() => setIsDeleteOpen(!isDeleteOpen)}
        isLoading={isLoading}
        message='Are you sure you want to delete this testimonial?'
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
