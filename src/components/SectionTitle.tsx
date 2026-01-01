import React from 'react';

export interface ISectionTitle {
  title: string;
}

const SectionTitle: React.FC<ISectionTitle> = ({ title }) => {
  return (
    <div className='my-4 py-2'>
      <h2 className='text-3xl text-center font-bold'>{title}</h2>
    </div>
  );
};

export default SectionTitle;
