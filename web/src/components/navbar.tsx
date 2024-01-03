import WhiteLogo from '../assets/Scripts-logo-white.png'
import { Link, useNavigate } from 'react-router-dom'
import { app } from '../firebaseConfig'
import { getAuth } from 'firebase/auth'
 

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Navbar() {   
    const navigate = useNavigate();
    const auth = getAuth(app);
    const currentUser = auth.currentUser;

    function handleLogout() {
        auth.signOut()
    }

    const user = {
        name: currentUser?.displayName,
        email: currentUser?.email,
        imageUrl:
          currentUser?.photoURL || 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Graduation_%28album%29.jpg/220px-Graduation_%28album%29.jpg',
    }
    
    const userNavigation = [
        { name: 'Your Profile', href: '/profile ' },
        { name: 'Sign out', href: '#', action: handleLogout },
    ]
    
    
    function handleNewNote() {
        navigate("/new")
    }
    
    function setModeDark() {
        if (localStorage.theme) {
            localStorage.theme = "dark";
            window.location.reload();
        } else {
            localStorage.setItem('theme','dark');
            window.location.reload();
        }
    }

    function setModeLight() {
        if (localStorage.theme) {
            localStorage.theme = "light";
            window.location.reload();
        } else {
            localStorage.setItem('theme','light');
            window.location.reload();
        }
    }

    function LightModeBtn() {
        return(
            <button onClick={setModeLight} className='bg-slate-800 text-slate-50 dark:bg-slate-300 dark:text-slate-800 w-fit self-center rounded-full p-2 h-fit'>
                {/* <img src={lightModeIcon} alt="Light" className='w-6' /> */}
                <SunIcon className='h-8' />
            </button>
        )
    }
    
    function DarkModeBtn() {
        return(
            <button onClick={setModeDark} className='bg-slate-800 text-slate-50 dark:bg-slate-300 dark:text-slate-800 w-fit self-center rounded-full p-2 h-fit'>
                <MoonIcon className='h-8' />
            </button>
        )
    }

    let modeBtn;

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        modeBtn = <LightModeBtn />
    } else {
        modeBtn = <DarkModeBtn />
    }

    return(
        <>
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="-ml-2 mr-2 flex items-center md:hidden">
                            {/* Mobile menu button */}
                            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </Disclosure.Button>
                            </div>
                            <div className="flex flex-shrink-0 items-center">
                            <Link to='/'>
                                <img
                                    className="h-12 w-auto"
                                    src={WhiteLogo}
                                    alt="Scripts Notes"
                                />
                            </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <button
                                type="button"
                                className="relative inline-flex items-center gap-x-1.5 rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                                onClick={handleNewNote}
                            >
                                <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                New Note
                            </button>
                            </div>
                            <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                {modeBtn}
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                </Menu.Button>
                                </div>
                                <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                <Menu.Items className="bg-white dark:bg-gray-900 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                            active ? 'bg-gray-100 dark:bg-gray-800 dark:text-white' : '',
                                            'block px-4 py-2 text-sm text-gray-700 dark:text-white'
                                            )}
                                            onClick={item?.action}
                                        >
                                            {item.name}
                                        </a>
                                        )}
                                    </Menu.Item>
                                    ))}
                                </Menu.Items>
                                </Transition>
                            </Menu>
                            </div>
                        </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="flex items-center px-5 sm:px-6">
                            <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                            </div>
                            <div className="ml-3">
                            <div className="text-base font-medium text-white">{user.name}</div>
                            <div className="text-sm font-medium text-gray-400">{user.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2 sm:px-3">
                            {userNavigation.map((item) => (
                            <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                                {item.name}
                            </Disclosure.Button>
                            ))}
                        </div>
                        </div>
                    </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )

}