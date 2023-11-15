import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import hiddenImg from '../assets/hidden.png';
import visibleImg from '../assets/visible.png';
import { Link } from 'react-router-dom';
import { app } from '../firebaseConfig';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        console.error(error, typeof(error));
        setLoginError(error)
      });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-slate-100 dark:bg-slate-700 p-20 rounded dark:shadow-slate-600 hover:shadow-md h-full md:h-fit duration-100">
        <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">Sign in to your account</h2>
        {loginError ? <h1 className='text-red-700'>Error: {loginError}</h1> : <></>}
        <form className='space-y-6' onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-100 text-sm font-medium leading-6">Email</label>
            <input type="email" id="email" name="email" placeholder='name@email.com' className="w-full px-4 py-2 rounded-lg dark:bg-gray-200 placeholder:text-gray-600" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-100">Password:</label>
            <div className='flex bg-gray-200 rounded-lg'>
              <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="w-full px-4 py-2 rounded-lg dark:bg-gray-200" placeholder='********' required />
              <button type="button" onClick={togglePasswordVisibility}>
                <img src={showPassword ? visibleImg : hiddenImg} className='w-6 mr-2' alt="Toggle Password Visibility" />
              </button>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Login
            </button>
            <Link to="/signup"><p className='dark:text-slate-50 mt-5'>Don't have an account? <b className='underline hover:text-blue-100'>Sign up here</b></p></Link>
          </div>
        </form>
        {/* {loginError.length > 0 ? <h1>Error: {loginError}</h1> : <>ERR</>} */}
      </div>
    </div>
  );
}
