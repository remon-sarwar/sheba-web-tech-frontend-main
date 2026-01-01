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
import { IPlatformService } from '../../components/types';
import IFormDialog, { IRenderLoading } from '@/interfaces/Common';

export interface IPlatformServiceForm extends IFormDialog, IRenderLoading {
  service: Partial<IPlatformService>;
}

const PlatformServiceForm: React.FC<IPlatformServiceForm> = ({
  handleChange,
  mode = 'new',
  handleOpen,
  isLoading,
  open,
  service,
  save
}) => {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild className='mb-4'>
        <Button variant='default' className='bg-button-primary' size='default'>
          {mode === 'new' ? 'Create Platform Service' : 'Edit Platform Service'}
        </Button>
      </DialogTrigger>

      <DialogContent
        className='sm:max-w-[500px] max-w-1/2'
        onSubmit={e => e.preventDefault()}
      >
        <form onSubmit={save}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'new' ? 'Create New' : 'Update'} Platform Service
            </DialogTitle>
            <DialogDescription>
              {mode === 'new'
                ? 'Add a new platform service'
                : 'Update service details'}
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
                value={service.name || ''}
                onChange={e => handleChange(e.target.value, 'name')}
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
                value={service.description || ''}
                onChange={e => handleChange(e.target.value, 'description')}
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

export default PlatformServiceForm;
