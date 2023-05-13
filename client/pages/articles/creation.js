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
    const [img, setImg] = useState('');
    const [imgCount, setImgCount] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('articles').insert([{ 
            title, 
            brand, 
            price, 
            content, 
            img, 
            img_count: imgCount,
        }], {returning : 'minimal'});
        if (error) {
            console.error(error);
            alert(error.message)
        }
        setTitle('');
        setBrand('');
        setPrice('');
        setImg('');
        setContent('');
        setImgCount('');
        // await uploadToServer();
    }

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
                                />
                            </div>
                            <div className='dark:bg-neutral-900 dark:text-white'>
                                <div className='dark:bg-neutral-900 dark:text-white'>
                                    <h2 className='text-center mb-6 text-xl dark:bg-neutral-900 dark:text-white'>Select Images</h2>
                                    <div className='grid grid-cols-2 gap-x-4 mb-8 dark:bg-neutral-900 dark:text-white'>
                                        <h3 className='pl-1 dark:bg-neutral-900 dark:text-white'>Image name</h3>
                                        <h3 className='pl-1 dark:bg-neutral-900 dark:text-white'>Number of images</h3>
                                        <input
                                            type='text'
                                            className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                            value={img}
                                            onChange={(e) => setImg(e.target.value)}
                                        />
                                        <input
                                            type='text'
                                            className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:bg-neutral-900 dark:text-white'
                                            value={imgCount}
                                            onChange={(e) => setImgCount(e.target.value)}
                                        />
                                    </div>
                                    <label className="block mb-2 font-medium text-gray-900 dark:text-white dark:bg-neutral-900 dark:text-white" htmlFor="multiple_files">Upload multiple files. Please note that the image file has to be named with the image name that you give plus the number of the picture with the webp format (example nikeJacket1.webp for the first image)</label>
                                    <input
                                        className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:bg-neutral-900 dark:text-white mb-8"
                                        id="multiple_files"
                                        type="file"
                                        multiple
                                        onChange={uploadToClient}
                                    />

                                    <div className='grid grid-cols-4 gap-4 mb-8'>
                                        {image.map((file, index) => (
                                            <div key={index}>
                                                <img src={URL.createObjectURL(file)} alt={`Image ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
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