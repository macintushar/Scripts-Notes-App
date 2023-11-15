import { useState } from 'react'

import hiddenImg from '../assets/hidden.png'
import visibleImg from '../assets/visible.png'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { app, db} from '../firebaseConfig'
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

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
        
                    // Update user profile
                    await updateProfile(user, { displayName: name });
                    console.log(user);
        
                    // Create user document in the "users" collection
                    const userDocRef = doc(db, "users", user.uid);
                    await setDoc(userDocRef, {
                        name: name,
                        id: user.uid
                    });
        
                    // Create a "notes" subcollection within the user's document
                    const notesCollectionRef = collection(db, "users", user.uid, "notes");
                    
                    // Example: Adding a sample note to the "notes" subcollection
                    const sampleNote = {
                        title: "Sample Note",
                        content: "This is a sample note.",
                        dateCreated: serverTimestamp(),
                        dateModified: serverTimestamp(),
                        tags: ["sample", "demo"]
                    };
                    
                    // Add the sample note to the "notes" subcollection
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
      };
    

    return(
        <div className="flex items-center justify-center h-full">
            <div className="bg-slate-100 dark:bg-slate-700 p-20 rounded dark:shadow-slate-600 shadow-xl h-full md:h-fit">
                <img src='' alt="" />
                <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">Sign up for an account</h2>
                <form className='space-y-6' onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="Name" className="block text-gray-700 dark:text-gray-100 text-sm font-medium leading-6">Name</label>
                        <input type="text" id="name" name="name" placeholder='First and Last Name' className="w-full px-4 py-2 rounded-lg dark:bg-gray-200 placeholder:text-gray-600" required />
                    </div>
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
                    <div className="mb-4">
                        <label htmlFor="repeat-password" className="block text-gray-700 dark:text-gray-100">Repeat Password:</label>
                        <div className='flex bg-gray-200 rounded-lg'>
                            <input type={showPassword ? 'text' : 'password'} id="repeat-password" name="password" className="w-full px-4 py-2 rounded-lg dark:bg-gray-200" placeholder='********' required />
                            <button type="button" onClick={togglePasswordVisibility}>
                                <img src={showPassword ? visibleImg : hiddenImg} className='w-6 mr-2' alt="Toggle Password Visibility" />
                            </button>                        
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}