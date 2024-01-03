import { useState } from 'react'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import WhiteLogo from '../assets/Scripts-logo-white.png';
import BlackLogo from '../assets/Scripts-logo-transparent.png';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { app, db} from '../firebaseConfig'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    const passwordField = document.getElementById("password");
    const repeatPasswordField = document.getElementById("repeat-password");

    const handleSignup = async (event) => {
        event.preventDefault();

        const name = (document.getElementById("name") as HTMLInputElement).value;
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const repeatPassword = (document.getElementById("repeat-password") as HTMLInputElement).value;

        if (password === repeatPassword) {
            const auth = getAuth(app);
            
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
        
                    await updateProfile(user, { displayName: name });
                    console.log(user);

                    const userDocRef = doc(db, "users", user.uid);
                    await setDoc(userDocRef, {
                        name: name,
                        id: user.uid
                    });
        
                    const notesCollectionRef = collection(db, "users", user.uid, "notes");
                    
                    const sampleNote = {
                        title: "Sample Note",
                        body: "This is a sample note.",
                        dateCreated: serverTimestamp(),
                        dateModified: serverTimestamp(),
                        tags: ["sample", "demo"]
                    };
                    
                    await addDoc(notesCollectionRef, sampleNote);
        
                    console.log("User and notes subcollection created successfully.");
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                });
        }        
    }


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);

        const pw_type = passwordField?.getAttribute('type') === 'password' ? 'text' : 'password';
        const rpw_type = passwordField?.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField?.setAttribute('type', pw_type);
        repeatPasswordField?.setAttribute('type', rpw_type);
    };

    let AppLogo;
    if (localStorage.getItem("theme") === "dark" || document.documentElement.classList.contains("dark")) {
        AppLogo = WhiteLogo
    } else {
        AppLogo = BlackLogo
    }
    

    return(
        <div className="flex items-center justify-center h-full">
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                    className="mx-auto h-24 w-auto text-black dark:text-white"
                    src={AppLogo}
                    alt="Your Company"
                    />  
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
                    Sign up for an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white dark:bg-gray-900 px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" onSubmit={ handleSignup }>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                id="name"
                                name="name"
                                type="name"
                                autoComplete="name"
                                required
                                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-3 text-gray-900 dark:text-gray-300">
                                Password
                            </label>
                            <div className="mt-2 flex flex-row">
                                <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full p-2 rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                                />
                                <button className='bg-white rounded-r-md' type='button' onClick={togglePasswordVisibility}>
                                { showPassword ? 
                                    <EyeIcon className='h-6 pr-1' />
                                    :
                                    <EyeSlashIcon className='h-6 pr-1' />
                                }
                                </button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="repeat-password" className="block text-sm font-medium leading-3 text-gray-900 dark:text-gray-300">
                                Repeat Password
                            </label>
                            <div className="mt-2 flex flex-row">
                                <input
                                id="repeat-password"
                                name="repeat-password"
                                type="password"
                                autoComplete="repeat-password"
                                required
                                className="block w-full p-2 rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                                />
                                <button className='bg-white rounded-r-md' type='button' onClick={togglePasswordVisibility}>
                                { showPassword ? 
                                    <EyeIcon className='h-6 pr-1' />
                                    :
                                    <EyeSlashIcon className='h-6 pr-1' />
                                }
                                </button>
                            </div>
                        </div>
                        <div className='leading-6'>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-900 dark:text-gray-100">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-slate-900 hover:text-slate-700 dark:hover:text-white dark:text-slate-200">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}