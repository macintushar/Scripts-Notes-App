import { useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import LoadingScreen from './loading';
import { DocumentData, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { app, db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

export default function ViewNote() {
  const [userNotes, setUserNotes] = useState<DocumentData>();
  
  const params = useParams();
  const note_uid = params.id;
  
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;

  let lastModified;

  const navigate = useNavigate();

  const handleClose = async () => {
    try {
      const noteRef = doc(db, `users/${userId}/notes/${note_uid}`);
      const noteDoc = await getDoc(noteRef);

      if (noteDoc.exists()) {
        const new_title = (document.getElementById("note-title") as HTMLInputElement).value;
        const new_body = (document.getElementById("note-body") as HTMLInputElement).value;
                
        if (lastModified > noteDoc.data().dateModified) {
          await updateDoc(noteRef, {
            title: new_title,
            body: new_body,
            lastModified: lastModified,
          });

          console.log('Note updated successfully');
        } else {
          console.log('Note was modified by someone else');
        }
      } else {
        console.log('Note does not exist');
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
        console.log(noteData)
      } else {
        console.log('Note does not exist');
      }
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

  const handleTextChange = () => {
    lastModified = serverTimestamp();
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  if (!userNotes) {
    return <LoadingScreen />;
  }

  return (
    <>
        <div className="flex justify-center">
            <div className="bg-slate-400 dark:bg-slate-700 p-4 h-full md:p-20 rounded md:h-fit container mt-20 w-full">
                <input 
                  className='w-full p-3 focus:ring-0 dark:text-black font-extrabold block rounded-xl' 
                  id="note-title" 
                  placeholder="Title" 
                  defaultValue={userNotes.title ? userNotes.title : "" }
                  onChange={handleTextChange}
                />
                <textarea 
                  className='w-full h-min-6xl p-3 focus:ring-0 focus:border-0 mt-2 dark:text-black block rounded-xl' 
                  rows={16}
                  id="note-body"
                  placeholder="Some text here.."
                  defaultValue={userNotes.body ? userNotes.body : "Enter text here...." }
                  onChange={handleTextChange}
                />
                <button 
                  className='px-4 py-2 mt-2 button rounded-full dark:bg-slate-500 bg-slate-100 text-black dark:text-slate-50 font-extrabold' 
                  onClick={handleClose}
                >
                  Close
                </button>
            </div>
        </div>
    </>
  );
}
