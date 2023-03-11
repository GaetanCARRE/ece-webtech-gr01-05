import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div>
        <h1>About Us</h1>
        <p>We are a team of developers who love building apps with Next.js.</p>
        <p>Click <Link href="/">here</Link> to go back to the homepage.</p>
      </div>
      <Footer />
    </>
  );
}
