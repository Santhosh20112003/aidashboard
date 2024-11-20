import { BiCopy, BiSolidCopy } from "react-icons/bi";

const OutputDisplay = ({ output, isOutputLoading, handleCopy, copied }) => (
    <div className="bg-black/90 overflow-auto  h-[25vh] mt-3 rounded-lg">
        <div className="px-3 flex justify-between items-center pt-2 mb-2">
            <h1 className="text-lg font-medium text-gray-100">Output:</h1>
            {output && (
                <button onClick={handleCopy}>
                    {copied ? <BiSolidCopy className="text-gray-200 text-sm" /> : <BiCopy className="text-gray-200 text-sm" />}
                </button>
            )}
        </div>
        <hr />
        <p
            dangerouslySetInnerHTML={{
                __html: isOutputLoading ? "Loading output..." : output ?? 'Click "Run Code" to see the output here',
            }}
            className="text-lg p-3 text-gray-200"
        />
    </div>
);

export default OutputDisplay;