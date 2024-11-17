import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import showdown from "showdown";
import { FaPlay, FaGear } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";
import { BiCopy, BiSolidCopy } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";

const converter = new showdown.Converter();
const genAI = new GoogleGenerativeAI("AIzaSyCVYbRztmqUamxjghxQYoqXTmwGnRD4Z7Q");

const generationConfig = {
  temperature: 1.4,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    properties: {
      language: { type: "string" },
      code: { type: "string" },
      explanation: { type: "string" },
      heading: { type: "string" },
    },
    required: ["language", "code", "explanation", "heading"],
  },
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

const YouTubeFrame = ({ videoID }) => (
  videoID && (
    <iframe
      className="w-full min-h-[300px] h-[35vh] mb-2 rounded-md shadow-lg"
      src={`https://www.youtube.com/embed/${videoID}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
);

const ChatInput = ({ input, setInput, handleChatSubmission, isLoading, videoID }) => (
  <div>
    <textarea
      className={`w-full ${isLoading ? "opacity-50" : ""} ${videoID ? "h-12" : "h-[82vh]"} px-4 py-2  border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black`}
      placeholder="Type your prompt here..."
      value={input}
      disabled={isLoading}
      onChange={(e) => setInput(e.target.value)}
    />
    <div className="flex gap-3 mt-2 items-center">
      <button
        onClick={handleChatSubmission}
        className="w-full py-3 active:scale-95 transition-all flex items-center justify-center gap-2 bg-black text-white font-semibold rounded-lg hover:bg-black"
        disabled={isLoading}
      >
        <BsStars /> Generate Contents
      </button>
      {isLoading && <FaGear className="text-3xl animate-spin text-black" />}
    </div>


  </div>
);

const CodeEditor = ({ language, editorContent, handleChange, theme }) => (
  <Editor
    height="61%"
    language={language}
    value={editorContent}
    options={{ minimap: { enabled: true }, fontSize: 18, lineHeight: 1.6 }}
    theme={theme}
    onChange={handleChange}
  />
);

const OutputDisplay = ({ output, isOutputLoading, handleCopy, copied }) => (
  <div className="bg-black/90 overflow-auto max-h-[300px] h-[30%] mt-3 rounded-lg">
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

function App() {
  const [editorContent, setEditorContent] = useState("// some comment");
  const [input, setInput] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [explanation, setExplanation] = useState("");
  const [heading, setHeading] = useState("");
  const [theme, setTheme] = useState("vs-light");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iscopied, setisCopied] = useState(false);
  const [videoID, setVideoID] = useState("");
  const [isOutputLoading, setIsOutputLoading] = useState(false);
  const [output, setOutput] = useState(null);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dashboardData")) || {};
    console.log(storedData)
    if (Object.keys(storedData).length) {
      setEditorContent(storedData.editorContent || editorContent);
      setHeading(storedData.heading || heading);
      setExplanation(storedData.explanation || explanation);
      setVideoID(storedData.videoID || videoID);
      setLanguage(storedData.language || language);
      setLastInput(storedData.lastInput || lastInput);
      setInput(storedData.lastInput || lastInput);
    }
  }, []);

  const handleChange = (value, event) => {
    console.log(event)
    setEditorContent(value);
    localStorage.setItem(
      "dashboardData",
      JSON.stringify({
        videoID: videoID,
        heading: heading,
        explanation: explanation,
        editorContent: editorContent,
        language: language,
        lastInput: input,
      })
    );
  }

  const searchYouTube = (head) =>
    new Promise((resolve, reject) => {
      if (!head) return reject(new Error("head is required"));

      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(head)}&type=video&key=AIzaSyBTzFaLovTRNftZ5peD4AkZe_q4vRpBk8w`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          setVideoID(data.items[0].id.videoId);
          resolve(data.items[0].id.videoId);
        })
        .catch(reject);
    });

  const handleChatSubmission = async () => {
    if (!input || input === lastInput) return;

    const shouldRegenerate = videoID
      ? window.confirm(
        "Are you sure you want to regenerate the content? This will erase the created data and replace it with new content."
      )
      : true;

    if (!shouldRegenerate) return;

    setIsLoading(true);

    try {
      const chatSession = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `Create a JSON object designed for the Monaco Editor interface with the following structure:
            Code: Include a fully functioning script that solves the problem of [problem_description] without requiring user input.
            Language: Specify the language used for the script. It must match one of these options:
              {
                javascript: "18.15.0", typescript: "5.0.3", python: "3.10.0", java: "15.0.2",
                csharp: "6.12.0", php: "8.2.3", cplusplus: "0.52.0", c: "10.2.0",
                sql: "3.36.0", cpp: "10.2.0", go: "1.16.2", fortran: "10.2.0",
                groovy: "3.0.7", kotlin: "1.8.20", perl: "5.36.0", pascal: "3.2.2",
                rscript: "4.1.1", ruby: "3.0.1", rust: "1.68.2", scala: "3.2.2",
                swift: "5.3.3", typescript: "typescript", cobol: "3.1.2", dart: "2.19.6"
              }.
            Explanation: Provide a detailed explanation of how the code works.
            Heading: Include a descriptive title summarizing the purpose of the code.
            Ensure the code is simple, modular, and adheres to best practices for readability.`,
      }).startChat({
        generationConfig,
        safetySettings,
        history: [
          { role: "user", parts: [{ text: lastInput }] },
          { role: "model", parts: [{ text: editorContent }] },
        ],
      });

      const result = await chatSession.sendMessage(input);
      const responseData = JSON.parse(await result.response.text());

      const ID = await searchYouTube(responseData.heading);
      setHeading(responseData.heading);
      setEditorContent(responseData.code);
      setExplanation(responseData.explanation);
      setLanguage(responseData.language.toLowerCase());
      setLastInput(input);
      setOutput(null);

      localStorage.setItem(
        "dashboardData",
        JSON.stringify({
          videoID: ID,
          heading: responseData.heading,
          explanation: responseData.explanation,
          editorContent: responseData.code,
          language: responseData.language.toLowerCase(),
          lastInput: input,
        })
      );

      toast.success("Content generated successfully!");

    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(
        "An error occurred while generating the content. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };



  const handleCodeExecute = async () => {
    setIsOutputLoading(true);

    try {
      const payload = {
        language,
        version: LANGUAGE_VERSIONS[language],
        files: [{ content: editorContent }],
      };

      const response = await axios.post("https://emkc.org/api/v2/piston/execute", payload);
      console.log(response)
      const { stdout = "No output", stderr } = response.data.run || {};

      if (stdout.trim() === "No output" && !stderr) {
        toast.info("This code doesn't produce any visible output!");
        setOutput("No output.");
      } else if (stderr) {
        toast.error("Error during code execution.");
        setOutput(`<strong>Error:</strong><br/>${stderr.replace(/\n/g, "<br/>").replace(/\t/g, "&nbsp;")}`);
      } else {
        toast.success("Code Executed succesfully");
        setOutput(stdout.replace(/\n/g, "<br/>").replace(/\t/g, "&nbsp;"));
      }
    } catch (error) {
      console.error("Error executing code:", error);
      toast.error("Failed to execute code. Please try again later.");
      setOutput("Execution error.");
    } finally {
      setIsOutputLoading(false);
    }
  };


  const copyOutputToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(output.replace(/<br\/>/g, "\n").replace(/&nbsp;/g, "\t"))
        .then(() => {
          toast.success("Output Copied")
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        })
        .catch(console.error);
    }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(explanation)
        .then(() => {
          toast.success("Code Explanation Copied")
          setisCopied(true);
          setTimeout(() => setisCopied(false), 3000);
        })
        .catch(console.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full h-[5vh] p-4 bg-white flex space-x-4">

      </div>
      <div className="w-full h-[95vh] p-4 bg-white flex space-x-4">
        <div className={`${videoID ? "md:w-1/2 w-full" : "md:w-full w-full"} space-y-4`}>
          <YouTubeFrame videoID={videoID} />
          {(explanation && videoID) && (
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <div className="p-4 cursor-pointer hover:brightness-75 active:scale-[98%] transition-all bg-gray-100 max-h-[190px] h-[30vh] overflow-y-auto rounded-lg border border-gray-300">
                  <div className="flex items-center mb-3 justify-between">
                    <h3 className="text-lg font-semibold  text-black">{heading}</h3>
                    <h3 className="text-sm px-2 pb-1 pt-0.5 uppercase rounded-md bg-black font-semibold  text-gray-100">{language}</h3>
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
                      {iscopied ? <BiSolidCopy className="text-gray-200 text-sm" /> : <BiCopy className="text-gray-200 text-sm" />}
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
        <div className={`${videoID ? "w-1/2 md:block hidden" : "hidden"}  h-full`}>
          <CodeEditor language={language} editorContent={editorContent} handleChange={handleChange} theme={theme} />
          <div className="flex justify-between mt-4">
            <button
              onClick={handleCodeExecute}
              disabled={isLoading || isOutputLoading}
              className="flex active:scale-95 transition-all items-center justify-center py-1 px-4 bg-black text-white font-medium rounded-lg hover:bg-black/85"
            >
              <FaPlay className="mr-2" /> Run Code
            </button>
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
                    console.log('Code shared successfully');
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
      </div>
      <Toaster />
    </div>
  );
}

export default App;
