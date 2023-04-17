import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { supabase } from '../supabase/supabase.js';

export default function ArticlesPage({ articles }) {
  return (
    <>
      <Header />
      <div className='grid grid-cols-3 pb-40 gap-x-20 px-20 pb-8 mt-10'>
        {articles.map(article => {
          const test = require(`/img/${article.img}1.webp`);
          return (
            <div key={article.id} className='text-black flex flex-col justify-center items-center pb-10'>
              <Link href={`/articles/${article.id}`} className='text-black' >
                <div className='text-black'>
                  <Image className='mx-auto object-cover'
                    src={test}
                    alt="Picture of the author"
                    width={580}
                    height={725}
                  />
                </div>
                <h2 className='text-black text-sm font-bold pt-2'>{article.title}</h2>
                <h2 className='text-black text-sm py-2 font-light'>{article.brand}</h2>
                <h2 className='text-black text-sm font-bold'>{article.price}€</h2>
              </Link>
            </div>
          )
        })}
      </div>
      <Footer/>
    </>
  );
}

export async function getStaticProps(ctx) {
  const { data, error } = await supabase.from('articles').select('*');
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
