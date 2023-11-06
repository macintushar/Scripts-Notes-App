import { useState, useEffect } from 'react';
import Notes from './notes';
import LoadingScreen from './loading';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebaseConfig';
import { DocumentData, collection, onSnapshot, query, where } from 'firebase/firestore';


export default function Home() {
  const [userNotes, setUserNotes] = useState<DocumentData | null>();
  let unsubscribe;

  async function getNotes() {
    const auth = getAuth(app);
    const userId = auth.currentUser?.uid;

    const citiesRef = collection(db, "notes");
    const q = query(citiesRef, where("author_id", "==", userId));

    unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notes:DocumentData = [];
      querySnapshot.forEach((doc) => {
        const note_id = doc.id;
        const note_data = doc.data()

        note_data["note_id"] = note_id;
        notes.push(note_data)
      });

      setUserNotes(notes);
    });

    return unsubscribe;
  }

  useEffect(() => {
    unsubscribe = getNotes();
  }, []);

  if (!userNotes) {
    return (
      <LoadingScreen />
    );
  }

  if (userNotes.length === 0) {
    return(
      <div className='flex items-center justify-center h-screen'>
        <h1 className='text-gray-500 dark:text-gray-100 text-center'>No notes available</h1>
      </div>
    )
  }

  return (
    <>
      <div className='flex justify-center mt-10'>
        <div className='container text-center flex items-center justify-center mb-20'>
          <div className="flex mx-auto w-full flex-wrap">
            {userNotes.map((item) => (
              <Notes note={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
