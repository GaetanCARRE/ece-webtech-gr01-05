import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="text-red">
        <h1 className='text-red'>Welcome to my app!</h1>
        <p>Click <Link href="/about">here</Link> to learn more about us.</p>
      </div>
      <div className="bg-red-500">
        Cet élément a un arrière-plan rouge
      </div>
      <Footer />
    </>
  );
}
