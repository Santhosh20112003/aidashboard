import React from 'react'
import { useUserAuth } from '../../components/context/UserAuthContext'
import { Link, useLocation } from 'react-router-dom';
import { AppName } from '../links';
import { HiMiniBars3 } from "react-icons/hi2";
import * as Dialog from "@radix-ui/react-dialog";
import { useData } from "../../components/context/DataContext";
import { IoMdClose } from "react-icons/io";

function Header() {
    const { user } = useUserAuth();
    const location = useLocation();
    const { isHamOpen, setIsHamOpen } = useData();

    return (
        <header class="text-black body-font border-b border-gray-200">
            <div class="container md:mx-auto flex flex-wrap p-5 flex-row items-center justify-between md:justify-normal">
                <div className="flex items-center gap-2">
                    <button onClick={() => { setIsHamOpen(!isHamOpen) }} className="md:hidden text-lg active:scale-90 transition-all">
                        <HiMiniBars3 />
                    </button>
                    <Dialog.Root open={isHamOpen} >
                        <Dialog.Portal>
                            <Dialog.Overlay onClick={() => { setIsHamOpen(!isHamOpen) }} className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0" />
                            <Dialog.Content className="z-[10000] min-h-auto data-[state=open]:animate-enterFromTop fixed top-0 left-0 w-full bg-white focus:outline-none">
                                <div class="container md:mx-auto flex flex-wrap p-5 flex-row items-center justify-between md:justify-normal">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => { setIsHamOpen(!isHamOpen) }} className="md:hidden text-lg active:scale-90 transition-all">
                                            <IoMdClose />
                                        </button>
                                        <Link to="" onClick={() => { setIsHamOpen(!isHamOpen) }} class="flex title-font font-medium items-center text-gray-900 ">
                                            <img src={require("../../assets/logo192.png")} alt="Logo" className="size-8 md:size-10" />
                                            <span class="ml-1 md:ml-2 text-lg md:text-xl">{AppName}</span>
                                        </Link >
                                    </div>
                                    <nav class="md:ml-auto hidden md:flex flex-wrap items-center text-base justify-center">
                                        <Link to="/home" class={`mr-5 hover:text-gray-900 ${location.pathname.includes("home") && 'underline underline-offset-2'}`}>Home</Link >
                                        <Link to="/need-spark" class={`mr-5 hover:text-gray-900 ${location.pathname.includes("need-spark") && 'underline underline-offset-2'}`}>Need a Spark?</Link >
                                        <Link to="/contact" class={`mr-5 hover:text-gray-900 ${location.pathname.includes("contact") && 'underline underline-offset-2'}`}>Contact</Link >
                                    </nav>
                                    {user ? <Link to="/dashboard" class="inline-flex items-center bg-black border-0 py-1 px-3 text-white focus:outline-none hover:bg-black/80 rounded text-base ">
                                        Your Space
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link> : <Link to="/auth" class="inline-flex items-center bg-black border-0 py-1 px-3 text-white focus:outline-none hover:bg-black/80 rounded text-base ">
                                        Access Now
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>}
                                </div>
                                <div className="p-5 flex flex-col mt-24 gap-5 items-start text-base justify-center">
                                    <Link onClick={() => { setIsHamOpen(!isHamOpen) }} to="/home" class={`hover:text-gray-900 py-2 ${location.pathname.includes("home") && 'underline underline-offset-2'}`}>Home</Link >
                                    <Link onClick={() => { setIsHamOpen(!isHamOpen) }} to="/need-spark" class={`hover:text-gray-900 py-2 ${location.pathname.includes("need-spark") && 'underline underline-offset-2'}`}>Need a Spark?</Link >
                                    <Link onClick={() => { setIsHamOpen(!isHamOpen) }} to="/contact" class={`hover:text-gray-900 py-2 ${location.pathname.includes("contact") && 'underline underline-offset-2'}`}>Contact</Link >
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                    <Link to="" class="flex title-font font-medium items-center text-gray-900 ">
                        <img src={require("../../assets/logo192.png")} alt="Logo" className="size-8 md:size-10" />
                        <span class="ml-1 md:ml-2 text-lg md:text-xl">{AppName}</span>
                    </Link >
                </div>
                <nav class="md:ml-auto hidden md:flex flex-wrap items-center text-base justify-center">
                    <Link to="/home" class={`mr-5 hover:text-gray-900 ${location.pathname.includes("home") && 'underline underline-offset-2'}`}>Home</Link >
                    <Link to="/need-spark" class={`mr-5 hover:text-gray-900 ${location.pathname.includes("need-spark") && 'underline underline-offset-2'}`}>Need a Spark?</Link >
                    <Link to="/contact" class={`mr-5 hover:text-gray-900 ${location.pathname.includes("contact") && 'underline underline-offset-2'}`}>Contact</Link >
                </nav>
                {user ? <Link to="/dashboard" class="inline-flex items-center bg-black border-0 py-1 px-3 text-white focus:outline-none hover:bg-black/80 rounded text-base ">
                    Your Space
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </Link> : <Link to="/auth" class="inline-flex items-center bg-black border-0 py-1 px-3 text-white focus:outline-none hover:bg-black/80 rounded text-base ">
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