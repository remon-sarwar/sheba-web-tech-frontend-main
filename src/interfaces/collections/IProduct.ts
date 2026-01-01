import { IBaseEntity } from '../Common';

export interface IProduct extends IBaseEntity {
  name: string;
  price: number;
  specialPrice: number;
  description: string;
  images: any[];
}
