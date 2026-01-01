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
import { IFormSubmission } from '../../components/types';
import IFormDialog, { IRenderLoading } from '@/interfaces/Common';

export interface IFormSubmissionForm extends IFormDialog, IRenderLoading {
  submission: Partial<IFormSubmission>;
}

const FormSubmissionForm: React.FC<IFormSubmissionForm> = ({
  handleChange,
  mode = 'new',
  handleOpen,
  isLoading,
  open,
  submission,
  save
}) => {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild className='mb-4'>
        <Button
          variant='default'
          className='bg-button-primary'
          disabled={mode === 'new'}
          size='default'
        >
          {mode === 'new' ? 'Create Submission' : 'Edit Submission'}
        </Button>
      </DialogTrigger>

      <DialogContent
        className='sm:max-w-[500px] max-w-1/2'
        onSubmit={e => e.preventDefault()}
      >
        <form onSubmit={save}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'new' ? 'Create New' : 'Update'} Form Submission
            </DialogTitle>
            <DialogDescription>
              {mode === 'new'
                ? 'Create a new submission entry'
                : 'Update submission details'}
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-left'>
                Name
              </Label>
              <Input
                id='name'
                placeholder='Name'
                className='col-span-3'
                value={submission.name || ''}
                onChange={e => handleChange(e.target.value, 'name')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email' className='text-left'>
                Email
              </Label>
              <Input
                id='email'
                placeholder='Email'
                type='email'
                className='col-span-3'
                value={submission.email || ''}
                onChange={e => handleChange(e.target.value, 'email')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='servicetype' className='text-left'>
                Service Type
              </Label>
              <Input
                id='servicetype'
                placeholder='Service Type'
                className='col-span-3'
                value={submission.servicetype || ''}
                onChange={e => handleChange(e.target.value, 'servicetype')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='details' className='text-left'>
                Details
              </Label>
              <Input
                id='details'
                placeholder='Details'
                className='col-span-3'
                value={submission.details || ''}
                onChange={e => handleChange(e.target.value, 'details')}
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

export default FormSubmissionForm;
