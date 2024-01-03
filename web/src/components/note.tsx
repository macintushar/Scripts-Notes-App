import { DocumentData, addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { app, db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import LoadingScreen from './loading';

export default function Note() {
    const [userNotes, setUserNotes] = useState<DocumentData>();
    const navigate = useNavigate();

    const auth = getAuth(app);
    const userId = auth.currentUser?.uid;

    const params = useParams();
    const note_uid = params.id;

    let dateModified;

    async function handleClose() {
        try {            
            const noteRef = doc(db, `users/${userId}/notes/${note_uid}`);
            const noteDoc = await getDoc(noteRef);
        
            const new_title = (document.getElementById("note-title") as HTMLInputElement).value;
            const new_body = (document.getElementById("note-body") as HTMLInputElement).value;
            if (noteDoc.exists()) {
                        
                if (dateModified > noteDoc.data().dateModified) {
                await updateDoc(noteRef, {
                    title: new_title,
                    body: new_body,
                    dateModified: dateModified,
                });
        
                console.log('Note updated successfully');

                } else {
                    console.log('Note was modified by someone else');
                }
            } else {
                if (new_body.length > 0) {
                    try {
                        const notesCollectionRef = collection(db, `users/${userId}/notes`);
            
                        await addDoc(notesCollectionRef, {
                            title: new_title,
                            body: new_body,
                            dateCreated: serverTimestamp(),
                            dateModified: serverTimestamp()
                        });
            
                        navigate("/");
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    navigate("/");
                }
            }
        
            navigate('/');
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const fetchData = async () => {
        try {
            const noteRef = doc(db, `users/${userId}/notes/${note_uid}`);
            const noteDoc = await getDoc(noteRef);

            if (noteDoc.exists()) {
            const noteData = noteDoc.data();
            setUserNotes(noteData);
            // console.log(noteData)
            } else {
                console.log('Note does not exist');
            }
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    };

    const handleTextChange = () => {
        dateModified = serverTimestamp();
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    if (!userNotes && note_uid ) {
    return <LoadingScreen />;
    }

    return (
    <>
        <div className="flex justify-center md:m-10">
            <div className="bg-slate-400 dark:bg-slate-700 rounded-lg container h-full w-full m-2 md:h-fit">
                <div className="overflow-hidden rounded-lg border border-5 border-gray-900 shadow-sm">
                    <label htmlFor="title" className="sr-only">
                    Title
                    </label>
                    <input type="text" name="title" id="note-title"
                        className="block w-full border-0 p-3 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
                        placeholder="Title"
                        defaultValue={ userNotes?.title || '' }
                    />
                    <label htmlFor="body" className="sr-only">
                        Description
                    </label>
                    <textarea rows={20} name="body" id="note-body"
                        className="block w-full resize-none border-0 p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Write a description..."    
                        defaultValue={ userNotes?.body || ''}
                        onChange={ handleTextChange }
                    />   
                    <div className='flex justify-center w-full'>
                        <button
                            onClick={ handleClose }
                            className="w-full m-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
