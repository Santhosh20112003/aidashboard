import React, { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from '../parts/Header'
import { useData } from '../../context/DataContext';
import { useUserAuth } from '../../context/UserAuthContext';
import { Toaster } from 'react-hot-toast';
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { IoCloseSharp } from 'react-icons/io5';
import * as Tabs from "@radix-ui/react-tabs";
import { codespacelist, webspacelist } from '../../../common/template';
import { LANGUAGE_VERSIONS } from '../../../constants';

function Structure() {
    const { user, logOut } = useUserAuth();
    const { handleNewSpaceAdd, isLoading, handleNewWebSpaceAdd, setNewOpen, newOpen, getWebTemplates, getCodeTemplates, getWebTrashes, getWebSpaces, getCodeTrashes, NewUserCloud, isFetching, getSpaces, isDropdownOpen, setIsDropdownOpen, open, setOpen } = useData();
    const location = useLocation();

    useEffect(() => {
        if (!isFetching && Object.keys(user).length > 0) {
            getSpaces(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (!isFetching && Object.keys(user).length > 0) {
            getWebSpaces(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (!isFetching && Object.keys(user).length > 0) {
            getCodeTrashes(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (!isFetching && Object.keys(user).length > 0) {
            getWebTrashes(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            NewUserCloud(user);
            getCodeTemplates();
            getWebTemplates();
        }
    }, [user]);

    return (
        <div className="min-h-screen flex flex-col items-center">
            <Header setOpen={setOpen} open={open} setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen} logOut={logOut} />
            <div className="w-full">
                <Outlet />
            </div>
            <AlertDialog.Root open={newOpen}>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay onClick={() => setNewOpen(!newOpen)} className="bg-black w-full h-screen bg-opacity-10 md:bg-opacity-15 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <AlertDialog.Content className="fixed bottom-0 left-1/2 right-1/2 px-3 pt-3 -translate-x-1/2 overflow-y-auto max-h-[60vh] h-[60vh] md:max-h-[70vh] md:h-[70vh] w-full md:w-[1000px] rounded-t-3xl bg-white shadow-md focus:outline-none">
                        <div className="px-5 py-3 h-full">
                            <div className="flex items-center justify-between w-full mb-3 py-2">
                                <div className="text-md font-semibold md:text-xl text-center md:text-start text-black">
                                    Create New Space
                                </div>
                                <button onClick={() => setNewOpen(!newOpen)} className='active:scale-90 transition-all' >
                                    <IoCloseSharp className='text-black text-xl' />
                                </button>
                            </div>
                            <Tabs.Root
                                className="flex w-full flex-col"
                                defaultValue={location.pathname.includes("webspace") ? "webspace" : "codespace"}
                            >
                                <Tabs.List
                                    className="flex items-center justify-start gap-3 mb-5"
                                    aria-label="Manage your account"
                                >
                                    <Tabs.Trigger
                                        className="bg-gray-100 active:scale-95 transition-all text-xs text-black px-4 py-2 rounded-md data-[state=active]:bg-black data-[state=active]:text-white"
                                        value="codespace"
                                    >
                                        CodeSpace
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        className="bg-gray-100 active:scale-95 transition-all text-xs text-black px-4 py-2 rounded-md data-[state=active]:bg-black data-[state=active]:text-white"
                                        value="webspace"
                                    >
                                        WebSpace
                                    </Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content
                                    className="grow focus:outline-none bg-white"
                                    value="codespace"
                                >
                                    <div className="w-full max-h-[40vh] md:max-h-[50vh] pe-2 pb-2 overflow-y-auto grid md:grid-cols-3 grid-cols-1 gap-3">
                                        <Link to={"/dashboard/space/new"} disabled={isLoading} onClick={() => setNewOpen(!newOpen)} className="flex items-center md:col-span-2 gap-2 p-4 rounded-md group bg-black/5 active:scale-95 hover:border-black/10 border border-transparent hover:bg-black/10 cursor-pointer transition-all">
                                            <img
                                                src={"https://ik.imagekit.io/vituepzjm/Jarvis.png"}
                                                alt="language-logo"
                                                className="size-10 p-1 rounded-lg object-cover bg-main"
                                            />
                                            <div>
                                                <h1 className="text-base leading-[1.2rem] text-start line-clamp-1 overflow-hidden font-medium text-black"> <span className="hidden md:inline-flex">Create</span> CodeSpace with AI</h1>
                                                <p className="text-sm  leading-[1.2rem] text-start ms-1 line-clamp-1 overflow-hidden text-black/70">create your customised dahboard with jarvis ai</p>
                                            </div>
                                        </Link>
                                        {codespacelist.map((item, index) => (
                                            <button key={index} disabled={isLoading} onClick={() => handleNewSpaceAdd(item.data)} className="flex disabled:cursor-not-allowed disabled:opacity-60 items-center gap-2 p-4 rounded-md group bg-black/0 active:scale-95 hover:border-black/10 border border-transparent hover:bg-black/5 cursor-pointer transition-all">
                                                <img
                                                    src={LANGUAGE_VERSIONS[item.language]?.image || "https://via.placeholder.com/50"}
                                                    alt="language-logo"
                                                    className="w-8 object-contain"
                                                />
                                                <div>
                                                    <h1 className="text-base leading-[1.2rem] text-start line-clamp-1 overflow-hidden font-medium text-black">{item.name}</h1>
                                                    <p className="text-sm  leading-[1.2rem] text-start ms-1 line-clamp-1 overflow-hidden text-black/70">{item.language}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </Tabs.Content>
                                <Tabs.Content
                                    className="grow focus:outline-none bg-white"
                                    value="webspace"
                                >
                                    <div className="w-full max-h-[40vh] md:max-h-[50vh] pe-2 pb-2 overflow-y-auto grid md:grid-cols-3 grid-cols-1 gap-3">
                                        <Link disabled={isLoading} to={"/dashboard/webspace/new"} onClick={() => setNewOpen(!newOpen)} className="flex items-center md:col-span-2 gap-2 p-4 rounded-md group bg-black/5 active:scale-95 hover:border-black/10 border border-transparent hover:bg-black/10 cursor-pointer transition-all">
                                            <img
                                                src={"https://ik.imagekit.io/vituepzjm/Jarvis.png"}
                                                alt="language-logo"
                                                className="size-10 p-1 rounded-lg object-cover bg-main"
                                            />
                                            <div>
                                                <h1 className="text-base leading-[1.2rem] text-start line-clamp-1 overflow-hidden font-medium text-black"> <span className="hidden md:inline-flex">Create</span> WebSpace with AI</h1>
                                                <p className="text-sm  leading-[1.2rem] text-start ms-1 line-clamp-1 overflow-hidden text-black/70">create your customised dahboard with jarvis ai</p>
                                            </div>
                                        </Link>
                                        {webspacelist.map((item, index) => (
                                            <button key={index} disabled={isLoading} onClick={() => handleNewWebSpaceAdd(item.data)} className="flex disabled:cursor-not-allowed disabled:opacity-60 items-center gap-2 p-4 rounded-md group bg-black/0 active:scale-95 hover:border-black/10 border border-transparent hover:bg-black/5 cursor-pointer transition-all">
                                                <img
                                                    src={LANGUAGE_VERSIONS[item.language]?.image || "https://via.placeholder.com/50"}
                                                    alt="language-logo"
                                                    className="w-8 object-contain"
                                                />
                                                <div>
                                                    <h1 className="text-base leading-[1.2rem] text-start line-clamp-1 overflow-hidden font-medium text-black">{item.name}</h1>
                                                    <p className="text-sm  leading-[1.2rem] text-start ms-1 line-clamp-1 overflow-hidden text-black/70">{item.language}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </Tabs.Content>
                            </Tabs.Root>
                            <div className="grid grid-cols-1 place-items-center gap-3 md:grid-cols-3">

                            </div>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
            <Toaster />
        </div>
    )
}

export default Structure