import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';

const FooterComponent = () => {
  return (
    <div className="bg-neutral-800 py-8 text-lg text-white">
      <ul className="flex justify-center space-x-4 bg-neutral-800">
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
      <p className="text-center text-gray-100 pt-4 bg-neutral-800">&copy; 2023</p>
    </div>
  );
};

export default FooterComponent;

