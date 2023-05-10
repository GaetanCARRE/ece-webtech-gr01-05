import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../supabase/supabase.js';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ArticlesSearch() {
    const search = useSearchParams();
    const searchQuery = search ? search.get('q') : null;
    console.log(searchQuery);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function getArticles() {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .textSearch('title_brand', searchQuery, { type: 'websearch' })
            // same request as above but with brand ad
            if (error) {
                console.error(error);
                alert(error.message);
            } else {
                setArticles(data);
            }
        }
        

        if (searchQuery) {
            getArticles();
        }
    }, [searchQuery]);

    return (
        <>
            <Header />
            <div>
                <h1 className='text-2xl text-center my-10'>Articles Search</h1>
            </div>
            <div className='grid grid-cols-3 pb-40 gap-x-20 px-20 pb-8'>
            {articles.map((article) => {
                const test = require(`/img/${article.img}1.webp`);
                return (
                <div key={article.id} className='text-black flex flex-col justify-center items-center pb-10'>
                    <Link href={`/articles/${article.id}`} className='text-black'>
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
            )}
            )}
            </div>
            <Footer />
        </>
    )
}
