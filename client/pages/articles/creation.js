import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { supabase } from '../../supabase/supabase.js';
import { useState } from 'react';  // Ajout de useContext
import { useUser } from '@supabase/auth-helpers-react'



export default function ArticlesCreation() {
    const user = useUser()
    const role = user?.role
    console.log(role)
    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [imgCount, setImgCount] = useState('');
    const [content, setContent] = useState('');
    const [drop, setDrop] = useState(false);
    const [dropdownText, setDropDownText] = useState('Category');

    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');

    const [stock_s, setStock_s] = useState(null);
    const [stock_m, setStock_m] = useState();
    const [stock_l, setStock_l] = useState();
    const [stock_xl, setStock_xl] = useState();

    const [stock_10, setStock_10] = useState();
    const [stock_11, setStock_11] = useState();
    const [stock_12, setStock_12] = useState();
    const [stock_13, setStock_13] = useState();

    const [stock, setStock] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (dropdownText === 'Category') {
            alert('Please select a category')
            return
        }
        else if (dropdownText === 'Shoes') {
            if (stock_10 === undefined || stock_11 === undefined || stock_12 === undefined || stock_13 === undefined) {
                alert('Please fill all the stock fields')
                return
            }
            setStock_s(0);
            setStock_m(0);
            setStock_l(0);
            setStock_xl(0);
            setStock(0);
        }
        else if (dropdownText === 'Clothes') {
            if (stock_s === undefined || stock_m === undefined || stock_l === undefined || stock_xl === undefined) {
                alert('Please fill all the stock fields')
                return
            }
            setStock_10(0);
            setStock_11(0);
            setStock_12(0);
            setStock_13(0);
            setStock(0);
        }
        else if (dropdownText === 'Accessories') {
            if (stock === undefined) {
                alert('Please fill all the stock fields')
                return
            }
            setStock_10(0);
            setStock_11(0);
            setStock_12(0);
            setStock_13(0);
            setStock_s(0);
            setStock_m(0);
            setStock_l(0);
            setStock_xl(0);
        }
        const { data, error } = await supabase.from('articles').insert([{
            title,
            brand,
            price,
            content,
            img_count: imgCount,
            type: dropdownText,
            stock_s,
            stock_m,
            stock_l,
            stock_xl,
            stock_10,
            stock_11,
            stock_12,
            stock_13,
            stock,
            title_brand: title + '_' + brand,
            img1,
            img2,
            img3,
            img4
        }], { returning: 'minimal' });
        if (error) {
            console.error(error);
            alert(error.message)
        }
        else {
            alert('Article created !')
            const tb = title + '_' + brand;
            setTitle('');
            setBrand('');
            setPrice('');
            setContent('');
            setImgCount('');
            setStock_s('');
            setStock_m('');
            setStock_l('');
            setStock_xl('');
            setStock_10('');
            setStock_11('');
            setStock_12('');
            setStock_13('');
            setStock('');
            setDropDownText('Category');
            setDrop(false);
            // await uploadToServer();
        }

    };

    const uploadToClient = (event) => {
        const files = event.target.files;
        setImage(Array.from(files));
    };

    const uploadToServer = async (event) => {
        const body = new FormData();
        // console.log("file", image)
        for (let i = 0; i < image.length; i++) {
            body.append("file", image[i]);
            const response = await fetch("/api/upload", {
                method: "POST",
                body
            });
        }
        setImage([]);
    };

    return (
        <div className='dark:bg-neutral-900'>
            <Header />


            {role === 'service_role' && (
                <div className='dark:bg-neutral-900'>
                    <h1 className='text-center text-3xl my-14 dark:bg-neutral-900 dark:text-white'>Article Creation</h1>
                    <div className='px-10 mb-10 dark:bg-neutral-900'>
                        <form onSubmit={handleSubmit} className='dark:bg-neutral-900'>
                            <div className='grid grid-cols-3 gap-x-4 mb-10 dark:bg-neutral-900'>
                                <div className='text-blac text-xl pl-2 pb-1 dark:bg-neutral-900 dark:text-white'>
                                    Brand
                                </div>
                                <div className='text-black text-xl pl-2 pb-1 dark:bg-neutral-900 dark:text-white'>
                                    Title
                                </div>
                                <div className='text-black text-xl pl-2 pb-1 dark:bg-neutral-900 dark:text-white'>
                                    Price
                                </div>
                                <input
                                    type='text'
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                                <input
                                    type='text'
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input
                                    type='text'
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className='dark:bg-neutral-900 dark:text-white'>
                                <h1 className='text-black text-xl text-bold pb-2 dark:bg-neutral-900 dark:text-white'>Description</h1>
                                <textarea
                                    className='text-black text-sm outline-none border border-gray-400 rounded-[4px] py-2 px-2 mb-10 w-full h-[200px] dark:bg-neutral-900 dark:text-white'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    nullable
                                />
                            </div>
                            <div className='dark:bg-neutral-900 dark:text-white'>
                                <h1 className='text-black text-xl text-bold pb-2 dark:bg-neutral-900 dark:text-white'>Image 1</h1>
                                <input
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                    value={img1}
                                    onChange={(e) => setImg1(e.target.value)}
                                    nullable
                                />
                            </div>
                            <div className='dark:bg-neutral-900 dark:text-white'>
                                <h1 className='text-black text-xl text-bold pb-2 dark:bg-neutral-900 dark:text-white'>Image 2</h1>
                                <input
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                    value={img2}
                                    onChange={(e) => setImg2(e.target.value)}
                                    nullable
                                />
                            </div>
                            <div className='dark:bg-neutral-900 dark:text-white'>
                                <h1 className='text-black text-xl text-bold pb-2 dark:bg-neutral-900 dark:text-white'>Image 3</h1>
                                <input
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                    value={img3}
                                    onChange={(e) => setImg3(e.target.value)}
                                    nullable
                                />
                            </div>
                            <div className='dark:bg-neutral-900 dark:text-white'>
                                <h1 className='text-black text-xl text-bold pb-2 dark:bg-neutral-900 dark:text-white'>Image 4</h1>
                                <input
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                    value={img4}
                                    onChange={(e) => setImg4(e.target.value)}
                                    nullable
                                />
                            </div>
                            <div className='dark:bg-neutral-900 dark:text-white'>
                                <h1 className='text-black text-xl text-bold pb-2 dark:bg-neutral-900 dark:text-white'>Number of image</h1>
                                <input
                                    type='number'
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                    value={imgCount}
                                    onChange={(e) => setImgCount(e.target.value)}
                                    nullable
                                />
                            </div>




                            <div className='grid grid-cols-5 dark:bg-neutral-900 my-10 dark:bg-neutral-900'>
                                <div className='dark:bg-neutral-900'>
                                    <button
                                        id="dropdownDefaultButton"
                                        data-dropdown-toggle="dropdown"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        type="button"
                                        onClick={() => setDrop(!drop)}
                                    >
                                        {dropdownText}
                                        <svg
                                            className="w-4 h-4 ml-2 bg-transparent"
                                            aria-hidden="true"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {drop && (
                                        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <button onClick={() => { setDropDownText('SHOES'); setDrop(!drop); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Shoes</button>
                                                </li>
                                                <li>
                                                    <button onClick={() => { setDropDownText('CLOTHES'); setDrop(!drop); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Clothes</button>
                                                </li>
                                                <li>
                                                    <button onClick={() => { setDropDownText('ACCESSORIES'); setDrop(!drop); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Accessories</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                {dropdownText === 'SHOES' && (
                                    <>
                                        <div className='dark:bg-neutral-900 dark:text-white'>
                                            <input
                                                type='number'
                                                className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                                value={stock_10}
                                                onChange={(e) => setStock_10(e.target.value)}
                                                placeholder='Amount of size 10'
                                                nullable
                                            />
                                        </div>
                                        <div className='dark:bg-neutral-900 dark:text-white'>
                                            <input
                                                type='number'
                                                className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                                value={stock_11}
                                                onChange={(e) => setStock_11(e.target.value)}
                                                placeholder='Amount of size 11'
                                                nullable

                                            />
                                        </div>
                                        <div className='dark:bg-neutral-900 dark:text-white'>
                                            <input
                                                type='number'
                                                className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                                value={stock_12}
                                                onChange={(e) => setStock_12(e.target.value)}
                                                placeholder='Amount of size 12'
                                                nullable
                                            />
                                        </div>
                                        <div className='dark:bg-neutral-900 dark:text-white'>
                                            <input
                                                type='number'
                                                className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                                value={stock_13}
                                                onChange={(e) => setStock_13(e.target.value)}
                                                placeholder='Amount of size 13'
                                                nullable
                                            />
                                        </div>
                                    </>
                                )}
                                {dropdownText === 'CLOTHES' && (
                                    <>
                                        <div className='dark:bg-neutral-900 dark:text-white'>
                                            <input
                                                type='number'
                                                className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                                value={stock_s}
                                                onChange={(e) => setStock_s(e.target.value)}
                                                placeholder='Amount of size S'
                                                nullable
                                            />
                                        </div>
                                        <div className='dark:bg-neutral-900 dark:text-white'>
                                            <input
                                                type='number'
                                                className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                                value={stock_m}
                                                onChange={(e) => setStock_m(e.target.value)}
                                                placeholder='Amount of size M'
                                                nullable
                                            />
                                        </div>
                                        <div className='dark:bg-neutral-900 dark:text-white'>
                                            <input
                                                type='number'
                                                className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                                value={stock_l}
                                                onChange={(e) => setStock_l(e.target.value)}
                                                placeholder='Amount of size L'
                                                nullable
                                            />
                                        </div>
                                        <div className='dark:bg-neutral-900 dark:text-white'>
                                            <input
                                                type='number'
                                                className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                                value={stock_xl}
                                                onChange={(e) => setStock_xl(e.target.value)}
                                                placeholder='Amount of size XL'
                                                nullable
                                            />
                                        </div>
                                    </>
                                )}
                                {dropdownText === 'ACCESSORIES' && (
                                    <div className='dark:bg-neutral-900 dark:text-white'>
                                        <input
                                            type='number'
                                            className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            placeholder='Amount in stock'
                                            nullable
                                        />
                                    </div>
                                )}
                            </div>

                            <button className='text-white text-lg bg-green-700 rounded-[4px] py-2 px-10 mb-5 w-full'>
                                Create Article
                            </button>
                        </form>
                    </div>
                    <Footer />
                </div>

            ) || (
                    // go back home
                    <div className='text-center text-2xl font-bold pt-20'>
                        <h1 className='text-2xl'>You can&apos;t access this page</h1>

                    </div>
                )}


        </div>
    );
}