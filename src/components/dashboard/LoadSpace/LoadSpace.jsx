import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import YouTubeFrame from "../parts/YouTubeFrame";
import ChatInput from "../parts/ChatInput";
import CodeEditor from "../parts/CodeEditor";
import OutputDisplay from "../parts/OutputDisplay";
import toast from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { BiSolidCopy, BiCopy } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { converter } from "../../../common/config";
import "../../../chat.css";
import { TbSettingsCode } from "react-icons/tb";
import { monacoThemes } from "../../../constants";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";
import { IoMdCloudDone } from "react-icons/io";
import { IoCloudOfflineSharp } from "react-icons/io5";
import "./load.css";
import Editor from "./code/Editor";
import Chat from "./code/Chat";

function LoadSpace() {
    const { id } = useParams();
    const {
        isCodeOpen,
        setHeading,
        setVideos,
        setVideoID,
        setEditorContent,
        setExplanation,
        setLanguage,
        setLastInput,
        explanation,
        language,
        editorContent,
        output,
        heading,
        videos,
        videoID,
        spaces,
        handleChange,
        setInput,
        input,
        isLoading,
        iscopied,
        theme,
        HandleTheme,
        copied,
        copyToClipboard,
        handleChatSubmission,
        handleCodeExecute,
        handleOptimizer,
        copyOutputToClipboard,
        onSwap,
        isOutputLoading,
        isGenerating,
        setSpaceid,
        setCodeShared,
        setOutput,
        isFullScreen,
        setIsFullscreen,
        setNotes,
        notes
    } = useData();
    const [cloudSync, setCloudSync] = useState(false);
    const editorReference = useRef(null);
    const [data, setData] = useState(null);
    const [isAIOpen, setIsAIOpen] = useState(false);
    const [isNotesOpen, setIsNotesOpen] = useState(false);

    const HandleFullScreen = () => {
        const codespaceElement = document.getElementById("codespace");

        if (codespaceElement) {
            if (!document.fullscreenElement) {
                codespaceElement.requestFullscreen()
                    .then(() => setIsFullscreen(true))
                    .catch((err) => console.error("Error entering fullscreen:", err));
            } else {
                document.exitFullscreen()
                    .then(() => setIsFullscreen(false))
                    .catch((err) => console.error("Error exiting fullscreen:", err));
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            try {
                const isFullscreen = Boolean(document.fullscreenElement);
                setIsFullscreen(isFullscreen);
            }
            catch (err) {
                console.log("Error handling fullscreen change", err)
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, [setIsFullscreen]);

    useEffect(() => {
        const loadSpaceData = () => {
            try {
                const res = spaces.find((item) => item.spaceid === id);
                setOutput(null);
                setHeading(res?.heading);
                setSpaceid(res?.spaceid);
                setInput(res?.input);
                setLastInput(res?.lastinput);
                setVideos(res?.videos);
                setNotes(res?.notes);
                setVideoID(res?.videoID);
                setCodeShared(res?.shared);
                setEditorContent(res?.code);
                setExplanation(res?.explanation);
                setLanguage(res?.language.toLowerCase());
                setLastInput(res?.input);
                setData(res || null);
            }
            catch (error) {
                console.log(error);
                toast.error("Error loading space data");
            }
        };

        loadSpaceData();
    }, [id, spaces]);

    const container = document.getElementById("codespace");

    if (!data) {
        return <div className="w-full h-screen flex items-center justify-center">Loading or no space found...</div>;
    }

    return (
        <div id="codespace" className="w-full h-[90vh] px-2 md:px-4 md:pb-2 pt-2 bg-white flex gap-4">
            <div className={`${isCodeOpen ? "md:block hidden" : ""} ${videoID ? "md:w-1/2 w-full" : "md:w-full w-full"} space-y-4`}>
                <YouTubeFrame videoID={videoID} onSwap={onSwap} videos={videos} />
                {(explanation && videoID) && (
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <div className={`p-4 cursor-pointer hover:brightness-75 active:scale-[99%] transition-all bg-gray-100 ${isFullScreen ? 'h-[30vh]' : 'h-[25vh]'} overflow-y-auto rounded-lg border border-gray-300`}>
                                <div className="flex items-center mb-3 justify-between">
                                    <h3 className="text-lg font-semibold  text-black">{heading}</h3>
                                    <h3 className="text-sm px-2 pb-0.5 pt-1 uppercase rounded-md bg-black font-semibold  text-gray-100">{language}</h3>
                                </div>
                                <div className="jarvis no-tailwindcss" dangerouslySetInnerHTML={{ __html: converter.makeHtml(explanation) }} />
                            </div>
                        </Dialog.Trigger>
                        <Dialog.Portal container={container} >
                            <Dialog.Overlay className="fixed inset-0 bg-black/30 data-[state=open]:animate-overlayShow" />
                            <Dialog.Content className="fixed left-1/2 overflow-y-auto top-1/2 max-h-[85vh] w-[90vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
                                <div className="flex items-center justify-between">
                                    <div className="m-0 text-md font-bold md:text-xl text-center md:text-start mb-3 text-gray-800">
                                        {heading}
                                    </div>
                                    <button onClick={copyToClipboard}>
                                        {iscopied ? <BiSolidCopy className="text-gray-600 text-sm" /> : <BiCopy className="text-gray-700 text-sm" />}
                                    </button>
                                </div>
                                <hr className="mb-3 bg-gray-600" />
                                <div className="text-gray-600 jarvis no-tailwindcss text-sm md:text-base" dangerouslySetInnerHTML={{ __html: converter.makeHtml(explanation) }} />
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                )}
                <ChatInput input={input} setInput={setInput} handleChatSubmission={handleChatSubmission} isLoading={isLoading} videoID={videoID} />
            </div>
            <div className={`${isCodeOpen ? "" : "md:block hidden"} ${videoID ? "md:w-1/2 w-full " : "hidden"} h-full`}>
                <CodeEditor editorReference={editorReference} language={language} editorContent={editorContent} handleChange={handleChange} theme={theme} />
                <div className="flex justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCodeExecute}
                            disabled={isLoading || isOutputLoading}
                            className="flex md:text-base text-sm active:scale-95 transition-all items-center justify-center py-1 px-2.5 md:px-4 bg-black text-white font-medium rounded-lg hover:bg-black/85"
                        >
                            <FaPlay className="mr-2 md:text-base text-sm" /> Run Code
                        </button>
                        <button disabled={isGenerating} onClick={handleOptimizer} className="disabled:opacity-50 disabled:animate-bounce p-1 bg-black rounded-md active:scale-95 transition-all" >
                            <TbSettingsCode className="text-[1.2rem] md:text-[1.4rem] text-white" />
                            {/* <VscLightbulbSparkle className="text-xl text-black" /> */}
                        </button>
                        {/* <button className="ms-3" onClick={() => {
                            if (editorReference.current) {
                                editorReference.current.getAction('editor.action.formatDocument').run();
                                console.log("Formated")
                            }
                        }} >
                            <SiPrettier />
                        </button> */}
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => HandleFullScreen()}
                            className={`bg-gray-200 p-1.5 rounded-md active:scale-90 transition-all`} >
                            {isFullScreen ? <RiFullscreenExitLine className="text-base md:text-xl text-gray-700" /> : <RiFullscreenFill className="text-base md:text-xl text-gray-700" />}
                        </button>
                        <select
                            className="p-0.5 md:p-1 bg-gray-100 w-[100px] md:w-[150px] rounded-md border border-gray-300 focus:ring-0"
                            onChange={(e) => HandleTheme(e)}
                            value={theme}
                        >
                            <option value="vs-light">Light mode</option>
                            <option value="vs-dark">Dark mode</option>
                            {Object.entries(monacoThemes).map(([themeId, themeName]) => (
                                <option key={themeId} value={themeId}>{themeName}</option>))}
                        </select>
                        {/* <button className="active:scale-95 transition-all" disabled={isLoading} title="Share Code" onClick={async () => {
                            if (navigator.share) {
                                try {
                                    await navigator.share({
                                        text: editorContent,
                                    });
                                    console.log('Code shared successfully');
                                } catch (error) {
                                    console.error('Error sharing code:', error);
                                }
                            } else {
                                toast("Sharing is not supported on this browser.");
                            }
                        }}>
                            <MdIosShare className="text-2xl text-gray-500 cursor-pointer" />
                        </button> */}
                    </div>
                </div>
                <OutputDisplay
                    output={output}
                    isOutputLoading={isOutputLoading}
                    handleCopy={copyOutputToClipboard}
                    copied={copied}
                />
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
                    <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-enterFromLeft fixed top-0 left-0 w-[75%] max-w-[600px] bg-white focus:outline-none">
                        <div className="flex items-end p-4 justify-between">
                            <h1 className="text-2xl font-semibold text-black">Jarvis AI</h1>
                        </div>
                        <Chat />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <Dialog.Root open={isNotesOpen} >
                <Dialog.Portal container={container}>
                    <Dialog.Overlay onClick={() => { setIsNotesOpen(!isNotesOpen) }} className="bg-blackA6 z-[1000] data-[state=open]:right-0 right-[-50%] fixed inset-0" />
                    <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-enterFromRight fixed top-0 right-0 w-[75%] max-w-[600px] bg-white focus:outline-none">
                        <div className="flex items-end p-4 justify-between">
                            <h1 className="text-2xl font-semibold text-black">Space Notes</h1>
                            <button className="mb-[0.2rem]">
                                {cloudSync ? <IoCloudOfflineSharp title="data not synced with cloud" className="text-xl md:text-2xl text-yellow-600" /> : <IoMdCloudDone title="data synced with cloud" className="text-xl md:text-2xl text-green-600" />}
                            </button>
                        </div>
                        <Editor editorData={notes} setCloudSync={setCloudSync} />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div >
    );
}

export default LoadSpace;
