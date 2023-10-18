import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase';
import { Firestore, addDoc, collection, collectionGroup, getDocs, serverTimestamp } from 'firebase/firestore';

const Orders = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {

        await getDocs(collectionGroup(db, 'Payments'))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setUsers(newData);
                console.log(newData);
            })

    }

    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <div>
            <h1 className='text-black mb-2'>All Orders</h1>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                            Customer's Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                    <img src={user?.product_image} className='w-8 h-8 mr-2 rounded-full' />
                                    {user?.payeeName}
                                </th>
                                <td class="px-6 py-4">
                                    {user?.payeePhoneNumber}
                                </td>
                                <td class="px-6 py-4">
                                    {user?.payeeEmail}
                                </td>
                                <td class="px-6 py-4">
                                    {user?.amount}
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

export default Orders