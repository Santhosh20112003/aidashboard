import { BsStars } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";

const ChatInput = ({ input, setInput, handleChatSubmission, isLoading, videoID }) => (
    <div>
        <textarea
            className={`w-full ${isLoading ? "opacity-50" : ""} ${videoID ? " max-h-[50px] h-[8vh]" : "h-[82vh]"} px-4 py-2  border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black`}
            placeholder="Type your prompt here..."
            value={input}
            disabled={isLoading}
            onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex gap-3 mt-2 max-h-[10vh] items-center">
            <button
                onClick={handleChatSubmission}
                className="w-full py-3 active:scale-[99%] transition-all flex items-center justify-center gap-2 bg-black text-white font-semibold rounded-lg hover:bg-black"
                disabled={isLoading}
            >
                <BsStars /> Generate Contents
            </button>
            {isLoading && <FaGear className="text-3xl animate-spin text-black" />}
        </div>


    </div>
);

export default ChatInput;