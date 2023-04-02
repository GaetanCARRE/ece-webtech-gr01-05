import articlesData from '../../data/articles.json';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js'

export default function Article({article}) 
{
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Récupérer les données de stock pour un article donné
    async function getStockData() {
        const { data: stockData, error: stockError } = await supabase
            .from('articles')
            .select('stock_s, stock_m, stock_l, stock_xl','stock_10, stock_11, stock_12, stock_13','stock','type')
            .eq('id', article.id)
            .single()
        if (stockError) {
            console.log('Error getting stock data', stockError)
        }

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

    const remainingStock = {
        getStockData(){},
        'S': stockData.stock_s,
        'M': stockData.stock_m,
        'L': stockData.stock_l,
        'XL': stockData.stock_xl,
        '10': stockData.stock_10,
        '11': stockData.stock_11,
        '12': stockData.stock_12,
        '13': stockData.stock_13,
        'stock' : stockData.stock,
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
                        {stockData.type === 'CLOTHES' && (
                            <div>
                                <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>S({remainingStock['S']} restants)</button>
                                <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>M({remainingStock['M']} restants)</button>
                                <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>L({remainingStock['L']} restants)</button>
                                <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>XL({remainingStock['XL']} restants)</button>
                            </div>
                        )}
                        {stockData.type === 'SHOES' && (
                            <div>
                                <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>10({remainingStock['10']} restants)</button>
                                <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>11({remainingStock['11']} restants)</button>
                                <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>12({remainingStock['12']} restants)</button>
                                <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>13({remainingStock['13']} restants)</button>
                            </div>
                        )}
                        {stockData.type === 'ACCESSORIES' && (
                            <div>
                                <button className='text-black text-xs border border-gray-400 rounded-[2px] py-2 px-0 w-full'>Taille Unique({remainingStock['stock']} restants)</button>
                            </div>
                        )}

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

