import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'

const login = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className='flex justify-center'>
        <div className="container text-black" style={{ padding: '50px 0 100px 0' }}>
        {!session ? (
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="light" />
        ) : (
            <Account session={session} />
        )}
        </div>
    </div>
  )
}

export default login