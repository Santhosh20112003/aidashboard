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
import { IoMdBookmarks, IoMdCloudDone } from "react-icons/io";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoCloudOfflineSharp, IoPlayForward } from "react-icons/io5";
import "./load.css";
import * as Popover from "@radix-ui/react-popover";
import Editor from "./code/Editor";
import Chat from "./code/Chat";
import Joyride from 'react-joyride';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const steps = [
    {
        title: "Welcome to CodeSpace!",
        spotlightPadding: 5,
        placement: 'center',
        target: 'body',
        content: "Get ready to build! This tour will show you CodeSpace's key features. Click 'Next' to begin."
    },
    {
        target: '.video-t',
        title: 'Integrated Video Tutorials',
        spotlightPadding: 5,
        placement: 'right',
        content: "Learn the ropes with our built-in video tutorials. Watch quick guides to get started quickly."
    },
    {
        target: '.swap-t',
        title: 'YouTube Video Swapping',
        spotlightPadding: 5,
        content: "Swap YouTube videos upto 5 videos to personalize your learning."
    },
    {
        target: '.explanation-t',
        title: 'Interactive Explanations',
        spotlightPadding: 5,
        placement: 'right',
        content: "Find in-depth explanations here. Check out the helpful menu above!"
    },
    {
        target: '.input-t',
        title: 'AI Prompt Input',
        spotlightPadding: 5,
        content: "Enter your coding prompt here. CodeSpace will help generate the code you need."
    },
    {
        target: '.button-t',
        title: 'Generate Button',
        spotlightPadding: 5,
        placement: 'top',
        content: "Click 'Generate' to submit your prompt to the AI and generate content."
    },
    {
        target: '.jarvis-t',
        title: 'AI Assistance (Jarvis)',
        spotlightPadding: 5,
        content: "Get coding help from Jarvis, our AI assistant. Try asking a question!"
    },
    {
        target: '.notes-t',
        title: 'Add Notes',
        spotlightPadding: 5,
        content: "Take notes directly within your CodeSpace."
    },
    {
        target: '.editor-t',
        title: 'Code Editor',
        spotlightPadding: 5,
        placement: 'left',
        content: "Write and edit your code here. This editor supports syntax highlighting, autocompletion, and more."
    },
    {
        target: '.run-t',
        title: 'Run Your Code',
        spotlightPadding: 5,
        placement: 'top',
        content: "Execute your code with a single click!"
    },
    {
        target: '.optimizer-t',
        title: 'Code Optimization Tool',
        spotlightPadding: 5,
        placement: 'bottom',
        content: "Improve your code's performance. Use our built-in tools to optimize your code."
    },
    {
        target: '.focusmode-t',
        title: 'Focus Mode',
        spotlightPadding: 5,
        placement: 'top',
        content: "Enhance your concentration with Focus Mode. Minimize distractions by going fullscreen and setting a timer."
    },
    {
        target: '.mode-t',
        title: 'Editor UI Modes',
        spotlightPadding: 5,
        placement: 'bottom',
        content: "Choose from different UI modes to optimize your coding workflow. Select the layout that best suits your preferences."
    },
    {
        target: '.output-t',
        title: 'Output & Error Reporting',
        spotlightPadding: 5,
        placement: 'top',
        content: "This area displays your code's output and any errors. Check here for debugging information."
    },
    {
        title: "Start Building!",
        spotlightPadding: 5,
        placement: 'center',
        target: 'body',
        content: "You're all set! Start learning amazing things with CodeSpace!"
    }
];

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
        notes,
        setConversation
    } = useData();
    const [tour, setTour] = useState(false);
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const [cloudSync, setCloudSync] = useState(false);
    const editorReference = useRef(null);
    const [data, setData] = useState(null);
    const [isAIOpen, setIsAIOpen] = useState(false);
    const [isNotesOpen, setIsNotesOpen] = useState(false);

    useEffect(() => {
        setConversation([]);
    }, []);

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

                if (isFullscreen) {
                    setIsRunning(true);
                } else {
                    setIsRunning(false);
                    clearInterval(intervalRef.current);
                    // setTime({ minutes: 0, seconds: 0 }); 
                }
            } catch (err) {
                console.error("Error handling fullscreen change", err);
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, [setIsFullscreen]);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    let { minutes, seconds } = prevTime;
                    seconds += 1;
                    if (seconds === 60) {
                        minutes += 1;
                        seconds = 0;
                    }
                    return { minutes, seconds };
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

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
                if (!sessionStorage.getItem("codespacetour")) {
                    setTour(true);
                    sessionStorage.setItem("codespacetour", true);
                }
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
                    <img src="https://ik.imagekit.io/vituepzjm/seamless-pattern-with-programming-developers-internet-coding_341076-313.jpg_w=740?updatedAt=1734730179199" alt="banner" className="w-full h-52 object-cover rounded-lg" />
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
        <div id="codespace" className="w-full h-[90vh] px-2 md:px-4 md:pb-2 pt-2 bg-white flex gap-4">
            <div className={`${isCodeOpen ? "md:block hidden" : ""} ${videoID ? "md:w-1/2 w-full" : "md:w-full w-full"} space-y-4 my-first-step`}>
                <YouTubeFrame videoID={videoID} onSwap={onSwap} videos={videos} />
                {(explanation && videoID) && (
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <div className={`p-4 explanation-t cursor-pointer hover:brightness-75 active:scale-[99%] transition-all bg-gray-100 ${isFullScreen ? 'h-[30vh]' : 'h-[25vh]'} overflow-y-auto rounded-lg border border-gray-300`}>
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
                                    <button className="copy-t" onClick={copyToClipboard}>
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
            <div className={`${isCodeOpen ? "" : "md:block hidden"} ${videoID ? "md:w-1/2 w-full " : "hidden"} h-full my-other-step`}>
                <CodeEditor editorReference={editorReference} language={language} editorContent={editorContent} handleChange={handleChange} theme={theme} />
                <div className="flex justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCodeExecute}
                            disabled={isLoading || isOutputLoading}
                            className="flex run-t md:text-base text-sm active:scale-95 transition-all items-center justify-center py-1 px-2.5 md:px-4 bg-black text-white font-medium rounded-lg hover:bg-black/85"
                        >
                            <FaPlay className="mr-2 md:text-base text-sm" /> Run Code
                        </button>
                        <button disabled={isGenerating} onClick={handleOptimizer} className=" optimizer-t disabled:opacity-50 disabled:animate-bounce p-1 bg-black rounded-md active:scale-95 transition-all" >
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
                            className={`bg-gray-200 p-1.5 rounded-md focusmode-t active:scale-90 transition-all`} >
                            {isFullScreen ? <RiFullscreenExitLine className="text-base md:text-xl text-gray-700" /> : <RiFullscreenFill className="text-base md:text-xl text-gray-700" />}
                        </button>
                        <select
                            className="p-0.5 md:p-1 bg-gray-100 w-[100px] mode-t md:w-[150px] rounded-md border border-gray-300 focus:ring-0"
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

            {isFullScreen && <button onClick={() => setIsAIOpen(true)} className="z-50 jarvis-t bg-black hidden md:block fixed top-24 right-0 text-white py-5 rounded-s-lg lg:active:pe-3 shadow transition-all cursor-pointer">
                <p className="-rotate-90">Jarvis</p>
            </button>}

            {isFullScreen && <button onClick={() => setIsNotesOpen(true)} className="z-50 notes-t bg-black hidden md:block fixed top-48 right-0 text-white py-5 rounded-s-lg lg:active:pe-3 shadow transition-all cursor-pointer">
                <p className="-rotate-90">Notes</p>
            </button>}

            {!isFullScreen && <div className="fixed top-0 left-1/2 h-[50px] hidden md:flex gap-5 -translate-x-1/2">
                <button onClick={() => setIsAIOpen(true)} className="jarvis-t bg-black h-fit text-white px-5 py-1 rounded-b-lg lg:active:pt-3 shadow transition-all cursor-pointer">
                    <p className="">Jarvis AI</p>
                </button>

                <button onClick={() => setIsNotesOpen(true)} className="notes-t bg-black h-fit text-white px-5 py-1 rounded-b-lg lg:active:pt-3 shadow transition-all cursor-pointer">
                    <p className="">Notes</p>
                </button>
            </div>}

            {!isFullScreen && <button onClick={() => setIsAIOpen(true)} className="jarvis-t z-50 bg-black md:hidden fixed top-36 right-0 text-white py-4 rounded-s-lg lg:active:pe-2 shadow transition-all cursor-pointer">
                <p className="-rotate-90 text-xs">Jarvis</p>
            </button>}

            {!isFullScreen && <button onClick={() => setIsNotesOpen(true)} className="notes-t z-50 bg-black md:hidden fixed top-36 left-0 text-white py-4 rounded-e-lg lg:active:ps-2 shadow transition-all cursor-pointer">
                <p className="rotate-90 text-xs">Notes</p>
            </button>}


            {/* <AlertDialog.Root open={isTourDropdown} >
                <AlertDialog.Portal>
                    <AlertDialog.Overlay onClick={() => setIsTourDropDown(false)} className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <AlertDialog.Title className="text-red-600 font-semibold m-0 text-xl">
                            Are you absolutely sure?
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-gray-600 mt-3 mb-5 text-[15px] leading-normal">
                            This action cannot be undone. This will move <span className="text-gray-700 font-semibold capitalize" >{language} CodeSpace</span> on <span className="text-gray-700 font-semibold" >{heading}</span> to Trash page you can restore at anytime.
                        </AlertDialog.Description>
                        <div className="flex justify-start gap-[25px]">
                            <AlertDialog.Action asChild>
                                <button
                                    onClick={() => {
                                        setTour(true);
                                        setIsTourDropDown(false);
                                    }}
                                    className="bg-red-500 text-white hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                                >
                                    Move to Trash
                                </button>
                            </AlertDialog.Action>
                            <AlertDialog.Cancel asChild>
                                <button onClick={() => setIsTourDropDown(false)} className="bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                    Cancel
                                </button>
                            </AlertDialog.Cancel>
                        </div>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root> */}

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
                        <Editor editorData={notes} setCloudSync={setCloudSync} Type={'code'} />
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div >
    );
}

export default LoadSpace;
