import React from 'react'
import { BsStars } from 'react-icons/bs'
import { FaGear } from 'react-icons/fa6'
import * as Dialog from "@radix-ui/react-dialog";
import { useData } from '../../context/DataContext';
import { TbDatabaseEdit } from "react-icons/tb";
import { converter } from "../../../common/config";
import { BiSolidCopy, BiCopy } from "react-icons/bi";

function ChatInput({ input, setInput, isLoading }) {
    const { isFullScreen, handleWebChatSubmission, heading, explanation, iscopied, copyToClipboard } = useData();
    const container = document.getElementById("webspace");
    return (
        <div>
            <div className="w-full max-h-[50px] flex gap-3 items-center">
                <textarea value={input} disabled={isLoading} onChange={(e) => setInput(e.target.value)} className={`w-full max-h-[50px] h-[8vh] px-4 py-2  border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black`} placeholder="Type your prompt here..." />
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button
                            className={`py-3.5 px-3.5 active:scale-[99%] transition-all flex items-center justify-center gap-2 bg-black text-white font-semibold rounded-lg hover:bg-black`}
                            disabled={isLoading}
                        >
                            <TbDatabaseEdit className='text-xl' />
                        </button>
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
            </div>
            <div className="flex gap-3 mt-2 max-h-[10vh] items-center">
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button
                            className={`w-full ${isFullScreen ? 'py-4' : 'py-3'} active:scale-[99%] transition-all flex items-center justify-center gap-2 bg-black text-white font-semibold rounded-lg hover:bg-black`}
                            disabled={isLoading}
                        >
                            <BsStars /> Generate Contents
                        </button>
                    </Dialog.Trigger>
                    <Dialog.Portal container={container}>
                        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
                        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-6 left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%]  z-50 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                                Are you absolutely sure?
                            </Dialog.Title>
                            <Dialog.Description className="text-gray-600 mt-4 mb-5 text-[15px] leading-normal">
                                Are you sure you want to regenerate the content? This will erase the created data and replace it with new content.
                            </Dialog.Description>
                            <div className="flex justify-end gap-[25px]">
                                <Dialog.Close asChild>
                                    <button className="text-black bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                                        Cancel
                                    </button>
                                </Dialog.Close>
                                <Dialog.Close asChild>
                                    <button
                                        onClick={handleWebChatSubmission}
                                        className=" bg-black text-white inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                                    >
                                        Yes, Generate
                                    </button>
                                </Dialog.Close>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
                {isLoading && <FaGear className="text-3xl animate-spin text-black" />}
            </div>
        </div>
    )
}

export default ChatInput