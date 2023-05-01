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
    <div className="flex flex-col h-screen">
      <Header />
      {checkout.length > 0 ? (
        <div className="flex-grow">
          <h1 className="text-black py-10 text-center text-3xl font-bold">
            Checkout
          </h1>
          <div className="flex flex-col items-center">
            {articles.map((article) => {
              const image = require(`/img/${article.articleInfo.img}1.webp`);
              return (
                <div key={article.id} >
                  {article.articleInfo && (
                    <div className="grid grid-cols-3 text-left pb-8">
                      <div>
                        <Image className='mx-auto object-cover'
                          src={image}
                          alt="Picture of the author"
                          width={150}
                          height={150}
                        />
                      </div>
                      <div className='pl-6'>
                        <p>{article.articleInfo.brand} {article.articleInfo.title}</p>
                        <p>{article.articleInfo.price}€</p>
                        <h2 className="text-black font-bold">{article.size}</h2>
                      </div>
                      <div className='text-right pr-6'>
                        <p>Quantity</p>
                      </div>
                    </div>

                  )}

                  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 mx-5"/>

                </div>
              )
            })}

          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-black text-3xl font-bold">
            Your checkout is empty
          </h1>
        </div>
      )}

      <Footer className="flex-shrink-0" />
    </div>
  );
}
