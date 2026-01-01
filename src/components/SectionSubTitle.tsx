import React from 'react';

export interface ISectionSubTitle {
  subtitle: string;
}

const SectionSubTitle: React.FC<ISectionSubTitle> = ({ subtitle }) => {
  return (
    <div className='italic my-4'>
      <p>{subtitle}</p>
    </div>
  );
};

export default SectionSubTitle;
