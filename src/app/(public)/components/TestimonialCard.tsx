import React from 'react';

import userImage from '../../../../public/images/user.png';

export interface ITestimonialCard {
  name: string;
  designation: string;
  imageURL?: string;
  quote: string;
}

const TestimonialCard: React.FC<ITestimonialCard> = ({
  name,
  designation,
  imageURL = userImage.src,
  quote
}) => {
  return (
    <div className='bg-card-primary rounded-lg flex flex-col items-center py-12 px-4'>
      <img src={imageURL} alt='' className='my-2 w-20' />
      <h3 className='text-xl my-2 text-center'>{name}</h3>
      <p className='my-2 text-center'>{designation}</p>
      <p className='italic text-center'>{quote}</p>
    </div>
  );
};

export default TestimonialCard;
