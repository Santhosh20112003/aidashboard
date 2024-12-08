import { useEffect, useState } from "react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { FaPlay } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "../../constants";
import { BiCopy, BiSolidCopy } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { VscLightbulbSparkle } from "react-icons/vsc";
import YouTubeFrame from "./parts/YouTubeFrame";
import CodeEditor from "./parts/CodeEditor";
import OutputDisplay from "./parts/OutputDisplay";
import ChatInput from "./parts/ChatInput";
import { useUserAuth } from "../context/UserAuthContext";
import { converter } from "../../common/config";
import { useData } from "../context/DataContext";



function App() {
  const { user } = useUserAuth();
  const {
    editorContent,
    input,
    setInput,
    videos,
    language,
    explanation,
    heading,
    theme,
    setTheme,
    isLoading,
    copied,
    iscopied,
    videoID,
    isOutputLoading,
    output,
    isGenerating,
    handleChange,
    handleChatSubmission,
    onSwap,
    handleCodeExecute,
    handleOptimizer,
    copyOutputToClipboard,
    copyToClipboard, } = useData();

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("dashboardData")) || {};
  //   if (Object.keys(storedData).length) {
  //     setVideos(storedData.videos || videos);
  //     setEditorContent(storedData.editorContent || editorContent);
  //     setHeading(storedData.heading || heading);
  //     setExplanation(storedData.explanation || explanation);
  //     setVideoID(storedData.videoID || videoID);
  //     setLanguage(storedData.language || language);
  //     setLastInput(storedData.lastInput || lastInput);
  //     setInput(storedData.lastInput || lastInput);
  //   }
  // }, []);


  return (
    <div className="w-full h-[90vh] px-4 pb-2 pt-2 bg-white flex space-x-4">
      <div className={`${videoID ? "md:w-1/2 w-full" : "md:w-full w-full"} space-y-4`}>
        <YouTubeFrame videoID={videoID} onSwap={onSwap} videos={videos} />
        {(explanation && videoID) && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <div className="p-4 cursor-pointer hover:brightness-75 active:scale-[99%] transition-all bg-gray-100 h-[25vh] overflow-y-auto rounded-lg border border-gray-300">
                <div className="flex items-center mb-3 justify-between">
                  <h3 className="text-lg font-semibold  text-black">{heading}</h3>
                  <h3 className="text-sm px-2 pb-0.5 pt-1 uppercase rounded-md bg-black font-semibold  text-gray-100">{language}</h3>
                </div>
                <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(explanation) }} />
              </div>
            </Dialog.Trigger>
            <Dialog.Portal>
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
                <div className="text-gray-600 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: converter.makeHtml(explanation) }} />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        )}
        <ChatInput input={input} setInput={setInput} handleChatSubmission={handleChatSubmission} isLoading={isLoading} videoID={videoID} />
      </div>
      <div className={`${videoID ? "w-1/2 md:block hidden" : "hidden"} h-full`}>
        <CodeEditor language={language} editorContent={editorContent} handleChange={handleChange} theme={theme} />
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-5">
            <button
              onClick={handleCodeExecute}
              disabled={isLoading || isOutputLoading}
              className="flex active:scale-95 transition-all items-center justify-center py-1 px-4 bg-black text-white font-medium rounded-lg hover:bg-black/85"
            >
              <FaPlay className="mr-2" /> Run Code
            </button>
            <button disabled={isGenerating} onClick={handleOptimizer} className="disabled:opacity-50 disabled:animate-bounce" >
              <VscLightbulbSparkle className="text-xl text-black" />
            </button>
          </div>
          <div className="flex items-center gap-5">
            <select
              className="p-1 bg-gray-100 rounded-md border border-gray-300 focus:ring-0"
              onChange={(e) => setTheme(e.target.value)}
              value={theme}
            >
              <option value="vs-light">Light mode</option>
              <option value="vs-dark">Dark mode</option>
            </select>
            <button className="active:scale-95 transition-all" disabled={isLoading} title="Share Code" onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    text: editorContent,
                  });
         
                } catch (error) {
                  console.error('Error sharing code:', error);
                }
              } else {
                toast("Sharing is not supported on this browser.");
              }
            }}>
              <MdIosShare className="text-2xl text-gray-500 cursor-pointer" />
            </button>
          </div>
        </div>
        <OutputDisplay
          output={output}
          isOutputLoading={isOutputLoading}
          handleCopy={copyOutputToClipboard}
          copied={copied}
        />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
