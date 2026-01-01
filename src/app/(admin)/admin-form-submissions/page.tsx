'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MdDelete, MdEdit, MdRestore } from 'react-icons/md';
import FormSubmissionForm from './components/FormSubmissionForm';
import DeleteDialog from '@/components/DeleteDialog';
import { DataTable } from '@/components/ui/data-table';
import { IFormSubmission } from '../components/types';
import FormSubmissionService from '@/endpoints/admin/FormSubmissionService';

const Page = () => {
  const [data, setData] = useState<IFormSubmission[]>([]);
  const [submission, setSubmission] = useState<Partial<IFormSubmission>>({});
  const [open, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptySubmission: Partial<IFormSubmission> = {
    name: '',
    email: '',
    details: '',
    servicetype: '',
    isDeleted: false
  };

  const handleChange = (value: string, fieldName: string) => {
    setSubmission(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleOpen = (
    mode: 'create' | 'update' = 'create',
    id?: string | number
  ) => {
    setOpen(!open);
    if (mode === 'update' && id !== undefined) {
      const selected = getSubmission(id);
      setSubmission(selected);
    } else {
      setSubmission(emptySubmission);
    }
  };

  const handleDeleteOpen = (id: string | number) => {
    setIsDeleteOpen(!isDeleteOpen);
    const toDelete = getSubmission(id);
    setSubmission(toDelete);
  };

  const getSubmission = (id: string | number) =>
    data.find(item => item.id === id) || emptySubmission;

  const columns: ColumnDef<IFormSubmission>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Service Type', accessorKey: 'servicetype' },
    { header: 'Details', accessorKey: 'details' },
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
      const svc = new FormSubmissionService();
      if (submission.id) {
        await svc.update(submission.id, submission);
      } else {
        await svc.create(submission);
      }
      setIsModified(true);
      setSubmission(emptySubmission);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const svc = new FormSubmissionService();
      await svc.deleteOrRestore(submission.id!);
      setIsModified(true);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  const init = async () => {
    try {
      const svc = new FormSubmissionService();
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
      <h1 className='text-2xl my-4'>Manage Form Submissions</h1>

      <FormSubmissionForm
        submission={submission}
        // @ts-ignore
        handleChange={handleChange}
        handleOpen={() => handleOpen('create')}
        isLoading={isLoading}
        mode={open && submission.id ? 'update' : 'new'}
        open={open}
        save={save}
      />

      <DeleteDialog
        action={handleDelete}
        mode='delete'
        open={isDeleteOpen}
        toggleOpen={() => setIsDeleteOpen(!isDeleteOpen)}
        isLoading={isLoading}
        message='Are you sure you want to delete this submission?'
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
