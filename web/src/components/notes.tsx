import { Link } from "react-router-dom"
import '../App.css'
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
export default function Notes({ note }) {

  function sliceText(text:string, index:number) {
    if (text.length > index) {
      text = text.slice(0,index-3) + "...";
    }
    return text;
  }

  const note_id:string = note.note_id;
  const note_body:string = sliceText(note.body,100);
  const note_title:string = sliceText(note.title,30);
  
  async function handleNoteDelete() {
      await deleteDoc(doc(db, "notes", note_id));
  }
  
  return(
    <div className="group rounded-xl max-h-128 max-w-128 w-fit m-3 min-w-[164px] h-fit bg-slate-200 pb-3 shadow-md dark:shadow-slate-500 dark:bg-slate-600 dark:text-white">
      <Link to={'/note/' + note_id}>
      <article className="pt-6 pl-6 pr-6 ">
        {note_title ? <h1 className="mb-1"><b>{note_title}</b></h1> : <></>}
        <p className="text-left break-words">{note_body}</p>

      </article>
      </Link>
      <div className="justify-end items-center flex mt-2 pr-4">
          <button onClick={handleNoteDelete}>
            <img className="h-5" src="delete.png" />
          </button>
      </div>
    </div>
  )
}