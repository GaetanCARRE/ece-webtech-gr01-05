import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image'
import banner from '/img/banner2.jpeg'
import banner2 from '/img/banner.jpg'
import presentation_img1 from '/img/presentation_img1.jpg'
import presentation_img2 from '/img/presentation_img2.jpg'
import presentation_img3 from '/img/presentation_img3.jpg'
import Carousel from '../components/Carousel';

const images = [
  banner,
  banner2,
];


export default function HomePage() {
  return (
    <div className='dark:bg-neutral-900'>
      <Header />
      <div className="lg:w-full bg-black mb-40 bg-transparent dark:bg-neutral-900">
        <Carousel loop>
          {images.map((src, key) => {
            return (
              <div key={key} className="relative h-64 flex-[0_0_100%] bg-transparent dark:bg-neutral-900">
                <Image
                  src={src}
                  alt="Picture of the author"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <h1 className='text-black text-center text-2xl py-16 dark:bg-neutral-900 dark:text-white'>
        OUR COLLECTION
      </h1>
      <div className='grid grid-cols-3 gap-x-20 px-20 pb-10 dark:bg-neutral-900'>

        <div className='dark:bg-neutral-900'>
          <Image
            src={presentation_img1}
            alt="Picture of the author"
            width="350px"
            height="300px"
          />
          <h2 className='text-black text-xl dark:bg-neutral-900 dark:text-white'>THE NORTH FACE</h2>
        </div>
        <div className='dark:bg-neutral-900'>
          <Image
            src={presentation_img2}
            alt="Picture of the author"
            width="350px"
            height="300px"
          />
          <h2 className='text-black text-xl dark:bg-neutral-900 dark:text-white'>STUSSY</h2>
        </div>
        <div className='dark:bg-neutral-900'>
          <Image
            src={presentation_img3}
            alt="Picture of the author"
            width="350px"
            height="300px"
          />
          <h2 className='text-black text-xl dark:bg-neutral-900 dark:text-white'>PARRA</h2>
        </div>
      </div>

      <Footer />
    </div>
  );
}