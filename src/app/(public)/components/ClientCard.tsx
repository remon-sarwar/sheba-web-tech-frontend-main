import React from 'react';

interface ClientCardProps {
  imageURL: string;
  siteURL?: string;
  alt: string;
}

const ClientCard: React.FC<ClientCardProps> = ({ imageURL, alt, siteURL }) => {
  return (
    <div className='w-full max-w-xs mx-auto px-4 py-4'>
      <a href={siteURL || '#'}>
        <img
          src={imageURL}
          alt={alt}
          className='lg:h-10 grayscale hover:grayscale-0 transition duration-300 lg:w-auto h-auto'
        />
      </a>
    </div>
  );
};

export default ClientCard;
