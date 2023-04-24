import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutContext from '../components/CheckoutContext';
import { useContext } from 'react';
export default function CheckoutPage() {
  const { checkout } = useContext(CheckoutContext);
  console.log(checkout);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {checkout.length > 0 ? (
        <div className="flex-grow">
          <h1 className="text-black py-10 text-center text-3xl font-bold">
            Checkout
          </h1>
          <div className="flex flex-col items-center">
            {checkout.map((article) => (
              <div key={article.id} className="flex flex-col items-center">
                <h2 className="text-black text-xl font-bold">{article.id}</h2>
                <h2 className="text-black text-xl font-bold">{article.size}</h2>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-black text-3xl font-bold">
            Your cart is empty
          </h1>
        </div>
      )}

      <Footer className="flex-shrink-0" />
    </div>
  );
}
