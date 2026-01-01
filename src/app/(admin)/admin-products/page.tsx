'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { MdDelete, MdEdit, MdRestore } from 'react-icons/md';
import ProductForm from './components/ProductForm';
import DeleteDialog from '@/components/DeleteDialog';
import { DataTable } from '@/components/ui/data-table';
import { IProduct } from '../components/types';
import ProductService from '@/endpoints/admin/ProductService';

const Page = () => {
  const [data, setData] = useState<IProduct[]>([]);

  const emptyProduct: Partial<IProduct> = {
    name: '',
    quota: '',
    bwlimit: '',
    price: 0,
    maxaddon: '',
    maxsub: '',
    maxpop: '',
    maxftp: '',
    maxsql: '',
    maxemailaccT_QUOTA: null,
    maX_EMAIL_PER_HOUR: '',
    maxpassengerapps: '',
    ip: '',
    isDeleted: false
  };

  const [product, setProduct] = useState<Partial<IProduct>>({});
  const [open, setOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generic field update
  const handleChange = (
    newVal: string | number | File | null,
    fieldName: string | keyof IProduct
  ) => {
    setProduct(prev => ({
      ...prev,
      [fieldName]: newVal
    }));
  };

  const handleOpen = (mode: 'create' | 'update', id?: number) => {
    setOpen(!open);
    if (mode === 'update' && id !== undefined) {
      const selected = getProduct(id);
      setProduct(selected);
    } else {
      setProduct(emptyProduct);
    }
  };

  const handleDeleteOpen = (id: number) => {
    setIsDeleteOpen(!isDeleteOpen);
    const toDelete = getProduct(id);
    setProduct(toDelete);
  };

  const getProduct = (id: number) => {
    const temp = data.find(item => item.id === id);
    return temp || emptyProduct;
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      header: 'Name',
      accessorKey: 'name'
    },
    {
      header: 'Quota',
      accessorKey: 'quota'
    },
    {
      header: 'Price',
      accessorKey: 'price'
    },
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

  // API calling handlers
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const svc = new ProductService();
      if (product?.id) {
        await svc.update(product.id, product);
      } else {
        await svc.create(product);
      }
      setIsModified(true);
      setProduct(emptyProduct);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  async function handleDelete() {
    setIsLoading(true);
    try {
      const svc = new ProductService();
      await svc.deleteOrRestore(product.id!);
      setIsModified(true);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }

  async function init() {
    try {
      const svc = new ProductService();
      const list: Partial<IProduct>[] = await svc.getAll();
      // @ts-ignore
      setData(list);
      setIsModified(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (isModified) init();
  }, [isModified]);

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl my-4'>Manage Products</h1>

      <ProductForm
        product={product}
        handleChange={handleChange}
        handleOpen={() => handleOpen('create')}
        isLoading={isLoading}
        mode={open && product?.id ? 'update' : 'new'}
        open={open}
        save={save}
      />

      <DeleteDialog
        action={handleDelete}
        mode='delete'
        open={isDeleteOpen}
        toggleOpen={() => setIsDeleteOpen(!isDeleteOpen)}
        isLoading={isLoading}
        message='Are you sure you want to delete this product?'
      />

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
