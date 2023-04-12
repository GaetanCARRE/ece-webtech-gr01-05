import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CheckoutPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className='text-black text-center flex-grow'>
        <h1 className='text-4xl p-10'>Checkout</h1>
      </div>
      <Footer className="flex-shrink-0" />
    </div>
  );
}
