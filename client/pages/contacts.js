// pages/contacts.js

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactsPage() {
  return (
    <>
      <Header />
      <div>
        <h1>Contact Us</h1>
        <ul>
          <li>Email: <Link href="mailto:contact@myapp.com">gaetan.carre@edu.ece.fr</Link></li>
          <li>Phone: <Link href="tel:0781762870">0781762870</Link></li>
          <li>GitHub: <Link href="github.com/GaetanCARRE">GaetanCARRE</Link></li>
        </ul>
        <p>Click <Link href="/">here</Link> to go back to the homepage.</p>
      </div>
      <Footer />
    </>
  );
}
