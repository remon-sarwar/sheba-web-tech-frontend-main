import React from 'react';
import FramerSlider, { SlideItem } from './FramerSlider';

// images
import dotnet from '../../../../public/tech-stacks/microsoft-dotnet.png';
import aws from '../../../../public/tech-stacks/aws-logo.png';
import css from '../../../../public/tech-stacks/css-3.png';
import docker from '../../../../public/tech-stacks/docker.png';
import golang from '../../../../public/tech-stacks/golang.png';
import html from '../../../../public/tech-stacks/html-5.png';
import js from '../../../../public/tech-stacks/js.png';
import ts from '../../../../public/tech-stacks/typescript.png';
import react from '../../../../public/tech-stacks/react.png';
import nodejs from '../../../../public/tech-stacks/programing.png';
import nextjs from '../../../../public/tech-stacks/next-js.png';
import nestjs from '../../../../public/tech-stacks/nestjs.png';

const slides: SlideItem[] = [
  { imageURL: dotnet.src, title: '.NET' },
  { imageURL: aws.src, title: 'AWS' },
  { imageURL: html.src, title: 'HTML' },
  { imageURL: css.src, title: 'CSS' },
  { imageURL: js.src, title: 'JavaScript' },
  { imageURL: ts.src, title: 'TypeScript' },
  { imageURL: react.src, title: 'React' },
  { imageURL: nodejs.src, title: 'Node.js' },
  { imageURL: nextjs.src, title: 'Next.js' },
  { imageURL: nestjs.src, title: 'Nest.js' },
  { imageURL: docker.src, title: 'Docker' },
  { imageURL: golang.src, title: 'Go' }
];

const FramerTechStacks = () => {
  return (
    <section className='my-16'>
      <div className='flex justify-center w-full'>
        <h1 className='text-3xl text-center font-bold'>Our Tech Expertise</h1>
      </div>
      <div className='mt-16'></div>
      <FramerSlider slides={slides} />
    </section>
  );
};

export default FramerTechStacks;
