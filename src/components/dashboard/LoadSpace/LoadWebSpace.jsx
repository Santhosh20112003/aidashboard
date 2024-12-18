import React, { useEffect, useState } from 'react'
import ChatInput from '../webparts/ChatInput'
import CodePlayground from '../webparts/CodePlayground'
import Preview from '../webparts/Preview'
import { useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext';
import { IoMdCloudDone } from "react-icons/io";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoCloudOfflineSharp } from "react-icons/io5";
import * as Dialog from "@radix-ui/react-dialog";
import "./load.css";
import Editor from "./code/Editor";
import Chat from "./code/Chat";

function LoadWebSpace() {
    const { id } = useParams();
    const {
        setHeading,
        setExplanation,
        setFramework,
        setLastInput,
        webspaces,
        setInput,
        setWebSpaceid,
        setType,
        Type,
        input,
        isLoading,
        htmlCode, cssCode, jsCode, framework,
        setHtmlCode,
        setCssCode,
        setJsCode,
        setCodeShared,
        setNotes,
        notes,
        isFullScreen,
        setConversation
    } = useData();
    const [cloudSync, setCloudSync] = useState(false);
    const [data, setData] = useState(null);
    const [isAIOpen, setIsAIOpen] = useState(false);
    const [isNotesOpen, setIsNotesOpen] = useState(false);

    useEffect(() => {
        setConversation([]);
    }, []);

    useEffect(() => {
        const loadSpaceData = () => {
            try {
                const res = webspaces.find((item) => item.spaceid === id);
                setHeading(res?.heading);
                setWebSpaceid(res?.spaceid);
                setInput(res?.input);
                setLastInput(res?.lastinput);
                setExplanation(res?.explanation);
                setType(res?.type);
                setNotes(res?.notes);
                setFramework(res?.frameworks);
                setHtmlCode(res?.htmlCode);
                setCssCode(res?.cssCode);
                setJsCode(res?.jsCode);
                setCodeShared(res?.shared);
                setData(res || null);
            }
            catch (err) {
                console.log(err);
            }
        };

        loadSpaceData();
    }, [id, webspaces]);

    const container = document.getElementById("webspace");

    if (!data) {
        return <div className="w-full h-screen flex items-center justify-center">Loading or no space found...</div>;
    }

    return (
        <div id="webspace" className="w-full h-[90vh] px-4 pb-2 pt-2 bg-white flex space-x-4">
            <div className={`md:w-1/2 w-full h-full space-y-4`}>
                <CodePlayground htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} framework={framework} />
                <ChatInput input={input} setInput={setInput} handleWebChatSubmission={() => { }} isLoading={isLoading} />
            </div>
            <div className={`w-1/2 md:block hidden h-full`}>
                <Preview htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} framework={framework} />
                {/* <Console /> */}
            </div>

            {isFullScreen && <button onClick={() => setIsAIOpen(true)} className="z-50 bg-black hidden md:block fixed top-24 right-0 text-white py-5 rounded-s-lg lg:active:pe-3 shadow transition-all cursor-pointer">
                <p className="-rotate-90">Jarvis</p>
            </button>}

            {isFullScreen && <button onClick={() => setIsNotesOpen(true)} className="z-50 bg-black hidden md:block fixed top-48 right-0 text-white py-5 rounded-s-lg lg:active:pe-3 shadow transition-all cursor-pointer">
                <p className="-rotate-90">Notes</p>
            </button>}

            {!isFullScreen && <div className="fixed top-0 left-1/2 h-[50px] hidden md:flex gap-5 -translate-x-1/2">
                <button onClick={() => setIsAIOpen(true)} className=" bg-black h-fit text-white px-5 py-1 rounded-b-lg lg:active:pt-3 shadow transition-all cursor-pointer">
                    <p className="">Jarvis AI</p>
                </button>

                <button onClick={() => setIsNotesOpen(true)} className=" bg-black h-fit text-white px-5 py-1 rounded-b-lg lg:active:pt-3 shadow transition-all cursor-pointer">
                    <p className="">Notes</p>
                </button>
            </div>}

            {!isFullScreen && <button onClick={() => setIsAIOpen(true)} className="z-50 bg-black md:hidden fixed top-36 right-0 text-white py-4 rounded-s-lg lg:active:pe-2 shadow transition-all cursor-pointer">
                <p className="-rotate-90 text-xs">Jarvis</p>
            </button>}

            {!isFullScreen && <button onClick={() => setIsNotesOpen(true)} className="z-50 bg-black md:hidden fixed top-36 left-0 text-white py-4 rounded-e-lg lg:active:ps-2 shadow transition-all cursor-pointer">
                <p className="rotate-90 text-xs">Notes</p>
            </button>}

            <Dialog.Root open={isAIOpen} >
                <Dialog.Portal container={container}>
                    <Dialog.Overlay onClick={() => { setIsAIOpen(!isAIOpen) }} className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0" />
                    <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-enterFromLeft data-[state=close]:animate-exitToLeft fixed top-0 left-0 w-full max-w-[600px] bg-white focus:outline-none">
                        <div className="flex items-end p-4 justify-between">
                            <h1 className="text-2xl ms-2 font-semibold text-black">Jarvis AI</h1>
                            <button onClick={() => setIsAIOpen(!isAIOpen)} className="p-2 md:hidden bg-gray-200 rounded-lg active:scale-90 transition-all">
                                <GoArrowLeft />
                            </button>
                        </div>
                        <Chat />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <Dialog.Root open={isNotesOpen} >
                <Dialog.Portal container={container}>
                    <Dialog.Overlay onClick={() => { setIsNotesOpen(!isNotesOpen) }} className="bg-blackA6 z-[1000] data-[state=open]:right-0 right-[-50%] fixed inset-0" />
                    <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-enterFromRight fixed top-0 right-0 w-full max-w-[600px] bg-white focus:outline-none">
                        <div className="flex items-end p-4 justify-between">
                            <h1 className="text-2xl font-semibold text-black">Space Notes</h1>
                            <div className="flex items-center gap-3">
                                <button className=" p-1.5 bg-gray-100 rounded-lg active:scale-90 transition-all">
                                    {cloudSync ? <IoCloudOfflineSharp title="data not synced with cloud" className="text-xl md:text-2xl text-yellow-600" /> : <IoMdCloudDone title="data synced with cloud" className="text-xl md:text-2xl text-green-600" />}
                                </button>
                                <button onClick={() => setIsNotesOpen(!isNotesOpen)} className="p-2 bg-gray-200 md:hidden rounded-lg active:scale-90 transition-all">
                                    <GoArrowRight />
                                </button>
                            </div>
                        </div>
                        <Editor editorData={notes} setCloudSync={setCloudSync} />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}

export default LoadWebSpace