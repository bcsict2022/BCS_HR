import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from '../firebase';
import { toast } from 'react-toastify'
import { Firestore, addDoc, collection, serverTimestamp } from 'firebase/firestore';

const CreateProducts = () => {

    const [price, setPrice] = useState(100);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false)
    const [productImages, setProductimages] = useState([]);


    async function uploadImage(image) {
        const storageRef = ref(storage, `/products/${Date.now()}${image.name}`);

        const response = await uploadBytes(storageRef, image);
        const url = await getDownloadURL(response.ref);
        return url;
    }


    async function UploadProduct(images) {
        if (title.length < 3) {
            toast.error("Product name too short!")
        } else if (desc.length < 3) {
            toast.error("Product description too short!")
        }
        else {
            setLoading(true)
            const imagePromises = Array.from(productImages, (image) => uploadImage(image));

            const imageRes = await Promise.all(imagePromises).then(async (res) => {

                try {
                    const docRef = await addDoc(collection(db, "Products"), {
                        product_image: res,
                        title: title,
                        descriprion: desc,
                        price: price,
                        product_color: 'Blue',
                        createdBy: auth.currentUser.email,
                        createdAt: serverTimestamp()
                    });
                    setLoading(false);
                    toast.success("Product Saved!")
                } catch (e) {
                    toast.error('An error occured!')
                }

            })
        }
    }


    return (
        <div>
            <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div class="container max-w-screen-lg mx-auto">
                    <div>
                        <h2 class="font-semibold text-xl text-gray-600">Create a Product</h2>
                        <p class="text-gray-500 mb-6">You can create or add new product to your shop</p>

                        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div class="lg:col-span-2">
                                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div class="md:col-span-5">
                                            <label for="Title">Name of Product</label>
                                            <input
                                                onChange={(e) => setTitle(e.target.value)}
                                                type="text"
                                                name="title"
                                                id="title"
                                                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={title} />
                                        </div>

                                        <div class="md:col-span-5">
                                            <label for="Description">Description of product</label>
                                            <input
                                                multiple={true}
                                                onChange={(e) => setDesc(e.target.value)}
                                                type="text"
                                                name="desc"
                                                id="desc"
                                                class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                value={desc}
                                                placeholder="Product description" />
                                        </div>


                                        <div class="md:col-span-2">
                                            <label for="soda">Price in $</label>
                                            <div class="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                                {/* <button onClick={DecreasePrice} tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                    </svg>
                                                </button> */}
                                                <input onChange={(e) => setPrice(e.target.value)} type='number' name="soda" id="soda" placeholder={price} class="px-2 text-center  outline-none text-gray-800 w-full bg-transparent" value={price} />
                                                {/* <button onClick={IncreasePrice} tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                                                    </svg>
                                                </button> */}
                                            </div>
                                        </div>

                                        <div>

                                            <label class="block mb-2 text-sm  text-gray-900 " for="file_input">images</label>
                                            {/* <p>(at least two images)</p> */}
                                            <input multiple={true} class="block text-sm" id="file_input" type="file" onChange={(e) => {
                                                setProductimages([...e.target.files]);
                                            }} />

                                        </div>

                                        <div class="md:col-span-5 text-right">
                                            <div class="inline-flex items-end" onClick={UploadProduct}>
                                                <button
                                                    disabled={loading}
                                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{loading ? 'Saving...' : 'Submit'}</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateProducts