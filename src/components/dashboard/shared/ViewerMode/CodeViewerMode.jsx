import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import toast, { Toaster } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { BiSolidCopy, BiCopy } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { TbSettingsCode } from "react-icons/tb";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";
import { converter } from "../../../../common/config";
import { monacoThemes } from "../../../../constants";
import "./css/chat.css";
import "./css/load.css";
import YouTubeFrame from "./parts/YouTubeFrame";
import CodeEditor from "./parts/CodeEditor";
import OutputDisplay from "./parts/OutputDisplay";
import { IoMdBookmarks } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import Chat from './code/Chat';
import * as Popover from "@radix-ui/react-popover";

function CodeViewerSharedMode() {
  const { id } = useParams();
  const {
    setHeading,
    setVideoID,
    setEditorContent,
    setExplanation,
    setLanguage,
    explanation,
    heading,
    language,
    editorContent,
    output,
    isLoading,
    iscopied,
    theme,
    HandleTheme,
    copied,
    copyToClipboard,
    handleCodeExecute,
    handleOptimizer,
    copyOutputToClipboard,
    isOutputLoading,
    isGenerating,
    isFullScreen,
    setIsFullscreen,
    sharedcodeSpace,
    reloadShared,
    setReloadShared,
    setisOptimized,
    isCodeOpen,
    videoID
  } = useData();

  const [data, setData] = useState(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const editorReference = useRef(null);

  const handleFullScreenToggle = () => {
    const codespaceElement = document.getElementById("codesharedspace");
    if (codespaceElement) {
      if (!document.fullscreenElement) {
        codespaceElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
      } else {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(console.error);
      }
    }
  };

  const handleChange = (value, event) => {
    setisOptimized(false);
    setEditorContent(value);
  };
  const container = document.getElementById("codesharedspace");

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [setIsFullscreen]);

  useEffect(() => {
    const fetchSpaceData = () => {
      try {
        const res = sharedcodeSpace.find((item) => item.spaceid === id);
        if (res && !res.isEditorMode) {
          setHeading(res.heading);
          setVideoID(res.videoID);
          setEditorContent(res.code);
          setExplanation(res.explanation);
          setLanguage(res.language);
          setData(res);
        } else {
          setReloadShared(!reloadShared);
        }
      } catch (error) {
        console.error("Error fetching shared space data:", error);
      }
    };
    fetchSpaceData();
  }, [id, sharedcodeSpace, reloadShared, setHeading, setVideoID, setEditorContent, setExplanation, setLanguage]);

  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading or no space found...
      </div>
    );
  }

  return (
    <div id="codesharedspace" className="w-full h-[90vh] px-4 pb-2 pt-2 bg-white flex md:gap-4">
      <div className={`${isCodeOpen ? "md:block hidden" : ""} ${videoID ? "md:w-1/2 w-full" : "md:w-full w-full"} space-y-4`}>
        <YouTubeFrame videoID={data.videoID} />
        {data.explanation && data.videoID && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <div className={`p-4 cursor-pointer hover:brightness-75 active:scale-[99%] transition-all bg-gray-100 ${isFullScreen ? "h-[50vh]" : "h-[42vh]"} overflow-y-auto rounded-lg border border-gray-300`}>
                <div className="flex items-center mb-3 justify-between">
                  <h3 className="text-lg font-semibold text-black">{data.heading}</h3>
                  <h3 className="text-sm px-2 pb-0.5 pt-1 uppercase rounded-md bg-black font-semibold text-gray-100">{data.language}</h3>
                </div>
                <div className="jarvis no-tailwindcss" dangerouslySetInnerHTML={{ __html: converter.makeHtml(data.explanation) }} />
              </div>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/30" />
              <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="m-0 text-md font-bold text-gray-800">{data.heading}</h3>
                  <button onClick={copyToClipboard}>
                    {iscopied ? <BiSolidCopy className="text-gray-600 text-sm" /> : <BiCopy className="text-gray-700 text-sm" />}
                  </button>
                </div>
                <hr className="mb-3 bg-gray-600" />
                <div className="text-gray-600 jarvis no-tailwindcss text-sm" dangerouslySetInnerHTML={{ __html: converter.makeHtml(data.explanation) }} />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </div>
      <div className={`${isCodeOpen ? "" : "md:block hidden"} ${videoID ? "md:w-1/2 w-full " : "hidden"} h-full`}>
        <CodeEditor
          editorReference={editorReference}
          language={language}
          editorContent={editorContent}
          handleChange={handleChange}
          theme={theme}
        />
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCodeExecute}
              disabled={isLoading || isOutputLoading}
              className="flex items-center justify-center py-1 px-4 bg-black text-white font-medium rounded-lg hover:bg-black/85 active:scale-95"
            >
              <FaPlay className="mr-2" /> Run Code
            </button>
            <button
              onClick={handleOptimizer}
              disabled={isGenerating}
              className="p-1 bg-black rounded-md disabled:opacity-50 disabled:animate-bounce active:scale-95"
            >
              <TbSettingsCode className="text-[1.4rem] text-white" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleFullScreenToggle}
              className="bg-gray-200 p-1.5 rounded-md active:scale-90"
            >
              {isFullScreen ? <RiFullscreenExitLine className="text-xl text-gray-700" /> : <RiFullscreenFill className="text-xl text-gray-700" />}
            </button>
            <select
              onChange={(e) => HandleTheme(e)}
              value={theme}
              className="p-1 bg-gray-100 w-[150px] rounded-md border border-gray-300"
            >
              <option value="vs-light">Light mode</option>
              <option value="vs-dark">Dark mode</option>
              {Object.entries(monacoThemes).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <OutputDisplay output={output} isOutputLoading={isOutputLoading} handleCopy={copyOutputToClipboard} copied={copied} />
      </div>

      {!isFullScreen && <div className="fixed top-0 left-1/2 h-[50px] hidden md:flex gap-5 -translate-x-1/2">
        <button onClick={() => setIsAIOpen(true)} className=" bg-black h-fit text-white px-5 py-1 rounded-b-lg lg:active:pt-3 shadow transition-all cursor-pointer">
          <p className="">Jarvis AI</p>
        </button>
      </div>}

      {isFullScreen && <button onClick={() => setIsAIOpen(true)} className="z-50 bg-black  fixed top-24 right-0 text-white py-5 rounded-s-lg lg:active:pe-3 shadow transition-all cursor-pointer">
        <p className="-rotate-90">Jarvis</p>
      </button>}

      {!isFullScreen && <button onClick={() => setIsAIOpen(true)} className="z-50 bg-black md:hidden fixed top-36 right-0 text-white py-4 rounded-s-lg lg:active:pe-2 shadow transition-all cursor-pointer">
        <p className="-rotate-90 text-xs">Jarvis</p>
      </button>}

      <Dialog.Root open={isAIOpen} >
        <Dialog.Portal container={container}>
          <Dialog.Overlay onClick={() => { setIsAIOpen(!isAIOpen) }} className="bg-blackA6 z-[1000] data-[state=open]:left-0 left-[-50%] fixed inset-0" />
          <Dialog.Content className="z-[10000] h-screen data-[state=open]:animate-enterFromLeft data-[state=close]:animate-exitToLeft fixed top-0 left-0 w-full max-w-[600px] bg-white focus:outline-none">
            <div className="flex items-end p-4 justify-between">
              <h1 className="text-2xl ms-2 font-semibold text-black">Jarvis AI</h1>
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
    </div>
  );
}

export default CodeViewerSharedMode;
