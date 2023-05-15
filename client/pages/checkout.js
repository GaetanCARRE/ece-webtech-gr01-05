import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutContext from '../components/CheckoutContext';
import { useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase.js';
import Image from 'next/image';

export default function CheckoutPage() {
  const { checkout } = useContext(CheckoutContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(checkout);

  useEffect(() => {
    const fetchArticles = async () => {
      const articleIds = checkout.map((article) => article.id);
      const { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .in('id', articleIds);

      const newArticles = checkout.map((article) => {
        const matchingArticle = articles.find((a) => a.id === article.id);
        if (matchingArticle) {
          return {
            ...article,
            articleInfo: matchingArticle,
          };
        }
        return article;
      });

      setArticles(newArticles);
      setLoading(false);
    };


    fetchArticles();
  }, [checkout]);

  return (
    <div className="flex flex-col h-screen dark:bg-neutral-900">
      <Header />
      {checkout.length > 0 ? (
        <div className="flex-grow dark:bg-neutral-900">
          <h1 className="text-black py-10 text-center text-3xl font-bold dark:bg-neutral-900 dark:text-white">
            Checkout
          </h1>
          <div className="flex flex-col items-center dark:bg-neutral-900">
            {articles.map((article) => {
              const image = article.articleInfo.img1;
              return (
                <div key={article.id} className='dark:bg-neutral-900 dark:text-white'>
                  {article.articleInfo && (
                    <div className="grid grid-cols-3 text-left pb-8 dark:bg-neutral-900">
                      <div>
                        <Image className='mx-auto object-cover'
                          src={image}
                          alt="Picture of the author"
                          width={150}
                          height={150}
                        />
                      </div>
                      <div className='pl-6 dark:bg-neutral-900'>
                        <p className='dark:bg-neutral-900'>{article.articleInfo.brand} {article.articleInfo.title}</p>
                        <p className='dark:bg-neutral-900'>{article.articleInfo.price}€</p>
                        <h2 className="font-bold dark:bg-neutral-900">{article.size}</h2>
                      </div>
                      <div className='text-right pr-6 dark:bg-neutral-900'>
                        <p className='dark:bg-neutral-900'>Quantity</p>
                      </div>
                    </div>

                  )}

                  <hr class="h-px my-8 bg-gray-200 border-0 mx-5 "/>

                </div>
              )
            })}

          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center dark:bg-neutral-900">
          <h1 className="text-black text-3xl font-bold dark:bg-neutral-900 dark:text-white">
            Your checkout is empty
          </h1>
        </div>
      )}

      <Footer className="flex-shrink-0" />
    </div>
  );
}
