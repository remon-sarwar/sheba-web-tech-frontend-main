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
import IFormDialog, { IRenderLoading } from '@/interfaces/Common';

export interface IPromoEmail {
  to?: string;
  subject?: string;
  body?: string;
}

export interface IPromoEmailForm extends IFormDialog, IRenderLoading {
  email: Partial<IPromoEmail>;
  error: string | null;
  success: string | null;
}

const PromoEmailForm: React.FC<IPromoEmailForm> = ({
  handleChange,
  mode = 'new',
  handleOpen,
  isLoading,
  open,
  email,
  error,
  success,
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
          {mode === 'new' ? 'Send Email' : 'Send Email'}
        </Button>
      </DialogTrigger>

      <DialogContent
        className='sm:max-w-[450px] lg:min-w-1/2 max-w-3xl'
        onSubmit={e => e.preventDefault()}
      >
        <form onSubmit={save}>
          <DialogHeader>
            <DialogTitle>
              {mode === 'new' ? 'Send New Email' : 'Send Email'}
            </DialogTitle>
            <DialogDescription>
              Fill out the form to send a promotional email.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className='text-red-600 text-sm border border-red-300 bg-red-50 p-2 rounded'>
              {error}
            </div>
          )}

          {success && (
            <div className='text-green-700 text-sm border border-green-300 bg-green-50 p-2 rounded'>
              {success}
            </div>
          )}

          <div className='grid gap-4 py-4'>
            {/* To Email */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='to' className='text-left'>
                To
              </Label>
              <Input
                id='to'
                placeholder='Recipient Email'
                className='col-span-3'
                value={email.to || ''}
                onChange={e => handleChange(e.target.value, 'to')}
                required
              />
            </div>

            {/* Subject */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='subject' className='text-left'>
                Subject
              </Label>
              <Input
                id='subject'
                placeholder='Email Subject'
                className='col-span-3'
                value={email.subject || ''}
                onChange={e => handleChange(e.target.value, 'subject')}
                required
              />
            </div>

            {/* Body (Textarea) */}
            <div className='grid grid-cols-4 items-start gap-4'>
              <Label htmlFor='body' className='text-left mt-2'>
                Body
              </Label>
              <textarea
                id='body'
                placeholder='Email content...'
                className='col-span-3 border rounded p-2 h-40'
                value={email.body || ''}
                onChange={e => handleChange(e.target.value, 'body')}
                required
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
            <Button
              type='submit'
              disabled={isLoading || !email.to || !email.subject || !email.body}
            >
              Send
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PromoEmailForm;
