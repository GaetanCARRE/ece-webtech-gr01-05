import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CheckoutPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Footer className="flex-shrink-0" />
    </div>
  );
}
