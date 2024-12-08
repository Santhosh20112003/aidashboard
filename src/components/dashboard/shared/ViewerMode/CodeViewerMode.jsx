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

function CodeViewerSharedMode() {
  const { id } = useParams();
  const {
    setHeading,
    setVideoID,
    setEditorContent,
    setExplanation,
    setLanguage,
    explanation,
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
    setisOptimized
  } = useData();

  const [data, setData] = useState(null);
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
    <div id="codesharedspace" className="w-full h-[90vh] px-4 pb-2 pt-2 bg-white flex space-x-4">
      <div className={`${data.videoID ? "md:w-1/2" : "md:w-full"} w-full space-y-4`}>
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

      {data.videoID && (
        <div className="w-1/2 md:block hidden h-full">
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
      )}
      <Toaster position="top-center" />
    </div>
  );
}

export default CodeViewerSharedMode;
