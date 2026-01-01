export interface IBaseEntity {
  id: number | string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IParent {
  children?: React.ReactNode;
  className?: string;
  bgImage?: string;
  bgPosition?: string;
}

export interface ISection extends IParent {}

export interface IRenderLoading {
  isLoading: boolean;
}

export default interface IFormDialog {
  open: boolean;
  mode: 'new' | 'update';
  handleOpen: () => void;
  save: (e: React.FormEvent) => void;
  handleChange: (newValue: string | number | File, fieldName: string) => void;
}

export interface IDeleteDialog extends IRenderLoading {
  open: boolean;
  mode: 'delete' | 'restore';
  message: string;
  toggleOpen: () => void;
  action: (e: React.FormEvent) => void;
}
