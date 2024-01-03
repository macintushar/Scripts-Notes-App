import { useState, useEffect } from 'react';
import Notes from './notes';
import LoadingScreen from './loading';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, db } from '../firebaseConfig';
import { DocumentData, collection, onSnapshot, query } from 'firebase/firestore';


export default function Home() {
  const [userNotes, setUserNotes] = useState<DocumentData[] | null>(null);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
          const userId = user.uid;
          const notesRef = collection(db, "users", userId, "notes");
          const q = query(notesRef);

          const unsubscribeNotes = onSnapshot(q, (querySnapshot) => {
            const notes: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
              const note_id = doc.id;
              const note_data = doc.data();
              note_data["note_id"] = note_id;
              notes.push(note_data);
            });
            setUserNotes(notes);
          });

        return () => {
          unsubscribeNotes();
        };
      } else {
        setUserNotes(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };

  }, []); // Empty dependency array ensures this effect runs only once on mount

  if (!userNotes) {
    return <LoadingScreen />;
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
              <Notes note={item} key={item.note_id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
