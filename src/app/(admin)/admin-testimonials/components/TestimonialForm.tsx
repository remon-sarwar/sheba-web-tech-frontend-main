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
import { ITestimonial } from '../../components/types';
import IFormDialog, { IRenderLoading } from '@/interfaces/Common';

export interface ITestimonialForm extends IFormDialog, IRenderLoading {
  testimonial: Partial<ITestimonial>;
}

const TestimonialForm: React.FC<ITestimonialForm> = ({
  handleChange,
  mode = 'new',
  handleOpen,
  isLoading,
  open,
  testimonial,
  save
}) => {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild className='mb-4'>
        <Button variant='default' className='bg-button-primary' size='default'>
          {mode === 'new' ? 'Create Testimonial' : 'Edit Testimonial'}
        </Button>
      </DialogTrigger>

      <DialogContent
        className='sm:max-w-[500px] max-w-1/2'
        onSubmit={e => e.preventDefault()}
      >
        <form onSubmit={save}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'new' ? 'Create New' : 'Update'} Testimonial
            </DialogTitle>
            <DialogDescription>
              {mode === 'new'
                ? 'Add a new testimonial'
                : 'Update testimonial details'}
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
                value={testimonial.name || ''}
                onChange={e => handleChange(e.target.value, 'name')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='designation' className='text-left'>
                Designation
              </Label>
              <Input
                id='designation'
                placeholder='Designation'
                className='col-span-3'
                value={testimonial.designation || ''}
                onChange={e => handleChange(e.target.value, 'designation')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='quote' className='text-left'>
                Quote
              </Label>
              <Input
                id='quote'
                placeholder='Quote'
                className='col-span-3'
                value={testimonial.quote || ''}
                onChange={e => handleChange(e.target.value, 'quote')}
              />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='imageURL' className='text-left'>
                Image
              </Label>
              <Input
                id='imageURL'
                type='file'
                className='col-span-3'
                onChange={e =>
                  e.target.files && handleChange(e.target.files[0], 'imageURL')
                }
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

export default TestimonialForm;
