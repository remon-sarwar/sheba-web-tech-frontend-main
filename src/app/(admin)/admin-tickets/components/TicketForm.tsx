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
import { ITicket } from '../../components/types';
import IFormDialog, { IRenderLoading } from '@/interfaces/Common';

export interface ITicketForm extends IFormDialog, IRenderLoading {
  ticket: Partial<ITicket>;
}

const TicketForm: React.FC<ITicketForm> = ({
  handleChange,
  mode = 'new',
  handleOpen,
  isLoading,
  open,
  ticket,
  save
}) => {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild className='mb-4'>
        <Button variant='default' className='bg-button-primary' size='default'>
          {mode === 'new' ? 'Create Ticket' : 'Edit Ticket'}
        </Button>
      </DialogTrigger>

      <DialogContent
        className='sm:max-w-[500px] max-w-1/2'
        onSubmit={e => e.preventDefault()}
      >
        <form onSubmit={save}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'new' ? 'Create New' : 'Update'} Ticket
            </DialogTitle>
            <DialogDescription>
              {mode === 'new' ? 'Add a new ticket' : 'Update ticket details'}
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='title' className='text-left'>
                Title
              </Label>
              <Input
                id='title'
                placeholder='Title'
                className='col-span-3'
                value={ticket.title || ''}
                onChange={e => handleChange(e.target.value, 'title')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description' className='text-left'>
                Description
              </Label>
              <Input
                id='description'
                placeholder='Description'
                className='col-span-3'
                value={ticket.description || ''}
                onChange={e => handleChange(e.target.value, 'description')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='userId' className='text-left'>
                User ID
              </Label>
              <Input
                id='userId'
                placeholder='User ID'
                className='col-span-3'
                value={ticket.userId || ''}
                onChange={e => handleChange(e.target.value, 'userId')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='status' className='text-left'>
                Status
              </Label>
              <Input
                id='status'
                placeholder='Status'
                className='col-span-3'
                value={ticket.status || ''}
                onChange={e => handleChange(e.target.value, 'status')}
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

export default TicketForm;
