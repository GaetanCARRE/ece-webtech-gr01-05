import articlesData from '../../data/articles.json';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function Article({
    article
}) {
    const images = [];
    for (let i = 1; i <= 4; i++) {
        const img = require(`/img/${article.img}${i}.webp`);
        images.push(
            <div key={`img-${i}`} className='text-black flex flex-col justify-center items-center'>
                <div className='text-black'>
                    <Image className='mx-auto object-cover'
                        src={img}
                        alt={`Picture ${i} of the author`}
                        width={580}
                        height={725}
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className='grid grid-cols-3 pb-20 gap-x-10 px-10 mt-10'>
                <div className='col-span-2'>
                    <div className='grid grid-cols-2 gap-x-10 gap-y-10'>
                        {images}
                    </div>
                </div>
                <div>
                    <div className='flex flex-row '>
                        <h2 className='text-black text-2xl py-2 pr-2 font-bold'>{article.brand}</h2>
                        <h2 className='text-black text-2xl font-bold pt-2'>{article.title}</h2>
                    </div>
                    <h2 className='text-black text-xl font-bold pb-10'>{article.price}€</h2>

                    <h1 className='text-black text-base pb-2'>Taille</h1>
                    <div className='flex flex-row gap-x-2 mb-6'>

                        <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>S</button>
                        <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>M</button>
                        <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>L</button>
                        <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>XL</button>
                    </div>
                    <button className='text-white text-lg bg-black rounded-[4px] py-2 px-10 mb-10 w-full'>AJOUTER AU PANIER</button>



                    <h1 className='text-black text-xl'>DESCRIPTION</h1>
                    <hr className="h-px my-2 bg-gray-400 border-0"></hr>
                    <h2 className='text-black text-sm font-bold'>{article.content}</h2>

                </div>

            </div>
            <Footer />
        </>
    )
}

export async function getStaticProps(ctx) {
    const response = await fetch(`http://localhost:3000/api/articles/${ctx.params.id}`)
    const article = await response.json()
    return {
        props: {
            article: article
        }
    };
}

export async function getStaticPaths() {
    const response = await fetch(`http://localhost:3000/api/articles`)
    const articles = await response.json()
    return {
        paths: articles.map(article => `/articles/${article.id}`),
        fallback: false
    };
}
