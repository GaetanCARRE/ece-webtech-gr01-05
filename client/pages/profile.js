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
      <Header/>
      <div className='flex flex-col h-screen'>
        <div className="flex-grow form-widget isolate bg-white px-6 py-24 sm:py-20 lg:px-8 dark:bg-neutral-900">
          <div
            className="absolute inset-x-0 top-[-5rem] -z-10 transform-gpu overflow-hidden sm:top-[-20rem]"
            aria-hidden="true"
          >
          </div>
          <div className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:bg-neutral-900 dark:text-white">
              Profile
            </h2>
          </div>
          <div className="flex items-center flex-col dark:bg-neutral-900">
            <h2 className="text-lg font-medium text-gray-900 mb-2 dark:bg-neutral-900 dark:text-white">User Profile Picture</h2>
            <Image src={`https:${gravatarUrl}`} alt='User Profile Picture' width={100} height={100} className='rounded-full' />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 dark:bg-neutral-900">
            <div className='dark:bg-neutral-900'>
              <label
                htmlFor="username"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:bg-neutral-900 dark:text-white"
              >
                Username
              </label>
              <div className="mt-2.5 dark:bg-neutral-900">
                <input
                  id="username"
                  type="text"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 required dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>
            <div className='dark:bg-neutral-900'>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900 dark:bg-neutral-900 dark:text-white">
                Full Name
              </label>
              <div className="mt-2.5 dark:bg-neutral-900">
                <input
                  id="full_name"
                  type="text"
                  value={full_name || ''}
                  onChange={(e) => setFullname(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>
            <div className='dark:bg-neutral-900'>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:bg-neutral-900 dark:text-white"
              >
                Email
              </label>
              <div className="mt-2.5 dark:bg-neutral-900">
                <input
                  id="email" type="text" value={user.email}
                  disabled
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>
            <div className='dark:bg-neutral-900'>
              <label htmlFor="birthdate" className="block text-sm font-semibold leading-6 text-gray-900 dark:bg-neutral-900 dark:text-white">
                Birthdate
              </label>
              <div className="mt-2.5 dark:bg-neutral-900 dark:text-white">
                <DatePicker
                  id="birthdate"
                  selected={birthdate}
                  onChange={(date) => setBirthdate(date)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white"
                />
              </div>
            </div>

          </div>
          <div className="mt-8 text-center sm:mt-10 dark:bg-neutral-900 dark:text-white">
            <button
              onClick={() => updateProfile({ username, full_name })}
              className="inline-block w-full max-w-xs font-medium rounded-md border border-transparent px-4 py-2 bg-green-600 text-base text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:max-w-none sm:px-8"
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