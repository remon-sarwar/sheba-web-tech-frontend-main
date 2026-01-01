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
import { IAppUser } from '../../components/types';
import IFormDialog, { IRenderLoading } from '@/interfaces/Common';

export interface IUserForm extends IFormDialog, IRenderLoading {
  user: Partial<IAppUser>;
}

const UserForm: React.FC<IUserForm> = ({
  handleChange,
  mode = 'new',
  handleOpen,
  isLoading,
  open,
  user,
  save
}) => {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild className='mb-4'>
        <Button variant='default' className='bg-button-primary' size='default'>
          {mode === 'new' ? 'Create User' : 'Edit User'}
        </Button>
      </DialogTrigger>

      <DialogContent
        className='sm:max-w-[425px] max-w-1/2'
        onSubmit={e => e.preventDefault()}
      >
        <form onSubmit={save}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'new' ? 'Create New' : 'Update'} User
            </DialogTitle>
            <DialogDescription>
              {mode === 'new' ? 'Create a new user' : 'Update user details'}
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='userName' className='text-left'>
                Username
              </Label>
              <Input
                id='userName'
                placeholder='Username'
                className='col-span-3'
                value={user.userName || ''}
                onChange={e => handleChange(e.target.value, 'userName')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email' className='text-left'>
                Email
              </Label>
              <Input
                id='email'
                placeholder='Email'
                className='col-span-3'
                type='email'
                value={user.email || ''}
                onChange={e => handleChange(e.target.value, 'email')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='fullName' className='text-left'>
                Full Name
              </Label>
              <Input
                id='fullName'
                placeholder='Full Name'
                className='col-span-3'
                value={user.fullName || ''}
                onChange={e => handleChange(e.target.value, 'fullName')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='address' className='text-left'>
                Address
              </Label>
              <Input
                id='address'
                placeholder='Address'
                className='col-span-3'
                value={user.address || ''}
                onChange={e => handleChange(e.target.value, 'address')}
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

export default UserForm;
