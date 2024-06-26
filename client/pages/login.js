import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session])

  return (
    <div className='flex justify-center'>
      <div className="container text-black" style={{ padding: '50px 0 100px 0' }}>
        {!session ? (
          <Auth
            redirectTo="/profile"
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'github']}
            theme="light"
          />
        ) : (
          null
        )}
      </div>
    </div>
  )
}


export default Login
