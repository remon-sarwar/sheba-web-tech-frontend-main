import { IParent } from '@/interfaces/Common';
import React from 'react';

const SectionWrapper: React.FC<IParent> = ({
  children,
  className = '',
  bgImage,
  bgPosition
}) => {
  return (
    <div
      className={`w-full flex justify-center ${className}`}
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: bgPosition || 'center'
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};
export default SectionWrapper;
