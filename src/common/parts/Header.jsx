import React from 'react'
import { useUserAuth } from '../../components/context/UserAuthContext'
import { Link } from 'react-router-dom';
import { AppName } from '../links';

function Header() {
    const { user } = useUserAuth();
    return (
        <header class="text-black body-font border-b border-gray-200">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to="" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img src={require("../../assets/logo192.png")} alt="Logo" className="size-10" />
                    <span class="ml-2 text-xl">{AppName}</span>
                </Link >
                <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link to="" class="mr-5 hover:text-gray-900">Home</Link >
                    <Link to="" class="mr-5 hover:text-gray-900">Need a Spark?</Link >
                    <Link to="" class="mr-5 hover:text-gray-900">Contact</Link >
                </nav>
                {user ? <Link to="/dashboard" class="inline-flex items-center bg-black border-0 py-1 px-3 text-white focus:outline-none hover:bg-black/80 rounded text-base mt-4 md:mt-0">
                    Your Space
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </Link> : <Link to="/auth" class="inline-flex items-center bg-black border-0 py-1 px-3 text-white focus:outline-none hover:bg-black/80 rounded text-base mt-4 md:mt-0">
                    Access Now
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </Link>}
            </div>
        </header>
    )
}

export default Header