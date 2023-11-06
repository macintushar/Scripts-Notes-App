import scriptsLogoDark from '../assets/Scripts-logos_black.png'
import scriptsLogoLight from '../assets/Scripts-logos_white.png'
import darkModeIcon from '../assets/dark-mode.png'
import lightModeIcon from '../assets/light-mode.png'
import { Link } from 'react-router-dom'
import { app } from '../firebaseConfig'
import { getAuth } from 'firebase/auth'
 


export default function Navbar() {    
    function handleLogout() {
        const auth = getAuth(app);
        auth.signOut()
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
            <button onClick={setModeLight} className='mr-5 bg-slate-800 text-slate-50 dark:bg-slate-300 dark:text-slate-800 w-fit mt-3 self-center rounded-full p-3'>
                <img src={lightModeIcon} alt="Light" className='w-6' />
            </button>
        )
    }
    
    function DarkModeBtn() {
        return(
            <button onClick={setModeDark} className='mr-5 bg-slate-800 text-slate-50 dark:bg-slate-300 dark:text-slate-800 w-fit mt-3 self-center rounded-full p-3'>
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
            <div className='flex justify-center'>
                
            </div>
            <div className='flex flex-row flex-wrap'>
                <div className='basis-1/3'></div>
                <div className='basis-1/3'>
                    <Link to="/">
                        <img src={logo} className='h-16 md:h-20 mx-auto' />
                    </Link>
                </div>
                <div className='flex justify-center'>
                    {modeBtn}
                    <Link to="/new">
                        <button className='mr-5 mt-6 bg-slate-800 text-slate-50 dark:bg-slate-300 dark:text-slate-800 w-fit mt-3 self-center rounded-full p-3'>+ New Note</button>
                    </Link>
                    <button onClick={handleLogout} className='button btn mr-2 bg-slate-800 text-slate-50 dark:bg-slate-300 dark:text-slate-800 w-fit mt-3 self-center rounded-full p-3'>Logout</button>
                </div>
            </div>
        </div>
        </>
    )

}