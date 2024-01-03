import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import WhiteLogo from '../assets/Scripts-logo-white.png';
import BlackLogo from '../assets/Scripts-logo-transparent.png';
import { Link } from 'react-router-dom';
import { app } from '../firebaseConfig';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const passwordField = document.getElementById("password");
  
  const handleLogin = async (event) => {
    event.preventDefault();
    
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error(error)
      });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);

    const type = passwordField?.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField?.setAttribute('type', type);
  };

  let AppLogo;
  if (localStorage.getItem("theme") === "dark" || document.documentElement.classList.contains("dark")) {
    AppLogo = WhiteLogo
  } else {
    AppLogo = BlackLogo
  }

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-24 w-auto text-black dark:text-white"
          src={AppLogo}
          alt="Your Company"
        />  
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white dark:bg-gray-900 px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={ handleLogin }>
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
            <div className='leading-6'>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Sign in
              </button>
            </div>
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm text-gray-900 dark:text-gray-100">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold leading-6 text-slate-900 hover:text-slate-700 dark:hover:text-white dark:text-slate-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  </>
  );
}
