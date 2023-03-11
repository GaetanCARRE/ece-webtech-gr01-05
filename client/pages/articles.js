import articlesData from '../data/articles.json';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ArticlesPage() {
  const articles = articlesData;
  return (
    <>
      <Header />
      <div>
        <h1 className='text-red-500	'>Articles</h1>
        {articles.map(article => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>Published on: {article.date}</p>
            <p>Written by: {article.author}</p>
            <Link href={`/articles/${article.id}`}>
              Read more
            </Link>
          </div>
      ))}
    </div>
    <Footer />
    </>
  );
}
