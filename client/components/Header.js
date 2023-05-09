import { useState } from 'react'
import { Dialog, Disclosure, Popover} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image';
import logo from '/img/logo.png'
import Link from 'next/link'
import gravatar from 'gravatar'
import { useRouter } from 'next/router'
import { FiSearch } from 'react-icons/fi';




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const supabase = useSupabaseClient()
  const user = useUser()
  const role = user?.role
  // Récupération de l'image Gravatar
  const email = user?.email
  const gravatarUrl = email ? gravatar.url(email, { s: '80', d: 'mp' }, true) : null
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onSearch = (e) => {
    e.preventDefault();
    const encodedSearch = encodeURIComponent(search);
    router.push(`/articles/search?q=${encodedSearch}`);
    setSearch(''); // Clear the search bar
    setIsSearchOpen(false); // Close the search bar after search
  };
  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image src={logo}
              alt="Picture of the author" className="h-12 w-auto" />
          </Link>
        </div>
        {isSearchOpen && (
          <div className="fixed inset-0 bg-transparent backdrop-blur z-50" onClick={() => setIsSearchOpen(false)}>
            <form onSubmit={onSearch} className="bg-transparent absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 w-2/3 md:w-1/2 lg:w-1/3" onClick={(e) => e.stopPropagation()}>
              <input
                value={search}
                className="border border-slate-300 block h-7 align-middle text-gray-900 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 pl-2 lg:pl-5 py-5 lg:py-6 w-full"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search"
              />
            </form>
          </div>
        )}
        <div className='lg:hidden flex flex-1 justify-end px-5'>
          <button>
            <FiSearch className="h-6 w-6" onClick={() => setIsSearchOpen(!isSearchOpen)} />
          </button>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link href="/articles" className="text-sm font-semibold leading-6 text-gray-900">
            Articles
          </Link>
          <Link href="/profile" className="text-sm font-semibold leading-6 text-gray-900">
            Profile
          </Link>
          <Link href="/contacts" className="text-sm font-semibold leading-6 text-gray-900">
            Contacts
          </Link>
          <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
            About
          </Link>
          {role === 'service_role' && (
            <Link href="/articles/creation" className="text-sm font-semibold leading-6 text-gray-900">
              Create
            </Link>
          )}
          {user ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <button className="button block bg-transparent text-sm font-semibold leading-6 text-gray-900" onClick={() => supabase.auth.signOut()}>
                Log out <span aria-hidden="true">&larr;</span>
              </button>
            </div>

          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

          )}

        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4 ">
          <Link href="/profile">
            {gravatarUrl && (
              <div>
                <Image
                  src={`https:${gravatar.url(user.email, { s: '100', d: 'retro' })}`}
                  alt="Avatar"
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              </div>
            )}
          </Link>
          <button>
            <FiSearch className="h-6 w-6 mx-4" onClick={() => setIsSearchOpen(!isSearchOpen)} />
          </button>
          <div>
            <Link href="/checkout" className="text-sm font-semibold leading-6 text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </Link>
          </div>
        </div>


      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image className='h-8 w-auto'
                src={logo}
                alt="Picture of the author"
                width={580}
                height={725}
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Link href='/articles' className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                        Articles
                      </Link>
                    </>
                  )}
                </Disclosure>
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  href="/profile"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Profile
                </Link>
              </div>
              <div className="py-6">
                {user ? (

                  <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" onClick={() => supabase.auth.signOut()}>
                    Log out <span aria-hidden="true">&larr;</span>
                  </button>

                ) : (
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}

              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
