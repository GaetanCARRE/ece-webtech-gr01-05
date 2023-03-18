import articlesData from '../data/articles.json';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function ArticlesPage() {
  const articles = articlesData;
  return (
    <>
      <Header />
      <div className='grid grid-cols-3'>
        {articles.map(article => {
          const test = require(`/img/${article.img}`);
          return (
            <div key={article.id} className='text-black'>
              <div className='text-black'>
                <Image className='mx-auto'
                  src={test}
                  alt="Picture of the author"
                  width="350"
                  height="300"  
                />
              </div>
              <h2 className='text-black'>{article.title}</h2>
              <div className='text-black'>{article.content}</div>
              <div className='text-black'>Published on: {article.date}</div>
              <div className='text-black'>Written by: {article.author}</div>
              
              <Link href={`/articles/${article.id}`} className='text-black' >
                Read more
              </Link>
            </div>
          )
        })}
      </div>
      <Footer />
    </>
  );
}
