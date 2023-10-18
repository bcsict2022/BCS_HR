import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

const NewVideo = () => {


    const [video, setVideo] = useState(null);
    const [percent, setPercent] = useState(0);
    const [loading, setLoading] = useState(false)

    async function SaveVideo() {
        if (!video) {
            alert('Please Choose a Video');
        } else {
            setLoading(true)
            const storageRef = ref(storage, `/herovideos/${video.name}`);

            const uploadTask = uploadBytesResumable(storageRef, video);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    // update progress
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {

                        try {
                            const docRef = await addDoc(collection(db, "HeroVideo"), {
                                video_url: url,
                                createdAt: serverTimestamp()
                            });
                            setLoading(false);
                            toast.success("Video Added")
                        } catch (e) {
                            setLoading(false)
                            toast.error('An error occured!')
                        }
                    });
                }
            );
        }
    }

    function handleChange(event) {
        setVideo(event.target.files[0]);
    }
    return (
        <div>
            <h1 className='font-extrabold text-black text-3xl'>Add Video</h1>
            <p className='text-gray-500 mb-10'>this video will be added to the front page of next berries website</p>
            <input
                accept='video/*'
                multiple={false}
                class="block text-sm"
                id="file_input" type="file" onChange={handleChange} />

            <div className='mt-10'>
                <button
                    onClick={SaveVideo}
                    disabled={loading}
                    type="button"
                    class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    {loading ? (
                        <p>Saving...</p>
                    ) : (
                        <p>Save Video</p>
                    )}
                </button>

                {loading ? (
                    <p>{percent} "% done"</p>
                ) : null}
            </div>
        </div>
    )
}

export default NewVideo