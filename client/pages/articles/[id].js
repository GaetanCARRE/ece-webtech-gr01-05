import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { useState } from 'react';
import { supabase } from '../../supabase/supabase.js';


export default function Article({ article }) {

    const [activeSizeIndex, setActiveSizeIndex] = useState(-1);

    const handleClickSize = (index) => {
        setActiveSizeIndex(index);
    };

    //define update checkout function which add artciles id and size to checkout state
    // const updateCheckout = () => {
    //     if (activeSizeIndex != -1) {
    //         setCheckout([...checkout, { id: article.id, size: sizes[activeSizeIndex].label }])
    //     }
    // }


    if (article.type == "CLOTHES") {
        var sizes = [
            { label: 'S', stock: article.stock_s },
            { label: 'M', stock: article.stock_m },
            { label: 'L', stock: article.stock_l },
            { label: 'XL', stock: article.stock_xl },

        ];
    } else if (article.type == "SHOES") {

        var sizes = [
            { label: '10', stock: article.stock_xl },
            { label: '11', stock: article.stock_xl },
            { label: '12', stock: article.stock_xl },
            { label: '13', stock: article.stock_xl },
        ];
    }
    else {
        var sizes = [
            { label: 'Taille Unique', stock: article.stock },
        ];
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
                        {sizes.map((size, index) => (
                            <button
                                key={size.label}
                                className={`text-xs border py-2 px-0 w-full ${activeSizeIndex === index
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'text-black border-gray-400'
                                    }`}
                                onClick={() => handleClickSize(index)}
                                disabled={size.stock === 0}
                            >
                                {size.label} ({size.stock} restants)
                            </button>
                        ))}
                    </div>

                    <button className='text-white text-lg bg-black rounded-[4px] py-2 px-10 mb-10 w-full'>
                        Ajouter au panier
                    </button>
                </div>
            </div>
            <Footer />
        </>

    )
}


export async function getStaticProps(ctx) {

    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', ctx.params.id)
        .single();
    if (!data) {
        alert('Article not found');
    }
    console.log(data);
    if (error) {
        console.error(error);
        alert(error.message)
    }
    const article = data
    return {
        props: {
            article: article
        }
    };
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from('articles').select('*');
    if (error) {
        console.error(error);
        alert(error.message);
    }
    const articles = data;
    return {
        paths: articles.map(article => `/articles/${article.id}`),
        fallback: false
    };
}

