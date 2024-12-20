import { BsStars } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import * as Dialog from "@radix-ui/react-dialog";
import { useData } from "../../context/DataContext";

const ChatInput = ({ input, setInput, handleChatSubmission, isLoading, videoID }) => {
    const { isFullScreen } = useData();
    const container = document.getElementById("codespace");
    return (
        <div>
            <textarea
                className={`input-t w-full ${isLoading ? "opacity-50" : ""} ${isFullScreen ? " max-h-[120px] h-[10vh]" : " max-h-[50px] h-[8vh]"} px-4 py-2  border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black`}
                placeholder="Type your prompt here..."
                value={input}
                disabled={isLoading}
                onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex gap-3 mt-2 max-h-[10vh] items-center">
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button
                            className={`w-full button-t ${isFullScreen ? 'py-4' : 'py-3'} active:scale-[99%] transition-all flex items-center justify-center gap-2 bg-black text-white font-semibold rounded-lg hover:bg-black`}
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
                                        onClick={handleChatSubmission}
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

};

export default ChatInput;