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

        // Check for authentication state changes
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in
            const userId = user.uid;

            // Reference to the "notes" subcollection within the user's document
            const notesRef = collection(db, "users", userId, "notes");

            // Query to get notes for the current user
            const q = query(notesRef);

            // Subscribe to real-time updates
            const unsubscribeNotes = onSnapshot(q, (querySnapshot) => {
              const notes: DocumentData[] = [];
              querySnapshot.forEach((doc) => {
                const note_id = doc.id;
                const note_data = doc.data();
                note_data["note_id"] = note_id;
                notes.push(note_data);
              });

              // Set the user's notes in the state
              setUserNotes(notes);
            });

            return () => {
              // Unsubscribe when the component unmounts
              unsubscribeNotes();
            };
          } else {
            // User is signed out, handle as needed
            setUserNotes(null);
          }
        });

        return () => {
          // Unsubscribe from authentication changes when the component unmounts
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
  console.log(userNotes)
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
