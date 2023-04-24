import { CheckoutContextProvider } from '../components/CheckoutContext';
import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <CheckoutContextProvider>
          <Component {...pageProps}/> 
        </CheckoutContextProvider>
      </SessionContextProvider>
    
  );
}


export default MyApp
