import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';

const FooterComponent = () => {
  return (
    <div className="bg-black py-4">
      <ul className="flex justify-center space-x-4 bg-black">
              <li className='bg-transparent'>
                <Link href="/" className="hover:text-gray-400 bg-transparent">
                  <FaInstagram className='bg-transparent'/>
                </Link>
              </li>
              <li className='bg-transparent'>
                <Link href="/" className="hover:text-gray-400 bg-transparent">
                  <FaTwitter className='bg-transparent'/>
                </Link>
              </li>
              <li className='bg-transparent'>
                <Link href="/" className="hover:text-gray-400 bg-transparent">
                  <FaFacebook className='bg-transparent'/>
                </Link>
              </li>
              <li className='bg-transparent'>
                <Link href="/" className="hover:text-gray-400 bg-transparent">
                  <FaTiktok className='bg-transparent'/>
                </Link>
              </li>
      </ul>
      <ul className="flex justify-center space-x-4 bg-black">
        <li className="text-center text-gray-100 pt-4 text-sm bg-black">
          <Link href="/about" className='hover:text-gray-400 bg-transparent'>About</Link>
        </li>
        <li className="text-center text-gray-100 pt-4 text-sm bg-black">
          <Link href="/" className='hover:text-gray-400 bg-transparent'>Home</Link>
        </li>
        <li className="text-center text-gray-100 pt-4 text-sm bg-black">
          <Link href="/contacts" className='hover:text-gray-400 bg-transparent'>Contacts</Link>
        </li>
      </ul>
      <p className="text-center text-gray-100 pt-4 text-sm bg-black">&copy; 2023</p>
    </div>
  );
};

export default FooterComponent;

