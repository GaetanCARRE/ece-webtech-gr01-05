import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <div className='flex flex-col h-screen '>
      <Header />
      <div className='flex-grow dark:bg-stone-900'>
        <h1 className='text-black py-10 text-center text-3xl font-bold dark:bg-stone-900 dark:text-white'>About Us</h1>
        <p className='text-black text-lg px-20 py-5 dark:bg-stone-900 dark:text-white'>
          Welcome to Culture And Streewear, your go-to online destination for the latest and greatest in streetwear fashion. Our selection of sneakers and clothing is carefully curated to bring you the freshest styles from the biggest brands and up-and-coming designers.
        </p>
        <p className='text-black text-lg px-20 py-5 dark:bg-stone-900 dark:text-white'>
          At Culture And Streewear, we know that streetwear isn&apos;t just about looking good – it&apos;s a way of life. That&apos;s why we&apos;re committed to offering the highest quality products that not only make you look good, but make you feel good too.
        </p>
        <p className='text-black text-lg px-20 py-5 dark:bg-stone-900 dark:text-white'>
          Whether you&apos;re a seasoned sneakerhead or just dipping your toes into the world of streetwear fashion, we&apos;ve got something for you. Shop our collection today and join the global community of fashion-forward individuals who are making their mark on the world, one street at a time.
        </p>
      </div>
      <Footer />
      </div>
    </>
  );
}
