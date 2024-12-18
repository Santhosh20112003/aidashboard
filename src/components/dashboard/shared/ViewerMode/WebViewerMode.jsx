import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import CodePlayground from './parts/CodePlayground';
import { IoMdBookmarks } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import Chat from './code/Chat';
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import Preview from './parts/Preview';

function WebViewerMode() {
  const { id } = useParams();
  const { setExplanation, setHeading, explanation, heading, setConversation, isFullScreen, isCodeOpen, sharedwebSpace, reloadShared, setReloadShared } = useData();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [framework, setFramework] = useState("css");
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setConversation([]);
  }, []);

  const container = document.getElementById("sharedwebspace");

  useEffect(() => {
    const loadSpaceData = () => {
      try {
        const res = sharedwebSpace.find((item) => item.spaceid === id);
        if (!res?.isEditorMode) {
          console.log(res)
          setHtml(res.htmlCode);
          setCss(res.cssCode);
          setJs(res.jsCode);
          setFramework(res.frameworks);
          setExplanation(res?.explanation);
          setHeading(res?.heading);
          setData(res);
        }
        else {
          setReloadShared(!reloadShared);
          loadSpaceData();
          setData(null);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadSpaceData();
  }, [id, sharedwebSpace]);

  if (!data) {
    return <div className="w-full h-screen flex items-center justify-center">Loading or no space found...</div>;
  }

  return (
    <div id="sharedwebspace" className="w-full h-[90vh] px-4 pb-2 pt-2 bg-white flex gap-4">
      <div className={`${isCodeOpen ? "md:block hidden" : ""} md:w-1/2 w-full h-full space-y-4`}>
        <CodePlayground html={html} css={css} js={js} setHtml={setHtml} setCss={setCss} setJs={setJs} framework={framework} setFramework={setFramework} />
      </div>
      <div className={`${isCodeOpen ? "" : "md:block hidden"} md:w-1/2 w-full h-full`}>
        <Preview html={html} css={css} js={js} framework={framework} />
      </div>
      {!isFullScreen && <div className="fixed top-0 left-1/2 h-[50px] hidden md:flex gap-5 -translate-x-1/2">
        <button onClick={() => setIsAIOpen(true)} className=" bg-black h-fit text-white px-5 py-1 rounded-b-lg lg:active:pt-3 shadow transition-all cursor-pointer">
          <p className="">Jarvis AI</p>
        </button>
      </div>}

      {isFullScreen && <div className="fixed top-0 right-[15%] h-[50px] hidden md:flex gap-5 -translate-x-[15%]">
        <button onClick={() => setIsAIOpen(true)} className=" bg-black h-fit text-white px-5 py-1 rounded-b-lg lg:active:pt-3 shadow transition-all cursor-pointer">
          <p className="">Jarvis AI</p>
        </button>
      </div>}

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
  )
}

export default WebViewerMode