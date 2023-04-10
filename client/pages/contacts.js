import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactsPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className='text-black text-center flex-grow'>
        <h1 className='text-4xl p-10'>Contact Us</h1>
        <ul className='text-xl'>
          <li className='pb-2'>Email:</li>
          <li className='pb-8 hover:text-gray-500'> <Link href="mailto:contact@myapp.com">gaetan.carre@edu.ece.fr</Link></li>
          <li className='pb-2'>Phone:</li>
          <li className='pb-8 hover:text-gray-500'> <Link href="tel:0781762870">0781762870</Link></li>
          <li className='pb-2'>GitHub:</li>
          <li className='hover:text-gray-500'> <Link href="https://github.com/GaetanCARRE">GaetanCARRE</Link></li>
        </ul>
      </div>
      <Footer className="flex-shrink-0" />
    </div>
  );
}
