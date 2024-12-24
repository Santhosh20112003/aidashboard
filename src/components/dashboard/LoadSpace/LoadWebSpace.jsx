import React, { useEffect, useRef, useState } from 'react'
import ChatInput from '../webparts/ChatInput'
import CodePlayground from '../webparts/CodePlayground'
import Preview from '../webparts/Preview'
import { Link, useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext';
import { IoMdBookmarks, IoMdCloudDone } from "react-icons/io";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoCloudOfflineSharp, IoPlayForward } from "react-icons/io5";
import * as Dialog from "@radix-ui/react-dialog";
import "./load.css";
import Editor from "./code/Editor";
import Chat from "./code/Chat";
import * as Popover from "@radix-ui/react-popover";
import Joyride from 'react-joyride'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const steps = [
    {
        title: "Welcome to WebSpace!",
        spotlightPadding: 5,
        placement: 'center',
        target: 'body',
        content: "Get ready to build! This tour will show you WebSpace's key features. Click 'Next' to begin."
    },
    {
        target: '.editor-t',
        title: 'Web Editor',
        spotlightPadding: 5,
        placement: 'right',
        content: "Write and edit your HTML, CSS, and JavaScript code here.  This editor supports syntax highlighting and autocompletion."
    },
    {
        target: '.code-t',
        title: 'Code Editor Tabs',
        spotlightPadding: 5,
        content: "Easily switch between your HTML, CSS, and JavaScript code using these convenient tabs."
    },
    {
        target: '.mode-t',
        title: 'Customize Your Workspace',
        spotlightPadding: 5,
        placement: 'bottom',
        content: "Choose a UI mode to optimize your workflow. Select the layout that best suits your preferences."
    },
    {
        target: '.formatter-t',
        title: 'Code Formatter',
        spotlightPadding: 5,
        content: "Automatically format your code for readability and consistency."
    },
    {
        target: '.frameworks-t',
        title: 'Add Frameworks',
        spotlightPadding: 5,
        placement: 'top',
        content: "Easily add popular frameworks to your project without manual integration. Just select from the list."
    },
    {
        target: '.input-t',
        title: 'AI Prompt Input',
        spotlightPadding: 5,
        content: "Enter your web development prompt here. WebSpace AI will generate the code you need."
    },
    {
        target: '.data-t',
        title: 'Interactive Explanations & Headings',
        spotlightPadding: 5,
        content: "Find in-depth explanations and helpful headings here."
    },
    {
        target: '.button-t',
        title: 'Generate Code',
        spotlightPadding: 5,
        placement: 'left',
        content: "Click 'Generate' to submit your prompt and create documents."
    },
    {
        target: '.jarvis-t',
        title: 'AI Assistance (Jarvis)',
        spotlightPadding: 5,
        content: "Get coding help from Jarvis, your AI coding assistant. Ask a question!"
    },
    {
        target: '.notes-t',
        title: 'Add Notes',
        spotlightPadding: 5,
        content: "Take notes directly within your WebSpace."
    },
    {
        target: '.preview-t',
        title: 'Live Web Preview',
        spotlightPadding: 5,
        placement: 'left',
        content: "See a live preview of your webpage as you code."
    },
    {
        target: '.framework-t',
        title: 'Frameworks Added',
        spotlightPadding: 5,
        placement: 'bottom',
        content: "View the frameworks included in your webspace."
    },
    {
        target: '.refresh-t',
        title: 'Refresh Preview',
        spotlightPadding: 5,
        placement: 'top',
        content: "Refresh the web preview to see your latest changes."
    },
    {
        target: '.focusmode-t',
        title: 'Focus Mode',
        spotlightPadding: 5,
        placement: 'bottom',
        content: "Minimize distractions with fullscreen mode and a timer."
    },
    {
        target: '.share-t',
        title: 'Share Your Work',
        spotlightPadding: 5,
        placement: 'top',
        content: "Share your hosted web preview link via social media or other platforms."
    },
    {
        title: "Start Building!",
        spotlightPadding: 5,
        placement: 'center',
        target: 'body',
        content: "You're all set! Start building amazing websites with WebSpace!"
    }
];

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
        webspaceid,
        setType,
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
        setConversation,
        heading,
        explanation,
        isCodeOpen
    } = useData();
    const [tour, setTour] = useState(false);
    const [cloudSync, setCloudSync] = useState(false);
    const [data, setData] = useState(null);
    const [isAIOpen, setIsAIOpen] = useState(false);
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

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
                if (!sessionStorage.getItem("webspacetour")) {
                    setTour(true);
                    sessionStorage.setItem("webspacetour", true);
                }
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

    function Tooltip({
        backProps,
        continuous,
        index,
        isLastStep,
        primaryProps,
        skipProps,
        step,
        tooltipProps,
    }) {
        return (
            <div
                {...tooltipProps}
                className={`bg-white border-none ${(isLastStep || index == 0) ? 'w-[300px] md:w-[500px]' : 'max-w-[420px] min-w-[350px]'} overflow-hidden rounded-xl px-1 py-2`}
            >
                {index == 0 && <div className="px-4 py-2" >
                    <img src="https://ik.imagekit.io/vituepzjm/1_o0rSx2Gw0T8zFK0SwU9Yew.jpg?updatedAt=1734734174635" alt="banner" className="w-full grayscale h-52 object-cover rounded-lg" />
                </div>}
                <div className="px-4 pb-6">
                    {step.title && (
                        <h3 className="text-black font-semibold text-lg">{step.title}</h3>
                    )}
                    {step.content && <p className="text-gray-600" >{step.content}</p>}
                </div>

                <div className="bg-primary-100 py-2 px-4">
                    <div className={`${isLastStep ? 'justify-end' : 'justify-between'} flex `}>
                        {!isLastStep && (
                            <button {...skipProps} className="text-base py-1 px-2.5 rounded-md bg-black text-white">
                                <IoPlayForward />
                            </button>
                        )}
                        <div className={`flex gap-2`}>
                            {index > 0 && (
                                <button {...backProps} className="text-xl p-2 rounded-md text-white bg-black">
                                    <FaArrowLeft />
                                </button>
                            )}
                            <button {...primaryProps} className={`${isLastStep ? 'text-lg px-3 py-1' : 'text-xl p-2'}  rounded-md text-white bg-black`}>
                                {!isLastStep ? <FaArrowRight /> : 'close'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="webspace" className="w-full h-[90vh] md:px-4 md:pb-2 px-2 pt-2 bg-white flex gap-4">
            <div className={`${isCodeOpen ? "md:block hidden" : ""} md:w-1/2 w-full h-full space-y-4`}>
                <CodePlayground htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} framework={framework} />
                <ChatInput input={input} setInput={setInput} handleWebChatSubmission={() => { }} isLoading={isLoading} />
            </div>
            <div className={`${isCodeOpen ? "" : "md:block hidden"} md:w-1/2 w-full h-full `}>
                <Preview setTime={setTime} intervalRef={intervalRef} setIsRunning={setIsRunning} isRunning={isRunning} htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} framework={framework} />
                {/* <Console /> */}
            </div>

            <Joyride
                run={tour}
                continuous
                steps={steps}
                showSkipButton
                tooltipComponent={Tooltip}
                styles={{
                    options: {
                        zIndex: 2000000,
                    },
                    overlay: {
                        backgroundColor: '#21212150',
                    },
                }} />

            {isFullScreen && <h1 className="text-xl bg-black bg-opacity-70 text-white rounded-lg px-4 py-1 fixed top-5 left-1/2 -translate-x-1/2 font-bold">
                {String(time.minutes).padStart(2, '0')}:
                {String(time.seconds).padStart(2, '0')}
            </h1>}

            {isFullScreen && <button onClick={() => setIsAIOpen(true)} className="z-50 bg-black jarvis-t hidden md:block fixed top-24 right-0 text-white py-5 rounded-s-lg lg:active:pe-3 shadow transition-all cursor-pointer">
                <p className="-rotate-90">Jarvis</p>
            </button>}

            {isFullScreen && <button onClick={() => setIsNotesOpen(true)} className="z-50 notes-t bg-black hidden md:block fixed top-48 right-0 text-white py-5 rounded-s-lg lg:active:pe-3 shadow transition-all cursor-pointer">
                <p className="-rotate-90">Notes</p>
            </button>}

            {!isFullScreen && <div className="fixed top-0 left-1/2 h-[50px] hidden md:flex gap-5 -translate-x-1/2">
                <button onClick={() => setIsAIOpen(true)} className=" bg-black jarvis-t h-fit text-white px-5 py-1 rounded-b-lg lg:active:pt-3 shadow transition-all cursor-pointer">
                    <p className="">Jarvis AI</p>
                </button>

                <button onClick={() => setIsNotesOpen(true)} className=" bg-black notes-t h-fit text-white px-5 py-1 rounded-b-lg lg:active:pt-3 shadow transition-all cursor-pointer">
                    <p className="">Notes</p>
                </button>
            </div>}

            {!isFullScreen && <button onClick={() => setIsAIOpen(true)} className="z-50 jarvis-t bg-black md:hidden fixed top-36 right-0 text-white py-4 rounded-s-lg lg:active:pe-2 shadow transition-all cursor-pointer">
                <p className="-rotate-90 text-xs">Jarvis</p>
            </button>}

            {!isFullScreen && <button onClick={() => setIsNotesOpen(true)} className="z-50 notes-t bg-black md:hidden fixed top-36 left-0 text-white py-4 rounded-e-lg lg:active:ps-2 shadow transition-all cursor-pointer">
                <p className="rotate-90 text-xs">Notes</p>
            </button>}

            <Dialog.Root open={isAIOpen} >
                <Dialog.Portal container={container}>
                    <Dialog.Overlay onClick={() => { setIsAIOpen(!isAIOpen) }} className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0" />
                    <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-enterFromLeft data-[state=close]:animate-exitToLeft fixed top-0 left-0 w-full max-w-[600px] bg-white focus:outline-none">
                        <div className="flex items-end p-4 justify-between">
                            <Link to="https://aijarvis.vercel.app/v1" className="text-2xl ms-2 font-semibold text-black">Jarvis AI</Link>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setIsAIOpen(!isAIOpen)} className="p-2 md:hidden bg-gray-200 rounded-lg active:scale-90 transition-all">
                                    <GoArrowLeft />
                                </button>

                                <Popover.Root>
                                    <Popover.Trigger asChild>
                                        <button title="chat data" className="p-2 bg-gray-200 rounded-lg active:scale-90 transition-all">
                                            <IoMdBookmarks />
                                        </button>
                                    </Popover.Trigger>
                                    <Popover.Portal container={container}>
                                        <Popover.Content
                                            className="w-[300px] z-[100000] border rounded bg-white p-5 shadow-md mt-4 will-change-[transform,opacity] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade"
                                            side="left"
                                            sideOffset={8}
                                        >
                                            <div className="flex flex-col gap-2.5">
                                                <p className="mb-2.5 text-[15px] font-medium leading-[19px] text-mauve12">
                                                    Chat Memories
                                                </p>

                                                <h1 className="text-sm line-clamp-2 p-2 brightness-95 rounded-md bg-gray-200 text-black">{heading}</h1>
                                                <h1 className="text-sm line-clamp-3 p-2 brightness-95 rounded-md bg-gray-200 text-black">{explanation.slice(0, 100)}...</h1>

                                            </div>

                                            <Popover.Arrow className="fill-gray-200 ms-4" />
                                        </Popover.Content>
                                    </Popover.Portal>
                                </Popover.Root>
                            </div>
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
                        <Editor editorData={notes} setCloudSync={setCloudSync} Type={'web'} />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}

export default LoadWebSpace