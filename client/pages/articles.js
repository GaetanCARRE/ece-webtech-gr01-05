import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { supabase } from '../supabase/supabase.js';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function ArticlesPage({ articles }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const role = user?.role
  return (
    <>
      <Header />
      <div className='grid grid-cols-3 pb-40 gap-x-20 px-20 pb-8 mt-10 dark:bg-black'>
        {articles.map(article => {
          const test = require(`/img/${article.img}1.webp`);
          return (
            <div key={article.id} className='text-black flex flex-col justify-center items-center pb-10 dark:bg-black '>
              <Link href={`/articles/${article.id}`} className='text-black' >
                <div className='text-black  '>
                  <Image className='mx-auto object-cover'
                    src={test}
                    alt="Picture of the author"
                    width={580}
                    height={725}
                  />
                </div>
                <h2 className='text-black text-sm font-bold pt-2 dark:bg-black dark:text-white'>{article.title}</h2>
                <h2 className='text-black text-sm py-2 font-light dark:bg-black dark:text-white'>{article.brand}</h2>
                <h2 className='text-black text-sm font-bold dark:bg-black dark:text-white'>{article.price}€</h2>
              </Link>
            </div>
          )
        })}
      </div>
      {role === 'service_role' && ( // Only show the button if the user is logged in and has the service_role (admin). else , show a message to the user
        <div className='text-center dark:bg-black'>
        <Link href='/articles/creation'>
          <button className='bg-black text-white dark:bg-white dark:text-black text-sm font-bold py-2 px-4 rounded-full'>Ajouter un article</button>
        </Link>
        </div>
      )}
      <Footer />
    </>
  );
}

export async function getStaticProps(ctx) {
  const { data, error } = await supabase.from('articles').select('*').order('id', { ascending: true });
  if (error) {
    console.error(error);
    alert(error)
  }
  const articles = data;
  return {
    props: {
      articles: articles
    }
  };
}
