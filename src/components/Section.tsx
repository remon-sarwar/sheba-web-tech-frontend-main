import { ISection } from '@/interfaces/Common';
import React from 'react';

const Section: React.FC<ISection> = ({
  children,
  className = 'w-11/12 lg:w-10/12'
}) => {
  return <section className={`${className}`}>{children}</section>;
};

export default Section;
