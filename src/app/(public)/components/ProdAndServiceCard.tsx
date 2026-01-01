import { IPlatformService } from '@/app/(admin)/components/types';
import Link from 'next/link';
import React from 'react';

export interface IProdAndService {
  imageURL: string;
  title: string;
  description: string;
  isService?: boolean;
}

export interface IProdAndServiceCard {
  id: number | string;
  name: string;
  description: string;
  imageURL: string | File;
  isService?: boolean;
}

const ProdAndServiceCard: React.FC<Partial<IProdAndServiceCard>> = ({
  id,
  imageURL,
  name,
  description,
  isService
}) => {
  return (
    <div className='bg-white p-6 rounded-lg py-10 hover:scale-105 duration-300 opacity-80 shadow-lg shadow-neutral-200'>
      {/* <img className='w-12 h-12 object-cover my-2' src={imageURL} /> */}
      {isService ? (
        <Link href={`/services/${id}`}>
          <h3 className='text-2xl my-2 text-[#0081cc] font-bold hover:underline'>
            {name}
          </h3>
        </Link>
      ) : (
        <h3 className='text-2xl my-2 text-[#0081cc] font-bold'>{name}</h3>
      )}
      <p className='italic my-2'>{description}</p>
    </div>
  );
};

export default ProdAndServiceCard;
