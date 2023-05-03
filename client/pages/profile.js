import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import Image from 'next/image';
import gravatar from 'gravatar'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function Profile({ user }) {
  const supabase = useSupabaseClient()
  const [username, setUsername] = useState(user.username)
  const [full_name, setFullname] = useState(user.full_name)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [birthdate, setBirthdate] = useState(new Date());


  useEffect(() => {
    getProfile()
  }, [user])

  const gravatarUrl = gravatar.url(user.email, { s: '200', r: 'pg', d: 'retro' })

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select('username, full_name')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setFullname(data.full_name)
      }
    } catch (error) {
      alert(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, full_name }) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        full_name,
        birthdate: birthdate.toISOString().split('T')[0], // Convertit la date en format ISO et supprime l'heure
        updated_at: new Date().toISOString(),
        email: user.email,
      };
      
      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert(error.message)
      console.log(error)
    } finally {
      setLoading(false)
      router.push('/')
    }
  }
  return (
    <>
      <div className='flex flex-col h-screen'>
        <div className="flex-grow form-widget isolate bg-white px-6 py-24 sm:py-20 lg:px-8">
          <div
            className="absolute inset-x-0 top-[-5rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Profile
            </h2>
          </div>
          <div className="flex items-center flex-col">
            <h2 className="text-lg font-medium text-gray-900 mb-2">User Profile Picture</h2>
            <Image src={`https:${gravatarUrl}`} alt='User Profile Picture' width={100} height={100} className='rounded-full' />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2.5">
                <input
                  id="username"
                  type="text"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400required"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2.5">
                <input
                  id="full_name"
                  type="text"
                  value={full_name || ''}
                  onChange={(e) => setFullname(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email" type="text" value={user.email}
                  disabled
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div>
              <label htmlFor="birthdate" className="block text-sm font-semibold leading-6 text-gray-900">
                Birthdate
              </label>
              <div className="mt-2.5">
                <DatePicker
                  id="birthdate"
                  selected={birthdate}
                  onChange={(date) => setBirthdate(date)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                />
              </div>
            </div>

          </div>
          <div className="mt-8 text-center sm:mt-10">
            <button
              onClick={() => updateProfile({ username, full_name })}
              className="inline-block w-full max-w-xs font-medium rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:max-w-none sm:px-8"
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}