import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db, storage } from '../../firebase';
import { Firestore, addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';

const ProductTable = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {

        await getDocs(collection(db, "Products"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setProducts(newData);
                console.log(newData);
            })

    }

    useEffect(() => {
        fetchProducts()
    }, [])



    return (
        <div>

            <Link to={'/create_product'}>
                <button type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Create a new product</button>
            </Link>
            
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {product?.title}
                                </th>
                                <td class="px-6 py-4">
                                    {product?.product_color}
                                </td>
                                <td class="px-6 py-4">
                                    ${product?.price}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ProductTable