'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

import { addItem, removeItem } from '@/lib/features/cartSlice';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
// Redux things
import { openCart, closeCart } from '@/lib/features/cartSlice';

// Icons
import {
  MdAddShoppingCart,
  MdCheck,
  MdCheckBox,
  MdChecklist,
  MdShoppingCart
} from 'react-icons/md';
import { MdOutlineRemoveShoppingCart } from 'react-icons/md';
import SectionWrapper from '@/components/SectionWrapper';
import Section from '@/components/Section';

import bgImage from '../../../../../public/services-bg.png';
import { useCallback } from 'react';

interface CpanelBenefit {
  title: string;
  description: string;
}

const cpanelBenefits: CpanelBenefit[] = [
  {
    title: 'Easy Management',
    description:
      'Control domains, emails, files, and databases from one dashboard.'
  },
  {
    title: 'Flexibility',
    description:
      'From personal projects to growing businesses, scale your hosting as you need.'
  },
  {
    title: 'Performance & Security',
    description: 'Enjoy fast load times and enterprise-grade protection.'
  },
  {
    title: 'All-in-One Solution',
    description:
      'Everything you need to launch, manage, and grow your online presence.'
  }
];

const MainView: React.FC<{ packages: Array<{}> }> = ({ packages }) => {
  const { cart, isCartOpen } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const addToCart = (product: Record<string, string | number>) =>
    dispatch(addItem(product));

  const removeCartItem = (id: string | number) => dispatch(removeItem(id));

  const toggleCart = useCallback(() => {
    if (isCartOpen) {
      dispatch(closeCart());
    } else {
      dispatch(openCart());
    }
  }, [isCartOpen, dispatch]);

  return (
    <>
      <SectionWrapper className='py-16'>
        <Section>
          <h1 className='text-3xl text-primary text-center my-4 font-bold'>
            Choose the Right cPanel Hosting Plan for Your Business
          </h1>

          <p className='text-center my-2 italic'>
            With cPanel hosting, you get a simple, powerful way to manage your
            website.
          </p>
        </Section>
      </SectionWrapper>
      <SectionWrapper bgImage={bgImage.src} className='py-20'>
        <Section>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
            {packages.map((pkg: Record<string, string | number>) => (
              <Card
                key={pkg.id}
                className='rounded-2xl shadow-xl border border-muted py-10 px-4 hover:shadow-2xl transition duration-300 ease-in-out bg-white'
              >
                <CardContent className='space-y-4'>
                  <div className='flex flex-col items-center'>
                    <h2 className='text-3xl font-semibold text-primary/90'>
                      {pkg.name}
                    </h2>
                    <p className='text-xl font-bold text-emerald-600 py-4'>
                      ${pkg.price}
                      <span className='text-sm font-medium text-gray-500'>
                        {' '}
                        / year
                      </span>
                    </p>
                  </div>
                  <ul className='space-y-1 text-gray-700'>
                    {pkg.detailslist &&
                      // @ts-ignore
                      (pkg.detailslist as any[]).map(
                        (item: any, index: number) => (
                          <li
                            key={index}
                            className='uppercase py-2 border-b border-gray-200'
                          >
                            <strong>{item.key}</strong>
                            {item.value == undefined || ': ' + item.value}
                          </li>
                        )
                      )}
                  </ul>
                  <div className='pt-4 flex flex-col gap-2'>
                    <Button
                      onClick={() => {
                        addToCart(pkg);
                      }}
                      className='rounded-xl text-base bg-button-primary text-white hover:bg-primary/90 cursor-pointer disabled:cursor-not-allowed w-full break-words whitespace-normal h-auto'
                      disabled={!!cart.find(item => item.id === pkg.id)}
                    >
                      Add to Cart
                      <MdAddShoppingCart />
                    </Button>
                    <Button
                      onClick={() => {
                        removeCartItem(pkg.id);
                      }}
                      className='rounded-xl text-base bg-[#0081cc] text-white hover:bg-[#0081cc]/80 cursor-pointer disabled:cursor-not-allowed w-full break-words whitespace-normal h-auto'
                      disabled={!cart.find(item => item.id === pkg.id)}
                    >
                      Remove from Cart <MdOutlineRemoveShoppingCart />
                    </Button>
                    <Button
                      onClick={() => toggleCart()}
                      className='bg-white rounded-xl text-primary border border-primary hover:bg-neutral-200 cursor-pointer w-full break-words whitespace-normal h-auto'
                    >
                      {isCartOpen ? 'Close Cart' : 'Open Cart'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </SectionWrapper>

      <SectionWrapper className='py-20'>
        <Section>
          <h1 className='text-3xl text-primary text-center my-4 font-bold'>
            cPanel Hosting is Perfect for Anyone!
          </h1>

          <p className='text-center my-2 italic'>
            Starting a business? Go with cPanel hosting today!
          </p>
        </Section>
      </SectionWrapper>
      <SectionWrapper className='pb-16'>
        <Section>
          <div className='flex justify-center'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
              {cpanelBenefits.map((benefit: CpanelBenefit, i: number) => (
                <div
                  key={i}
                  className='rounded-lg shadow-lg shadow-neutral-200 duration-300 hover:shadow-neutral-300 p-6'
                >
                  <h3 className='font-bold text-2xl my-2 text-blue-400'>
                    {benefit.title}
                  </h3>
                  <p className=''>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </SectionWrapper>
    </>
  );
};

export default MainView;
