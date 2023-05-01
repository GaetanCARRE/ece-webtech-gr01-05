import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { supabase } from '../../supabase/supabase.js';
import { useState, useContext } from 'react';  // Ajout de useContext
import CheckoutContext from '../../components/CheckoutContext';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { TbEdit } from 'react-icons/tb';

export default function Article({ article }) {

    const { checkout, setCheckout } = useContext(CheckoutContext);

    const [activeSizeIndex, setActiveSizeIndex] = useState(-1);
    const handleClickSize = (index) => {
        setActiveSizeIndex(index);
    };
    const handleClickAddToCart = () => {
        if (activeSizeIndex !== -1) {
            const newArticle = { id: article.id, size: sizes[activeSizeIndex].label };
            setCheckout([...checkout, newArticle]);
        }
    };
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState([]);

    const supabase = useSupabaseClient()
    const user = useUser()

    const fetchComments = async () => {
        const { data: comments, error } = await supabase
            .from("comments")
            .select()
            .eq("article_id", article.id);
        if (error) {
            console.error(error);
        } else {
            setComments(comments);
        }
    };
    fetchComments();

    const editComment = async (id) => {
        const { data: comment, error } = await supabase
            .from("comments")
            .select()
            .eq("id", id);
        if (error) {
            console.error(error);
        } else {
            setMessage(comment[0].message);
            setIsEditing(true);
            setEditId(id);
        }
    };


    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const { data, error } = await supabase.from('comments').insert({
                fullname,
                message,
                email,
                article_id: article.id,
            });
            if (data) {
                setComments([...comments, data[0]]);
            }
            if (error) {
                throw error;
            }

            console.log('message submitted:', data);
            alert('Thank you for your message!');
            fetchComments();
            setFullname('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.log(error);
            alert(error.error_description || error.message);
        }
    }

    async function handleSubmitConnected(event) {
        event.preventDefault();
        try {
            // join the user id with profiles.id
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            const { data, error } = await supabase.from('comments').insert({
                fullname: profile.full_name,
                message,
                email: user.email,
                article_id: article.id,
                user_id: user.id,
            });
            if (data) {
                setComments([...comments, data[0]]);
            }
            if (error) {
                throw error;
            }

            console.log('message submitted:', data);
            alert('Thank you for your message!');
            fetchComments();
            setFullname('');
            setEmail('');
            setMessage('');
        } catch (error) {
            alert("Please update your profile to add a comment");
        }
    }

    async function handleSubmitEdit(event) {
        event.preventDefault();
        try {
            const { data, error } = await supabase.from('comments').update({
                message,
            }).eq('id', editId);
            if (data) {
                setComments([...comments, data[0]]);
            }
            if (error) {
                throw error;
            }
        } catch (error) {
            console.log(error);
            alert(error.error_description || error.message);
        }
        setIsEditing(false);
        setEditId(null);
        fetchComments();
    }

    if (article.type == "CLOTHES") {
        var sizes = [
            { label: 'S', stock: article.stock_s },
            { label: 'M', stock: article.stock_m },
            { label: 'L', stock: article.stock_l },
            { label: 'XL', stock: article.stock_xl },

        ];
    } else if (article.type == "SHOES") {

        var sizes = [
            { label: '10', stock: article.stock_10 },
            { label: '11', stock: article.stock_11 },
            { label: '12', stock: article.stock_12 },
            { label: '13', stock: article.stock_13 },
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

                    <button className='text-white text-lg bg-black rounded-[4px] py-2 px-10 mb-10 w-full' onClick={handleClickAddToCart}>
                        Ajouter au panier
                    </button>
                    <div>
                        <h1 className='text-black text-xl text-bold pb-2'>Description</h1>
                        <p className='text-black text-sm'>{article.content}</p>
                    </div>
                </div>
            </div>

            <div>
                <h1 className='text-black text-center text-xl text-bold pb-2 px-10'>Commentaires</h1>
                <div className='border border-gray-200 rounded-xl mx-auto my-10 grid grid-cols-1 gap-x-5 mx-32 py-10'>
                    {comments.map((comment) => (
                        <div key={comment.id} className='text-black flex flex-col justify-start'>
                            <div className='text-black text-left mx-auto w-80'>
                                <div className='flex flex-row'>
                                    <h1 className='text-black text-sm text-bold font-bold w-80'>{comment.fullname}</h1>
                                    {user && comment.user_id === user.id && (
                                        <button onClick={() => editComment(comment.id)}>
                                            <TbEdit className='justify-end' />
                                        </button>
                                    )}
                                </div>
                                <p className='text-gray-800 text-sm pb-2'>{comment.created_at}</p>
                                <p className='text-gray-800 text-sm'>{comment.message}</p>
                            </div>
                            <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 mx-5 w-80" />
                        </div>
                    ))}
                </div>
            </div>

            {user ? (
                isEditing ? (
                    <form onSubmit={handleSubmitEdit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Message
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center sm:mt-10 mb-10">
                            <button
                                type="submit"
                                className="inline-block w-full max-w-xs font-medium rounded-md border border-transparent px-4 py-2 bg-green-500 text-base text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:max-w-none sm:px-8"
                            >
                                Update message
                            </button>
                    </div>
                </form>
                ) : (
                
                <form onSubmit={handleSubmitConnected} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Message
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center sm:mt-10 mb-10">
                            <button
                                type="submit"
                                className="inline-block w-full max-w-xs font-medium rounded-md border border-transparent px-4 py-2 bg-green-500 text-base text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:max-w-none sm:px-8"
                            >
                                Send message
                            </button>
                    </div>
                </form>
            )

            ) : (

                <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="first-name"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Full name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    value={fullname}
                                    onChange={(event) => setFullname(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="first-name"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold leading-6 text-gray-900"
                            >
                                Message
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center sm:mt-10 mb-10">
                        <button
                            type="submit"
                            className="inline-block w-full max-w-xs font-medium rounded-md border border-transparent px-4 py-2 bg-green-500 text-base text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:max-w-none sm:px-8"
                        >
                            Send message
                        </button>
                    </div>
                </form>

            )}
            <Footer />
        </>

    )
}


export async function getStaticProps(ctx) {

    const { data: article, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', ctx.params.id)
        .single();
    if (!article) {
        alert('Article not found');
    }
    console.log(article);
    if (error) {
        console.error(error);
        alert(error.message)
    }
    return {
        props: {
            article: article,
        },

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

