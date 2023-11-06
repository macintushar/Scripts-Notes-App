import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { app, db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

export default function NewNote() {
    const navigate = useNavigate();

    async function handleClose() {
        const new_title = (document.getElementById("note-title") as HTMLInputElement).value;
        const new_body = (document.getElementById("note-body") as HTMLInputElement).value;
        
        const auth = getAuth(app);
        const userId = auth.currentUser?.uid;
        
        try {
            await addDoc(collection(db, "notes"), {
                author_id: userId,
                title: new_title,
                body: new_body,
                last_modified: serverTimestamp()
            });
        } catch (error) {
            console.error(error)
        } finally {
            navigate("/")
        }        
    }

  return (
    <>
        <div className="flex justify-center">
            <div className="bg-slate-400 dark:bg-slate-700 p-4 h-full md:p-20 rounded md:h-fit container mt-20 w-full">
                <input className='w-full p-3 focus:ring-0 dark:text-black font-extrabold block rounded-xl' id="note-title" placeholder="Title"></input>
                <textarea className='w-full h-min-6xl p-3 focus:ring-0 focus:border-0 mt-2 dark:text-black block rounded-xl' rows={16} id="note-body" placeholder="Some text here.."></textarea>
                <button className='px-4 py-2 mt-2 button rounded-full dark:bg-slate-500 bg-slate-100 text-black dark:text-slate-50 font-extrabold' onClick={handleClose}>Close</button>
            </div>
        </div>
    </>
  );
}
