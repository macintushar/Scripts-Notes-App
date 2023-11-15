import scriptsLogoDark from '../assets/Scripts-logos_black.png'
import scriptsLogoLight from '../assets/Scripts-logos_white.png'
import darkModeIcon from '../assets/dark-mode.png'
import lightModeIcon from '../assets/light-mode.png'
import { Link, useNavigate } from 'react-router-dom'
import { app } from '../firebaseConfig'
import { getAuth } from 'firebase/auth'
 


export default function Navbar() {   
    const navigate = useNavigate();
 
    function handleLogout() {
        const auth = getAuth(app);
        auth.signOut()
    }
    
    function handleNewNote() {
        navigate("/new")
    }
    
    function setModeDark() {
        if (localStorage.theme) {
            localStorage.theme = "dark";
            window.location.reload();
        } else {
            localStorage.setItem('theme','dark');
        }
    }

    function setModeLight() {
        if (localStorage.theme) {
            localStorage.theme = "light";
            window.location.reload();
        } else {
            localStorage.setItem('theme','light');
        }
    }

    function LightModeBtn() {
        return(
            <button onClick={setModeLight} className='mr-5 bg-slate-800 text-slate-50 dark:bg-slate-300 dark:text-slate-800 w-fit self-center rounded-full p-3 h-fit'>
                <img src={lightModeIcon} alt="Light" className='w-6' />
            </button>
        )
    }
    
    function DarkModeBtn() {
        return(
            <button onClick={setModeDark} className='mr-5 bg-slate-800 text-slate-50 dark:bg-slate-300 dark:text-slate-800 w-fit self-center rounded-full p-3 h-fit'>
                <img src={darkModeIcon} alt="Dark" className='w-6' />
            </button>
        )
    }

    let logo;
    let modeBtn;

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        logo = scriptsLogoLight;
        modeBtn = <LightModeBtn />
    } else {
        logo = scriptsLogoDark;
        modeBtn = <DarkModeBtn />
    }

    return(
        <>
        <div className=" w-full bg-gray-500 dark:bg-gray-800 p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div></div>
                <div>
                    <Link to="/">
                        <img src={logo} className='h-16 md:h-20 mx-auto' alt="Scripts logo" />
                    </Link>
                </div>
                <div className='flex justify-center mt-3 md:mt-0'>
                        {modeBtn}

                        <button 
                            onClick={handleNewNote} 
                            className='mr-5 bg-slate-800 text-slate-50 dark:bg-slate-300 dark:text-slate-800 w-fit self-center rounded-full p-3 h-fit'
                        >
                            + New Note
                        </button>
                        
                        <button 
                            onClick={handleLogout} 
                            className='mr-5 bg-slate-800 text-slate-50 dark:bg-slate-300 dark:text-slate-800 w-fit self-center rounded-full p-3 h-fit'
                        >
                            Logout
                        </button>
                </div>
            </div>
        </div>
        </>
    )

}