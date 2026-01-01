'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IProduct } from '../../components/types';
import IFormDialog, { IRenderLoading } from '@/interfaces/Common';

export interface IProductForm extends IFormDialog, IRenderLoading {
  product: Partial<IProduct>;
}

const ProductForm: React.FC<IProductForm> = ({
  handleChange,
  mode = 'new',
  handleOpen,
  isLoading,
  open,
  product,
  save
}) => {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild className='mb-4'>
        <Button
          variant='default'
          className='bg-button-primary hover:bg-black'
          size='default'
        >
          {mode === 'new' ? 'Create Product' : 'Edit Product'}
        </Button>
      </DialogTrigger>

      <DialogContent
        className='sm:max-w-[425px] max-w-1/2'
        onSubmit={e => e.preventDefault()}
      >
        <form onSubmit={save}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'new' ? 'Create New' : 'Update'} Product
            </DialogTitle>
            <DialogDescription>
              {mode === 'new'
                ? 'Create a new product'
                : 'Update product details'}
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-left'>
                Name
              </Label>
              <Input
                id='name'
                placeholder='Product Name'
                className='col-span-3'
                value={product.name || ''}
                onChange={e => handleChange(e.target.value, 'name')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='quota' className='text-left'>
                Quota
              </Label>
              <Input
                id='quota'
                placeholder='Quota'
                className='col-span-3'
                value={product.quota || ''}
                onChange={e => handleChange(e.target.value, 'quota')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='bwlimit' className='text-left'>
                Bandwidth Limit
              </Label>
              <Input
                id='bwlimit'
                placeholder='Bandwidth Limit'
                className='col-span-3'
                value={product.bwlimit || ''}
                onChange={e => handleChange(e.target.value, 'bwlimit')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='price' className='text-left'>
                Price
              </Label>
              <Input
                id='price'
                type='number'
                placeholder='Price'
                className='col-span-3'
                value={product.price ?? ''}
                onChange={e => handleChange(Number(e.target.value), 'price')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maxaddon' className='text-left'>
                Max Addon
              </Label>
              <Input
                id='maxaddon'
                placeholder='Max Addon'
                className='col-span-3'
                value={product.maxaddon || ''}
                onChange={e => handleChange(e.target.value, 'maxaddon')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maxsub' className='text-left'>
                Max Sub
              </Label>
              <Input
                id='maxsub'
                placeholder='Max Sub'
                className='col-span-3'
                value={product.maxsub || ''}
                onChange={e => handleChange(e.target.value, 'maxsub')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maxpop' className='text-left'>
                Max POP
              </Label>
              <Input
                id='maxpop'
                placeholder='Max POP'
                className='col-span-3'
                value={product.maxpop || ''}
                onChange={e => handleChange(e.target.value, 'maxpop')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maxftp' className='text-left'>
                Max FTP
              </Label>
              <Input
                id='maxftp'
                placeholder='Max FTP'
                className='col-span-3'
                value={product.maxftp || ''}
                onChange={e => handleChange(e.target.value, 'maxftp')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maxsql' className='text-left'>
                Max SQL
              </Label>
              <Input
                id='maxsql'
                placeholder='Max SQL'
                className='col-span-3'
                value={product.maxsql || ''}
                onChange={e => handleChange(e.target.value, 'maxsql')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maxemailaccT_QUOTA' className='text-left'>
                Max Email Acc Quota
              </Label>
              <Input
                id='maxemailaccT_QUOTA'
                placeholder='Max Email Account Quota'
                className='col-span-3'
                value={product.maxemailaccT_QUOTA ?? ''}
                onChange={e =>
                  handleChange(e.target.value, 'maxemailaccT_QUOTA')
                }
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maX_EMAIL_PER_HOUR' className='text-left'>
                Max Email per Hour
              </Label>
              <Input
                id='maX_EMAIL_PER_HOUR'
                placeholder='Max Email per Hour'
                className='col-span-3'
                value={product.maX_EMAIL_PER_HOUR || ''}
                onChange={e =>
                  handleChange(e.target.value, 'maX_EMAIL_PER_HOUR')
                }
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maxpassengerapps' className='text-left'>
                Max Passenger Apps
              </Label>
              <Input
                id='maxpassengerapps'
                placeholder='Max Passenger Apps'
                className='col-span-3'
                value={product.maxpassengerapps || ''}
                onChange={e => handleChange(e.target.value, 'maxpassengerapps')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='ip' className='text-left'>
                IP
              </Label>
              <Input
                id='ip'
                placeholder='IP'
                className='col-span-3'
                value={product.ip || ''}
                onChange={e => handleChange(e.target.value, 'ip')}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='destructive'
              onClick={() => handleOpen()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
