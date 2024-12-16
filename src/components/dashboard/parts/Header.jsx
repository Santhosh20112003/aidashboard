import React from 'react'
import * as Popover from "@radix-ui/react-popover";
import { TiPlusOutline } from "react-icons/ti";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { IoIosLogOut, IoMdCodeWorking, IoMdLogOut } from "react-icons/io";
import * as Dialog from "@radix-ui/react-dialog";
import { useUserAuth } from '../../context/UserAuthContext';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useData } from "../../context/DataContext";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { LuUserSquare2 } from "react-icons/lu";
import { PiTerminalWindowFill } from "react-icons/pi";
import { MdLogout, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { MdOutlineGroups } from "react-icons/md";
import { AdminEmail } from '../../../common/links';
import { RxHamburgerMenu } from "react-icons/rx";

function Header({ logOut, isDropdownOpen, setIsDropdownOpen, open, setOpen }) {
    const { id } = useParams();
    const { user } = useUserAuth();
    const location = useLocation();
    const { spaces, webspaces, isLoading, setReloadShared, reloadShared } = useData();
    return (
        <div className="w-full items-center justify-between h-[8vh] px-4 pt-5 pb-5 bg-white flex space-x-4">
            <div className="flex items-center gap-3 sm:gap-6">
                <button onClick={() => setOpen(true)} className="active:scale-95 transition-all" >
                    <TbLayoutSidebarLeftExpand className="size-7 text-gray-600" />
                    {/* <RxHamburgerMenu className="size-6 md:hidden text-gray-600" /> */}
                </button>

                <Dialog.Root open={open} >
                    <Dialog.Portal>
                        <Dialog.Overlay onClick={() => { setOpen(!open) }} className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0" />
                        <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-slideDrawer fixed top-0 left-0 w-[75%] max-w-[400px] bg-white focus:outline-none">
                            <div className="flex items-end p-4 justify-between">
                                <h1 className="text-2xl font-semibold text-gray-600">Spaces List</h1>
                            </div>
                            <div className="block overflow-auto px-4 pb-4 h-[90vh]">

                                {spaces.length > 0 && <div className={` items-end ms-1 flex pb-2 justify-between`}>
                                    <h1 className="text-base font-normal  text-gray-600 ">CodeSpaces</h1>
                                    <Link onClick={() => { setOpen(!open) }} to="/dashboard/space/list" className='text-sm text-gray-600  mb-1 underline underline-offset-2' >see all</Link>
                                </div>}
                                <div className={`w-full flex gap-3 min-h-[20vh] flex-col ${(spaces.length == 0 && webspaces.length == 0) ? 'hidden' : 'block'} `}>
                                    {spaces.length > 0 && spaces.slice(0, 3).map((item, index) => (
                                        item.spaceid !== id ? (
                                            <Link
                                                key={index}
                                                onClick={() => setOpen(!open)}
                                                to={`/dashboard/space/info/${item.spaceid}`}
                                                className="w-full p-3 bg-gray-200 text-black border-2 rounded-lg"
                                            >
                                                <h1>{item.spaceid}</h1>
                                                <p>{item.heading}</p>
                                            </Link>
                                        ) : (
                                            <div
                                                key={index}
                                                className="w-full p-3 bg-black text-white border-2 rounded-lg"
                                            >
                                                <h1>{item.spaceid}</h1>
                                                <p>{item.heading}</p>
                                            </div>
                                        )
                                    ))}

                                </div>
                                {webspaces.length > 0 && <div className={`items-end ms-1 mt-5 flex pb-2 justify-between`}>
                                    <h1 className="text-base font-normal  text-gray-600 ">WebSpaces</h1>
                                    <Link onClick={() => { setOpen(!open) }} to="/dashboard/webspace/list" className='text-sm text-gray-600  mb-1 underline underline-offset-2' >see all</Link>
                                </div>}
                                <div className={`w-full flex gap-3 min-h-[20vh] flex-col ${(spaces.length == 0 && webspaces.length == 0) ? 'hidden' : 'block'} `}>
                                    {webspaces.slice(0, 3).map((item, index) => (
                                        item.spaceid !== id ? (
                                            <Link
                                                key={index}
                                                onClick={() => setOpen(!open)}
                                                to={`/dashboard/webspace/info/${item.spaceid}`}
                                                className="w-full p-3 bg-gray-200 text-black border-2 rounded-lg"
                                            >
                                                <h1>{item.spaceid}</h1>
                                                <p>{item.heading}</p>
                                            </Link>
                                        ) : (
                                            <div
                                                key={index}
                                                className="w-full p-3 bg-black text-white border-2 rounded-lg"
                                            >
                                                <h1>{item.spaceid}</h1>
                                                <p>{item.heading}</p>
                                            </div>
                                        )
                                    ))}
                                </div>
                                {(spaces.length == 0 && webspaces.length == 0) && <div>
                                    <div className="h-[80vh] gap-3 flex flex-col items-center justify-center">
                                        <img src="https://ik.imagekit.io/vituepzjm/undraw_taken_re_yn20.svg?updatedAt=1724617636363" alt="nothing to show" className="size-32" />
                                        <h1 className="text-base break-words text-center">No CodeSpaces (or) WebSpaces <br /> are available.</h1>
                                    </div>
                                </div>}
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
                <Link to="/dashboard/home" className="flex items-center">
                    <img src="https://ik.imagekit.io/vituepzjm/codespark.png?updatedAt=1731938834198" alt="codespark" className="h-7" />
                    <h1 className=" text-xl ms-2 font-semibold"><p className="hidden md:block">CodeSpark</p></h1>
                </Link>
                {(location.pathname.includes('dashboard/home') || location.pathname.includes('dashboard/profile')) && <Link to="/dashboard/space/list" className="text-black" >
                    <p className="hidden sm:block text-base underline underline-offset-2">CodeSpaces</p>
                </Link>}
                {(location.pathname.includes('dashboard/home') || location.pathname.includes('dashboard/profile')) && <Link to="/dashboard/webspace/list" className="text-black" >
                    <p className="hidden sm:block text-base underline underline-offset-2">WebSpaces</p>
                </Link>}
                {(location.pathname.includes('dashboard/webspace/list') || location.pathname.includes('dashboard/space/new') || location.pathname.includes('dashboard/trash/codespace') || location.pathname.includes('dashboard/shared') && !location.pathname.includes("/dashboard/shared/webspace") && !location.pathname.includes("/dashboard/shared/codespace")) && <Link to="/dashboard/space/list" className="text-black" >
                    <p className="hidden sm:block text-base underline underline-offset-2">CodeSpaces</p>
                </Link>}
                {(location.pathname.includes('dashboard/space/list') || location.pathname.includes('dashboard/webspace/new') || location.pathname.includes('dashboard/trash/webspace') || location.pathname.includes('dashboard/shared') && !location.pathname.includes("/dashboard/shared/webspace") && !location.pathname.includes("/dashboard/shared/codespace")) && <Link to="/dashboard/webspace/list" className="text-black" >
                    <p className="hidden sm:block text-base underline underline-offset-2">WebSpaces</p>
                </Link>}
            </div>
            <div className="flex items-center gap-2 md:gap-3">

                {location.pathname.includes("space") && <button className="p-2 active:scale-95 transition-all" >
                    <IoMdCodeWorking className="text-2xl md:hidden" />
                </button>}

                {(location.pathname.includes("shared") && !location.pathname.includes("/dashboard/shared/webspace") && !location.pathname.includes("/dashboard/shared/codespace")) && <button disabled={isLoading} onClick={() => { setReloadShared(!reloadShared) }} className="p-2 bg-gray-200 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all" >
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-base transition-all group-active:animate-spin text-main" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path><path d="M20 4v5h-5"></path></svg>
                </button>}

                <Popover.Root>
                    <Popover.Trigger asChild>
                        <button className="inline-flex active:scale-95 transition-all p-2 md:px-2.5 md:py-1.5 bg-black text-white rounded-lg items-center justify-center gap-1" >
                            <TiPlusOutline className="text-lg md:text-base" />  <p className="hidden sm:block">New Space</p>
                        </button>
                    </Popover.Trigger>
                    <Popover.Portal >
                        <Popover.Content sideOffset={10} side="bottom" className="me-[4rem] z-[1000] rounded-lg p-2 flex items-center justify-center gap-2 bg-white w-[300px] border border-main/20 shadow-lg">
                            <Link to={"/dashboard/space/new"}
                                className="w-full inline-flex items-center gap-2 justify-center px-3 py-2 text-sm bg-main rounded-md text-white focus:outline-none"
                                role="menuitem"
                            >
                                <PiTerminalWindowFill /> CodeSpace
                            </Link>
                            <Link to={"/dashboard/webspace/new"}
                                className="w-full inline-flex items-center gap-2 justify-center px-3 py-2 text-sm bg-main rounded-md text-white focus:outline-none"
                                role="menuitem"
                            >
                                <HiOutlineGlobeAlt />WebSpace
                            </Link>
                            <Popover.Arrow className="fill-main/30 " />
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>

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
                            className="grid grid-cols-1 me-4 px-5 py-5 z-[10000] gap-3 rounded-lg mt-2 dark:bg-main bg-white w-fit border border-gray-200 shadow-lg will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                            sideOffset={3}
                        >
                            <Link to="/dashboard/profile" className="flex flex-col items-center text-gray-700 dark:text-gray-200">
                                <img
                                    src={user?.photoURL || 'https://xsgames.co/randomusers/assets/avatars/pixel/51.jpg'}
                                    alt="user_logo"
                                    className="size-14 rounded-full bg-main/30 shadow-md"
                                />
                                <h1 className="mt-2 text-[1rem] font-semibold truncate text-center">{user.displayName}</h1>
                                <p className="text-[.8rem] text-gray-500 dark:text-gray-400">{user.uid}</p>
                            </Link>

                            {user.email == AdminEmail && <div className="">
                                <Link
                                    to="/dashboard/admin/spaces"
                                    className={`flex items-center justify-center gap-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes('admin')
                                        ? 'bg-main text-white shadow-lg'
                                        : 'text-main bg-gray-100 '
                                        }`}
                                    role="menuitem"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <MdOutlineAdminPanelSettings className='text-xl' /> Admin Spaces
                                </Link>
                            </div>}
                            <div className="">
                                <Link
                                    to="/dashboard/shared/list"
                                    className={`flex items-center justify-center gap-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes('shared') && !location.pathname.includes("/dashboard/shared/webspace/view")
                                        ? 'bg-main text-white shadow-lg'
                                        : 'text-main bg-gray-100'
                                        }`}
                                    role="menuitem"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <MdOutlineGroups className='text-xl' /> Shared Space
                                </Link>
                            </div>

                            <hr className="mt-2 mb-2 border-gray-300 dark:border-gray-700" />

                            <div role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                <div className="mb-2 block md:hidden">
                                    <Link
                                        to="/dashboard/space/list"
                                        className={`flex items-center justify-center gap-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes('dashboard/space/list')
                                            ? 'bg-main text-white shadow-lg'
                                            : 'text-main bg-gray-100'
                                            }`}
                                        role="menuitem"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        CodeSpaces
                                    </Link>
                                </div>
                                <div className="mb-2 block md:hidden">
                                    <Link
                                        to="/dashboard/webspace/list"
                                        className={`flex items-center justify-center gap-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes('dashboard/webspace/list')
                                            ? 'bg-main text-white shadow-lg'
                                            : 'text-main bg-gray-100'
                                            }`}
                                        role="menuitem"
                                        onClick={() => setIsDropdownOpen(false)}
                                    > WebSpaces
                                    </Link>
                                </div>
                                <div className="grid mb-2 grid-cols-2 gap-2">
                                    {[
                                        { to: '/dashboard/trash/codespace', label: 'CodeTrash' },
                                        { to: '/dashboard/trash/webspace', label: 'WebTrash' },
                                    ].map((item, index) => (
                                        <Link
                                            key={index}
                                            to={item.to}
                                            className={`inline-flex items-center justify-center gap-1 w-full px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes(item.to)
                                                ? 'bg-main text-white shadow-lg'
                                                : 'text-main dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`}
                                            role="menuitem"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Link
                                        to="/dashboard/profile"
                                        className={`flex items-center justify-center gap-1 px-3 py-2 text-center text-sm font-medium rounded-lg transition-all ${location.pathname.includes('profile')
                                            ? 'bg-main text-white shadow-lg'
                                            : 'text-main dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                        role="menuitem"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <LuUserSquare2 /> Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('codespark');
                                            logOut();
                                            window.location.href = '/home';
                                        }}
                                        className="flex items-center justify-center gap-1 bg-red-600 px-3 py-2 text-center text-sm font-medium text-white rounded-lg hover:bg-red-500 transition-all"
                                        role="menuitem"
                                    >
                                        <MdLogout /> Sign Out
                                    </button>

                                </div>
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