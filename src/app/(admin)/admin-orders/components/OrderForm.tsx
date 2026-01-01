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
import { IOrder } from '../../components/types';
import IFormDialog, { IRenderLoading } from '@/interfaces/Common';

export interface IOrderForm extends IFormDialog, IRenderLoading {
  order: Partial<IOrder>;
}

const OrderForm: React.FC<IOrderForm> = ({
  handleChange,
  mode = 'new',
  handleOpen,
  isLoading,
  open,
  order,
  save
}) => {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild className='mb-4'>
        <Button
          variant='default'
          className='bg-button-primary'
          size='default'
          disabled={mode === 'new'}
        >
          {mode === 'new' ? 'Create Order' : 'Edit Order'}
        </Button>
      </DialogTrigger>

      <DialogContent
        className='sm:max-w-[600px] max-w-1/2'
        onSubmit={e => e.preventDefault()}
      >
        <form onSubmit={save}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'new' ? 'Create New' : 'Update'} Order
            </DialogTitle>
            <DialogDescription>
              {mode === 'new'
                ? 'Create a new order entry'
                : 'Update order details'}
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='ownBy' className='text-left'>
                Owned By
              </Label>
              <Input
                id='ownBy'
                placeholder='Customer Name'
                className='col-span-3'
                value={order.ownBy || ''}
                onChange={e => handleChange(e.target.value, 'ownBy')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='packageName' className='text-left'>
                Package
              </Label>
              <Input
                id='packageName'
                placeholder='Package Name'
                className='col-span-3'
                value={order.packageName || ''}
                onChange={e => handleChange(e.target.value, 'packageName')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='producttype' className='text-left'>
                Product Type
              </Label>
              <Input
                id='producttype'
                placeholder='Product Type'
                className='col-span-3'
                value={order.producttype || ''}
                onChange={e => handleChange(e.target.value, 'producttype')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='domainName' className='text-left'>
                Domain
              </Label>
              <Input
                id='domainName'
                placeholder='Domain Name'
                className='col-span-3'
                value={order.domainName || ''}
                onChange={e => handleChange(e.target.value, 'domainName')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='expiryDate' className='text-left'>
                Expiry Date
              </Label>
              <Input
                id='expiryDate'
                type='date'
                className='col-span-3'
                value={order.expiryDate || ''}
                onChange={e => handleChange(e.target.value, 'expiryDate')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='payedAmount' className='text-left'>
                Payed Amount
              </Label>
              <Input
                id='payedAmount'
                type='number'
                placeholder='Amount'
                className='col-span-3'
                value={order.payedAmount || 0}
                onChange={e =>
                  handleChange(Number(e.target.value), 'payedAmount')
                }
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='hostedUsername' className='text-left'>
                Hosted Username
              </Label>
              <Input
                id='hostedUsername'
                placeholder='Hosted Username'
                className='col-span-3'
                value={order.hostedUsername || ''}
                onChange={e => handleChange(e.target.value, 'hostedUsername')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='hostedPassword' className='text-left'>
                Hosted Password
              </Label>
              <Input
                id='hostedPassword'
                placeholder='Hosted Password'
                className='col-span-3'
                value={order.hostedPassword || ''}
                onChange={e => handleChange(e.target.value, 'hostedPassword')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='nameserver1' className='text-left'>
                Nameserver 1
              </Label>
              <Input
                id='nameserver1'
                placeholder='ns1.example.com'
                className='col-span-3'
                value={order.nameserver1 || ''}
                onChange={e => handleChange(e.target.value, 'nameserver1')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='nameserver2' className='text-left'>
                Nameserver 2
              </Label>
              <Input
                id='nameserver2'
                placeholder='ns2.example.com'
                className='col-span-3'
                value={order.nameserver2 || ''}
                onChange={e => handleChange(e.target.value, 'nameserver2')}
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

export default OrderForm;
