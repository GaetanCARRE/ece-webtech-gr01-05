import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { supabase } from '../supabase/supabase';

function Contact() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from('contacts').insert({
        firstname,
        lastname,
        email,
        message,
      });

      if (error) {
        throw error;
      }

      console.log('Contact submitted:', data);
      alert('Thank you for your message!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.log(error);
      alert(error.error_description || error.message);
    }
  }

  return (
    <>
      <Header />
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-neutral-900">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:bg-neutral-900 dark:text-white">
            Contact Us
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20 dark:bg-neutral-900 dark:text-white">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 dark:bg-neutral-900">
            <div className='dark:bg-neutral-900'>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900  dark:bg-neutral-900 dark:text-white"
              >
                First name
              </label>
              <div className="mt-2.5 dark:bg-neutral-900">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  value={firstname}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white"
                  required
                />
              </div>
            </div>
            <div className='dark:bg-neutral-900'>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900 dark:bg-neutral-900 dark:text-white">
                Last name
              </label>
              <div className="mt-2.5 dark:bg-neutral-900">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={(event) => setLastName(event.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2 dark:bg-neutral-900">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:bg-neutral-900 dark:text-white"
              >
                Email
              </label>
              <div className="mt-2.5 dark:bg-neutral-900">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2 dark:bg-neutral-900">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900 dark:bg-neutral-900 dark:text-white"
              >
                Message
              </label>
              <div className="mt-2.5 dark:bg-neutral-900">
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white"
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center sm:mt-10 dark:bg-neutral-900">
            <button
              type="submit"
              className="inline-block w-full max-w-xs font-medium rounded-md border border-transparent px-4 py-2 bg-green-600 text-base text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:max-w-none sm:px-8"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
