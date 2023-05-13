/* eslint-disable @next/next/no-img-element */
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { supabase } from '../../supabase/supabase.js';
import { useState, useContext, useEffect } from 'react';  // Ajout de useContext
import CheckoutContext from '../../components/CheckoutContext';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { TbEdit } from 'react-icons/tb';
import { MdDeleteOutline } from 'react-icons/md';
import gravatar from 'gravatar';
import { useRouter } from 'next/router';

export default function Article({ article }) {
    const router = useRouter();
    const { checkout, setCheckout } = useContext(CheckoutContext);


    const [theme, setTheme] = useState('light')
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme) {
            setTheme(storedTheme)
        }
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

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
    const role = user?.role

    const [brand, setBrand] = useState(article.brand);
    const [title, setTitle] = useState(article.title);
    const [price, setPrice] = useState(article.price);
    const [description, setDescription] = useState(article.content);

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

    const fetchArticle = async () => {
        const { data, error } = await supabase
            .from("articles")
            .select()
            .eq("id", article.id);
        if (error) {
            console.error(error);
        } else {
            article = data;
        }
    };

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

    const deleteComment = async (id) => {
        try {
            await supabase.from("comments").delete().eq("id", id);
            setComments(comments.filter((comment) => comment.id !== id));
        } catch (error) {
            console.error(error);
        }
        fetchComments();
    };
    async function handleSubmitComment(event) {
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

    async function handleSubmitCommentConnected(event) {
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

    async function handleSubmitCommentEdit(event) {
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
        setMessage('');
    }

    async function handleClickUpdate(event) {
        event.preventDefault();
        try {
            const { data, error } = await supabase.from('articles').update({
                brand,
                title,
                price,
                content: description,
            }).eq('id', article.id);
            if (error) {
                throw error;
            }
            else {
                alert('Article updated!');
                fetchArticle();
            }
        } catch (error) {
            console.log(error);
            alert(error.error_description || error.message);
        }
    }

    async function handleClickDelete(event) {
        event.preventDefault();
        try {
            const { data, error } = await supabase.from('articles').delete().eq('id', article.id);
            if (error) {
                throw error;
            }
            else {
                alert('Article deleted!');
                router.push('/articles');
            }
        } catch (error) {
            console.log(error);
            alert(error.error_description || error.message);
        }
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
    for (let i = 1; i <= article.img_count; i++) {
        const img = require(`/img/${article.img}${i}.webp`);
        images.push(
            <div key={`img-${i}`} className=' flex flex-col justify-center items-center'>
                <div className=''>
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
        <div className='dark:bg-neutral-900'>
            <Header />
            <div className='grid grid-cols-3 pb-20 gap-x-10 px-10 pt-10 dark:text-white dark:bg-neutral-900'>
                <div className='col-span-2 dark:bg-neutral-900'>
                    <div className='grid lg:grid-cols-2 gap-x-10 gap-y-10 dark:bg-neutral-900 md:grid-cols-1'>
                        {images}
                    </div>
                </div>
                {role === 'service_role' && (
                    <div className='dark:bg-neutral-900 dark:text-white'>
                        <div className='flex flex-row dark:bg-neutral-900 dark:text-white'>
                            <input
                                type='text'
                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                            <input
                                type='text'
                                className='block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <input
                            type='text'
                            className='block w-full rounded-md border-0 px-3.5 py-2  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <div className='dark:bg-neutral-900 dark:text-white'>
                            <h1 className='text-xl text-bold pb-2 dark:bg-neutral-900 dark:text-white'>Description</h1>
                            <textarea
                                className=' text-sm outline-none border border-gray-400 rounded-[4px] py-2 px-2 mb-10 w-full h-[200px] dark:bg-neutral-900 dark:text-white'
                                value={description}
                                onChange={(e) => handleDescriptionChange(e.target.value)}
                            />
                        </div>
                        <div className='dark:bg-neutral-900 dark:text-white'>
                            <button className='text-white text-lg bg-green-700 rounded-[4px] py-2 px-10 mb-5 w-full' onClick={handleClickUpdate}>
                                Update Article
                            </button>
                            <button className='text-white text-lg bg-red-700 rounded-[4px] py-2 px-10 mb-10 w-full' onClick={handleClickDelete}>
                                Delete Article
                            </button>
                        </div>
                    </div>

                ) || (
                        <div className='dark:bg-neutral-900'>
                            <div className='flex flex-row dark:bg-neutral-900'>
                                <h2 className=' text-2xl py-2 pr-2 font-bold dark:bg-neutral-900'>{article.brand}</h2>
                                <h2 className=' text-2xl font-bold pt-2 dark:bg-neutral-900'>{article.title}</h2>
                            </div>
                            <h2 className='text-xl font-bold pb-10 dark:bg-neutral-900'>{article.price}€</h2>

                            <h1 className=' text-base pb-2 dark:bg-neutral-900'>Taille</h1>
                            <div className={`flex flex-row gap-x-2 mb-6 ${theme === 'dark' ? 'dark:bg-neutral-900' : ''}`}>
                                {sizes.map((size, index) => (
                                    <button
                                        key={size.label}
                                        className={`text-xs border py-2 px-0 w-full ${activeSizeIndex === index
                                                ? `${theme === 'dark' ? 'bg-white text-black border-white' : 'bg-gray-900 text-white border-gray-900'}`
                                                : 'border-gray-400'
                                            }`}
                                        onClick={() => handleClickSize(index)}
                                        disabled={size.stock === 0}
                                    >
                                        {size.label} ({size.stock} restants)
                                    </button>
                                ))}
                            </div>


                            <button className='text-white text-lg bg-black rounded-[4px] py-2 px-10 mb-10 w-full dark:bg-white dark:text-black' onClick={handleClickAddToCart}>
                                Ajouter au panier
                            </button>
                            <div>
                                <h1 className='text-xl text-bold pb-2 dark:bg-neutral-900'>Description</h1>
                                <p className='text-sm dark:bg-neutral-900'>{article.content}</p>
                            </div>
                        </div>
                    )}
            </div>

            <div className='dark:text-white dark:bg-neutral-900'>
                <h1 className='text-center text-xl text-bold pb-2 px-10 dark:bg-neutral-900'>Commentaires</h1>
                <div className='border border-gray-200 rounded-xl mx-auto my-10 grid grid-cols-1 gap-x-5 mx-32 py-10 dark:bg-neutral-900'>
                    {comments.map((comment) => (
                        <div key={comment.id} className=' flex flex-col justify-start dark:bg-neutral-900'>
                            <div className=' text-left mx-auto w-80'>
                                <div className='flex flex-row gap-x-4 flex items-center justify-center pb-4 dark:bg-neutral-900'>
                                    <Image
                                        src={`https:${gravatar.url(comment.email, { s: '100', d: 'retro' })}`}
                                        alt='User Profile Picture'
                                        width={28}
                                        height={28}
                                        className='rounded-full'
                                    />
                                    <h1 className=' text-sm text-bold font-bold w-80 dark:bg-neutral-900'>{comment.fullname}</h1>
                                    <p className='text-gray-400 font-ligh w-full text-right dark:bg-neutral-900'>{comment.created_at}</p>
                                    {user && comment.user_id === user.id && (
                                        <div className='justify-end dark:bg-neutral-900'>
                                            <button onClick={() => editComment(comment.id)}>
                                                <TbEdit className='bg-transparent' />
                                            </button>
                                            <button onClick={() => deleteComment(comment.id)}>
                                                <MdDeleteOutline className='bg-transparent' />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <p className='text-gray-800 text-sm pl-2 dark:bg-neutral-900 dark:text-white'>{comment.message}</p>
                            </div>
                            <hr className="h-px mx-auto my-8 bg-gray-200 border-0 dark:bg-gray-700 mx-5 w-80" />
                        </div>
                    ))}
                </div>
            </div>

            {user ? (
                isEditing ? (
                    <form onSubmit={handleSubmitCommentEdit} className="mx-auto mt-16 max-w-xl sm:mt-20 dark:bg-neutral-900">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 dark:text-white">
                            <div className="sm:col-span-2 dark:bg-neutral-900">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white dark:bg-neutral-900"
                                >
                                    Message
                                </label>
                                <div className="mt-2.5 dark:bg-neutral-900">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows="4"
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-center sm:mt-10 mb-10 dark:bg-neutral-900">
                            <button
                                type="submit"
                                className="inline-block w-full max-w-xs font-medium rounded-md border border-transparent px-4 py-2 bg-green-500 text-base text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:max-w-none sm:px-8"
                            >
                                Update message
                            </button>
                        </div>
                    </form>
                ) : (

                    <form onSubmit={handleSubmitCommentConnected} className="mx-auto mt-16 max-w-xl sm:mt-20 dark:bg-neutral-900">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-2 dark:bg-neutral-900">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-semibold leading-6 text-gray-900 dark:bg-neutral-900 dark:text-white"
                                >
                                    Message
                                </label>
                                <div className="mt-2.5 dark:bg-neutral-900">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows="4"
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 text-center sm:mt-10 mb-10 dark:bg-neutral-900">
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

                <form onSubmit={handleSubmitComment} className="mx-auto mt-16 max-w-xl sm:mt-20 dark:bg-neutral-900">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 dark:text-white dark:bg-neutral-900">
                        <div className="sm:col-span-2 dark:bg-neutral-900">
                            <label
                                htmlFor="first-name"
                                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white dark:bg-neutral-900"
                            >
                                Full name
                            </label>
                            <div className="mt-2.5 dark:bg-neutral-900">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    value={fullname}
                                    onChange={(event) => setFullname(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:text-white dark:bg-neutral-900"
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2 dark:bg-neutral-900">
                            <label
                                htmlFor="first-name"
                                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white dark:bg-neutral-900"
                            >
                                Email
                            </label>
                            <div className="mt-2.5 dark:bg-neutral-900">
                                <input
                                    type="email"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:text-white dark:bg-neutral-900"
                                    required
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2 dark:bg-neutral-900">
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white dark:bg-neutral-900"
                            >
                                Message
                            </label>
                            <div className="mt-2.5 dark:bg-neutral-900">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    value={message}
                                    onChange={(event) => setMessage(event.target.value)}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:text-white dark:bg-neutral-900"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center sm:mt-10 mb-10 dark:bg-neutral-900">
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
        </div>

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
        revalidate: 60,

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

