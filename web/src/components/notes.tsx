import { Link } from "react-router-dom"
import '../App.css'
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Notes({ note }) {

  function sliceText(text:string, index:number) {
    if (text?.length > index) {
      text = text.slice(0,index-3) + "...";
    }
    return text;
  }

  const note_id:string = note.note_id;
  const note_body:string = sliceText(note.body,192);
  const note_title:string = sliceText(note.title,64);
  
  async function handleNoteDelete() {
    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
  
      if (!userId) {
        console.error('User not authenticated');
        return;
      }
      
      const noteRef = doc(db, `users/${userId}/notes/${note_id}`);
      
      await deleteDoc(noteRef);
      console.log('Note deleted successfully.');
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }

  return(
    <Link to={'/note/' + note_id}>
      <div className="dark:border-gray-500 bg-slate-200 dark:bg-slate-600 px-4 py-5 m-2 rounded-2xl sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center flex-col sm:flex-nowrap">
            <div className="ml-4 mt-4 max-w-lg">
              { note_title ? 
                <h3 className="text-base font-semibold leading-8 text-gray-900 dark:text-slate-300">
                {note_title}
                </h3> 
                : 
                <></> 
              }
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-100">
                {note_body}
              </p>
            </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <button
              type="button"
              className="relative inline-flex items-center rounded-md bg-gray-900 dark:bg-gray-300 p-1 text-sm font-semibold text-white dark:hover:bg-gray-500 hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={handleNoteDelete}
            >
              <TrashIcon className="h-8 text-white dark:text-gray-800" />

            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}