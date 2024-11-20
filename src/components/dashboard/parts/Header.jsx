import React from 'react'
import * as Popover from "@radix-ui/react-popover";
import { TiPlusOutline } from "react-icons/ti";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { IoMdCodeWorking } from "react-icons/io";
import * as Dialog from "@radix-ui/react-dialog";
import { useUserAuth } from '../../context/UserAuthContext';
import { Link, useLocation } from 'react-router-dom';

function Header({ logOut, isDropdownOpen, setIsDropdownOpen, open, setOpen }) {
    const { user } = useUserAuth;
    const location = useLocation();
    return (
        <div className="w-full items-center justify-between h-[8vh] px-4 pt-5 pb-5 bg-white flex space-x-4">
            <div className="flex items-center gap-3 sm:gap-6">
                <button onClick={() => setOpen(true)} className="active:scale-95 transition-all" >
                    <TbLayoutSidebarLeftExpand className="size-7 text-gray-600" />
                </button>
                <Dialog.Root open={open} >
                    <Dialog.Portal>
                        <Dialog.Overlay onClick={() => { setOpen(!open) }} className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0" />
                        <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-slideDrawer fixed top-0 left-0 w-[75%] flex items-start justify-between flex-col max-w-[400px] bg-white p-4 focus:outline-none">
                            <h1 className="text-2xl">Space List</h1>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
                <Link to="/dashboard/home" className="flex items-center">
                    <img src="https://ik.imagekit.io/vituepzjm/codespark.png?updatedAt=1731938834198" alt="codespark" className="h-7" />
                    <h1 className=" text-xl ms-2 font-semibold"><p className="hidden md:block">Code Spark</p></h1>
                </Link>
                {location.pathname.includes('dashboard/space') && <Link to="/dashboard/home" className="text-black" >
                    <p className="hidden sm:block text-base underline underline-offset-2">Space Overview</p>
                </Link>}

            </div>
            <div className="flex items-center gap-3">
                <button className="p-2 active:scale-95 transition-all" >
                    <IoMdCodeWorking className="text-2xl md:hidden" />
                </button>
                {location.pathname.includes('dashboard/space') && <button className="inline-flex active:scale-95 transition-all p-2 md:px-2.5 md:py-1.5 bg-black text-white rounded-lg items-center justify-center gap-1" >
                    <TiPlusOutline className="text-lg md:text-base" />  <p className="hidden sm:block">New Space</p>
                </button>}
                {location.pathname.includes('dashboard/home') && <Link to="/dashboard/space" className="text-black mr-5" >
                    <p className="hidden sm:block text-base underline underline-offset-2">Code Spaces</p>
                </Link>}

                <Popover.Root>
                    <Popover.Trigger asChild>
                        <button
                            onClick={() => {
                                setIsDropdownOpen(!isDropdownOpen);
                            }}
                            className="flex w-fit items-center cursor-pointer gap-2 active:scale-95 transition-all"
                        >
                            <div className="size-11 rounded-lg flex border border-main/30 items-center justify-center text-white md:text-3xl text-2xl text-center relative">
                                <img
                                    src={user?.photoURL || 'https://xsgames.co/randomusers/assets/avatars/pixel/51.jpg'}
                                    alt="user_logo"
                                    className="size-9 rounded-md bg-main/30"
                                />
                            </div>
                        </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content
                            className="grid grid-cols-1 me-4 z-[10000] gap-3 rounded-lg px-1 py-2 mt-2 dark:bg-main bg-white w-[180px] border border-gray-200 shadow-lg will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                            sideOffset={3}
                        >
                            <div
                                className="px-2 flex flex-col gap-1"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu"
                            >
                                <Link
                                    to="profile"
                                    className={`${location.pathname.includes("profile")
                                        ? " bg-main shadow-lg text-white rounded-md"
                                        : ""
                                        } block w-full text-start px-4 py-2 text-sm dark:text-white text-main focus:outline-none`}
                                    role="menuitem"
                                    onClick={() => {
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("codespark");
                                        logOut();
                                        window.location.href = "/home";
                                    }}
                                    className="block w-full text-start px-4 py-2 text-sm text-main focus:outline-none"
                                    role="menuitem"
                                >
                                    Sign out
                                </button>
                            </div>
                            <Popover.Arrow className="fill-main/25 -ms-3" />
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </div>
        </div>
    )
}

export default Header