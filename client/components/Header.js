import React from 'react';
import Link from 'next/link';
import { BiHomeAlt2, BiLogOutCircle, BiLogInCircle, BiKnife } from 'react-icons/bi';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
const HeaderComponent = () => {
  const supabase = useSupabaseClient()
  // vérifier si un utilisateur est connecté
  const user = useUser()
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
              {/* si l'utilisateur est connecté, afficher le bouton de déconnexion, sinon afficher le bouton de connexion */}
              {user ? (
                <li className='bg-transparent'>
                  <button className="button block bg-transparent" onClick={() => supabase.auth.signOut()}>
                    <BiLogOutCircle className='bg-transparent'/>
                  </button>
                </li>
              ) : (
                <li className='bg-transparent'>
                  <Link href="/login" className="hover:text-gray-400 bg-transparent">
                    <BiLogInCircle className='bg-transparent'/>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
