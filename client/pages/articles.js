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
      <div className='grid md:grid-cols-2 pb-40 gap-x-20 px-20 pb-8 pt-10 text-black dark:text-white dark:bg-neutral-900 lg:grid-cols-3 sm:grid-cols-1'>
        {articles.map(article => {
          const test = require(`/img/${article.img}1.webp`);
          return (
            <div key={article.id} className='flex flex-col justify-center items-center pb-10 dark:bg-neutral-900'>
              <Link href={`/articles/${article.id}`}>
                <div className='dark:bg-neutral-900'>
                  <Image className='mx-auto object-cover'
                    src={test}
                    alt="Picture of the author"
                    width={580}
                    height={725}
                  />
                </div>
                <h2 className='text-sm font-bold pt-2 dark:bg-neutral-900'>{article.title}</h2>
                <h2 className='text-sm py-2 font-light dark:bg-neutral-900'>{article.brand}</h2>
                <h2 className='text-sm font-bold dark:bg-neutral-900'>{article.price}€</h2>
              </Link>
            </div>
          )
        })}
      </div>
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
    },
    revalidate : 60
  };
}
