import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../../../components/ui/alert-dialog';
import { IDeleteDialog } from '@/interfaces/Common';

const DeleteDialog: React.FC<IDeleteDialog> = ({
  open,
  action,
  isLoading,
  toggleOpen,
  mode,
  message
}) => {
  return (
    <AlertDialog open={open} onOpenChange={toggleOpen}>
      <AlertDialogTrigger asChild>{null}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mode === 'restore'
              ? 'This will be restored!'
              : 'This will be deleted!'}
          </AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={action}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
