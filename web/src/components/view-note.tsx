import { useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import LoadingScreen from './loading';

export default function ViewNote({ session }) {
    const [userNotes, setUserNotes] = useState<any>(null);
    const params = useParams();
    const note_uid = params.id;

    const navigate = useNavigate();

    async function handleClose() {
        const new_title = (document.getElementById("note-title") as HTMLInputElement).value;
        const new_body = (document.getElementById("note-body") as HTMLInputElement).value;
        console.log(note_uid,new_title,new_body)
        navigate("/")
    }
    const fetchData = async () => {
      const sample = [
        {
          note_body:"Text",
          note_title:"123"
        }
      ]
      setUserNotes(sample)
    };

  useEffect(() => {
    fetchData();
  }, [session]);

  if (!userNotes) {
    return <LoadingScreen />;
  }

  return (
    <>
        <div className="flex justify-center">
            <div className="bg-slate-400 dark:bg-slate-700 p-4 h-full md:p-20 rounded md:h-fit container mt-20 w-full">
                <input className='w-full p-3 focus:ring-0 dark:text-black font-extrabold block rounded-xl' id="note-title" placeholder="Title" defaultValue={userNotes[0].note_title ? userNotes[0].note_title : "" }></input>
                <textarea className='w-full h-min-6xl p-3 focus:ring-0 focus:border-0 mt-2 dark:text-black block rounded-xl' rows={16} id="note-body" placeholder="Some text here.." defaultValue={userNotes[0].note_body ? userNotes[0].note_body : "Enter text here...." }></textarea>
                <button className='px-4 py-2 mt-2 button rounded-full dark:bg-slate-500 bg-slate-100 text-black dark:text-slate-50 font-extrabold' onClick={handleClose}>Close</button>
            </div>
        </div>
    </>
  );
}
