import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { supabase } from '../../supabase/supabase.js';
import { useState } from 'react';  // Ajout de useContext
import { useUser } from '@supabase/auth-helpers-react'


export default function ArticlesCreation() {
    const user = useUser()
    const role = user?.role

    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState('');
    const [imgCount, setImgCount] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.from('articles').insert([
            { title, brand, price, content, img, img_count: imgCount },
        ]);
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
        await uploadToServer();
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
        <>
            <Header />


            {role === 'service_role' && (
                <div>
                    <h1 className='text-center text-3xl my-14'>Article Creation</h1>
                    <div className='px-10 mb-10'>
                        <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-3 gap-x-4 mb-10'>
                                <div className='text-blac text-xl pl-2 pb-1'>
                                    Brand
                                </div>
                                <div className='text-black text-xl pl-2 pb-1'>
                                    Title
                                </div>
                                <div className='text-black text-xl pl-2 pb-1'>
                                    Price
                                </div>
                                <input
                                    type='text'
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                                <input
                                    type='text'
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input
                                    type='text'
                                    className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <h1 className='text-black text-xl text-bold pb-2'>Description</h1>
                                <textarea
                                    className='text-black text-sm outline-none border border-gray-400 rounded-[4px] py-2 px-2 mb-10 w-full h-[200px]'
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div>
                                <div>
                                    <h2 className='text-center mb-6 text-xl'>Select Images</h2>
                                    <div className='grid grid-cols-2 gap-x-4 mb-8'>
                                        <h3 className='pl-1'>Image name</h3>
                                        <h3 className='pl-1'>Number of images</h3>
                                        <input
                                            type='text'
                                            className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                                            value={img}
                                            onChange={(e) => setImg(e.target.value)}
                                        />
                                        <input
                                            type='text'
                                            className='block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                                            value={imgCount}
                                            onChange={(e) => setImgCount(e.target.value)}
                                        />
                                    </div>
                                    <label className="block mb-2 font-medium text-gray-900 dark:text-white" for="multiple_files">Upload multiple files. Please note that the image file has to be named with the image name that you give plus the number of the picture with the webp format (example nikeJacket1.webp for the first image)</label>
                                    <input
                                        className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-8"
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
                        <h1 className='text-2xl'>You can't access this page</h1>

                    </div>
                )}

            
        </>
    );
}