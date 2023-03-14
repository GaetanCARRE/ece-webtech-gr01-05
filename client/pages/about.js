import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div>
        <h1 className='text-black py-10 text-center text-3xl font-bold'>About Us</h1>
        <p className='text-black text-lg px-20 py-5'>
          Welcome to Culture And Streewear, your go-to online destination for the latest and greatest in streetwear fashion. Our selection of sneakers and clothing is carefully curated to bring you the freshest styles from the biggest brands and up-and-coming designers.
        </p>
        <p className='text-black text-lg px-20 py-5'>
          At Culture And Streewear, we know that streetwear isn't just about looking good – it's a way of life. That's why we're committed to offering the highest quality products that not only make you look good, but make you feel good too.
        </p>
        <p className='text-black text-lg px-20 py-5'>
          Whether you're a seasoned sneakerhead or just dipping your toes into the world of streetwear fashion, we've got something for you. Shop our collection today and join the global community of fashion-forward individuals who are making their mark on the world, one street at a time.
        </p>
        <p>Click <Link href="/">here</Link> to go back to the homepage.</p>
      </div>
      <Footer />
    </>
  );
}
