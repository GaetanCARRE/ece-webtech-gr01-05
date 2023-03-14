import React from 'react';
import Link from 'next/link';
import { BiHomeAlt2 } from 'react-icons/bi';
const HeaderComponent = () => {
  return (
    <div className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4 bg-transparent">
        <div className="flex justify-between items-center bg-transparent">
          <h1 className="text-2xl font-bold bg-transparent">CNS</h1>
          <nav className='bg-transparent'>
            <ul className="flex space-x-4 bg-transparent">
              <li className='bg-transparent'>
                <Link href="/" className="hover:text-gray-400 bg-transparent">
                  <BiHomeAlt2 className='bg-transparent'/>
                </Link>
              </li>      
              <li className='bg-transparent'>
                <Link href="/articles" className="hover:text-gray-400 bg-transparent">
                  Articles
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
