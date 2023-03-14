import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image'
import mypic from '/img/home.jpeg'

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="text-red">
        <h1 className='text-red'>Welcome to my app!</h1>
        <p>Click <Link href="/about">here</Link> to learn more about us.</p>
        <Image
          src={mypic}
          alt="Picture of the author"
          width="350px"
          height="300px"
        />

      </div>
      <Footer />
    </>
  );
}
