import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image'
import banner from '/img/banner2.jpeg'
import banner2 from '/img/banner.jpg'
import presentation_img1 from '/img/presentation_img1.jpg'
import presentation_img2 from '/img/presentation_img2.jpg'
import presentation_img3 from '/img/presentation_img3.jpg'
import { useState } from 'react';
import Carousel from '../components/Carousel';

const images = [
  banner,
  banner2,
];


export default function HomePage() {
  return (
    <>
      <Header />
      <div className="lg:w-full bg-black mb-40">
        <Carousel loop>
          {images.map(src => {
            return (
              <div className="relative h-64 flex-[0_0_100%] bg-transparent">
                {/* use object-cover + fill since we don't know the height and width of the parent */}
                <Image
                  src={src}
                  alt="Picture of the author"
                  objectFit='cover'

                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <h1 className='text-black text-center text-2xl py-16'>
        OUR COLLECTION
      </h1>
      <div className='grid grid-cols-3 gap-x-20 px-20 pb-10'>

        <div>
          <Image
            src={presentation_img1}
            alt="Picture of the author"
            width="350px"
            height="300px"
          />
          <h2 className='text-black text-xl'>THE NORTH FACE</h2>
        </div>
        <div>
          <Image
            src={presentation_img2}
            alt="Picture of the author"
            width="350px"
            height="300px"
          />
          <h2 className='text-black text-xl'>STUSSY</h2>
        </div>
        <div>
          <Image
            src={presentation_img3}
            alt="Picture of the author"
            width="350px"
            height="300px"
          />
          <h2 className='text-black text-xl'>PARRA</h2>
        </div>
      </div>

      <Footer />
    </>
  );
}