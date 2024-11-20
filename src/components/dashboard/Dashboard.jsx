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
import { converter, genAI, generationConfig } from "../../common/config";
import { Link, useLocation } from "react-router-dom";
import Header from "./parts/Header";
import { useData } from "../context/DataContext";

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

function App() {
  const { user, logOut } = useUserAuth();
  const { isDropdownOpen,
    setIsDropdownOpen,
    editorContent,
    setEditorContent,
    input,
    setInput,
    videos,
    setVideos,
    open,
    setOpen,
    lastInput,
    setLastInput,
    language,
    setLanguage,
    explanation,
    setExplanation,
    heading,
    setHeading,
    theme,
    setTheme,
    isLoading,
    setIsLoading,
    copied,
    setCopied,
    iscopied,
    setisCopied,
    videoID,
    setVideoID,
    isOutputLoading,
    setIsOutputLoading,
    output,
    setOutput,
    isGenerating,
    setisGenerating, } = useData();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dashboardData")) || {};
    if (Object.keys(storedData).length) {
      setVideos(storedData.videos || videos);
      setEditorContent(storedData.editorContent || editorContent);
      setHeading(storedData.heading || heading);
      setExplanation(storedData.explanation || explanation);
      setVideoID(storedData.videoID || videoID);
      setLanguage(storedData.language || language);
      setLastInput(storedData.lastInput || lastInput);
      setInput(storedData.lastInput || lastInput);
    }
  }, []);

  useEffect(() => {
    console.log(user);
  }, []);

  const UpdateLocal = () => {
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
  };

  const handleChange = (value, event) => {
    console.log(event);
    setEditorContent(value);
    UpdateLocal();
  };

  const searchYouTube = (head) =>
    new Promise((resolve, reject) => {
      if (!head) return reject(new Error("head is required"));

      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
          head
        )}&type=video&key=AIzaSyBTzFaLovTRNftZ5peD4AkZe_q4vRpBk8w`
      )
        .then((response) => response.json())
        .then((data) => {
          setVideos(data);
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
      const history = [
        lastInput ? { role: "user", parts: [{ text: lastInput }] } : null,
        editorContent
          ? { role: "model", parts: [{ text: editorContent }] }
          : null,
      ].filter(Boolean);
      const chatSession = genAI
        .getGenerativeModel({
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
        })
        .startChat({
          generationConfig,
          safetySettings,
          history,
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

  const onSwap = () => {
    try {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      if (videos?.items[randomNumber]?.id?.videoId !== videoID) {
        setVideoID(videos.items[randomNumber].id.videoId);
      }
      toast.success("Video Swapped");
    } catch (err) {
      toast.error("Unable to Swap Video");
      console.log(err);
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

      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        payload
      );
      console.log(response);
      const { stdout = "No output", stderr } = response.data.run || {};

      if (stdout.trim() === "No output" && !stderr) {
        toast.info("This code doesn't produce any visible output!");
        setOutput("No output.");
      } else if (stderr) {
        toast.error("Error during code execution.");
        setOutput(
          `<strong>Error:</strong><br/>${stderr
            .replace(/\n/g, "<br/>")
            .replace(/\t/g, "&nbsp;")}`
        );
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

  const handleOptimizer = async () => {
    setisGenerating(true);

    try {
      const setting = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            timeComplexity: {
              type: "string",
            },
            spaceComplexity: {
              type: "string",
            },
          },
          required: ["code", "timeComplexity", "spaceComplexity"],
        },
      };

      if (!editorContent) {
        console.error("No code content provided.");
        return;
      }

      const AI = new GoogleGenerativeAI(
        "AIzaSyDmmnVfs5qtu9NRGhLWphp-hiK4MlGhmz8"
      );
      const chat = AI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction:
          'You’re a skilled software engineer with extensive experience in code optimization and performance analysis. Your expertise lies in evaluating algorithms for both space and time complexity, and you have a knack for rewriting code to enhance efficiency without compromising functionality.\nYour task is to analyze the provided code, evaluate its current space and time complexity, and rewrite it to achieve a more optimized version by reducing unnecessary resource usage and minimizing execution time.\nPlease ensure to clearly state the initial complexity and the new complexity of the rewritten code. Include comments in the code explaining the optimizations made and how they impact performance. Return the final output in JSON format as follows:\n{\n  "code": "<optimized_code>",\n  "timeComplexity": "<new_time_complexity>",\n  "spaceComplexity": "<new_space_complexity>"\n}',
      }).startChat({
        setting,
        history: [
          {
            role: "user",
            parts: [
              {
                text: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\n// Function to check if two strings are anagrams\nbooln areAnagrams(string str1, string str2) {\n    str1.erase(remove(str1.begin(), str1.end(), ' '), str1.end());\n    str2.erase(remove(str2.begin(), str2.end(), ' '), str2.end());\n    transform(str1.begin(), str1.end(), str1.begin(), ::tolower);\n    transform(str2.begin(), str2.end(), str2.begin(), ::tolower);\n    // Check if lengths are different\n    if (str1.length() != str2.length()) {\n        return false;\n    }\n    // Sort the strings and compare\n    sort(str1.begin(), str1.end());\n    sort(str2.begin(), str2.end());\n    return str1 == str2;\n}\n\nint main() {\n    string string1 = \"Listen\";\n    string string2 = \"Silent\";\n    string string3 = \"hello\";\n    string string4 = \"world\";\n    cout << \"\\\" \" << string1 << \" \\\" and \\\" \" << string2 << \" \\\" are anagrams: \" << (areAnagrams(string1, string2) ? \"true\" : \"false\") << endl;\n    cout << \"\\\" \" << string3 << \" \\\" and \\\" \" << string4 << \" \\\" are anagrams: \" << (areAnagrams(string3, string4) ? \"true\" : \"false\") << endl;\n    return 0;\n}\n`,
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: `{\"code\": \"#include <iostream>\\n#include <string>\\n#include <algorithm>\\n\\nusing namespace std;\\n\\n// Function to check if two strings are anagrams\\nbool areAnagrams(string str1, string str2) {\\n    //Remove spaces and convert to lowercase in one pass\\n    string lowerStr1 = \\\"\\\";\\n    string lowerStr2 = \\\"\\\";\\n    for (char c : str1) {\\n        if (c != ' ')\\n            lowerStr1 += tolower(c);\\n    }\\n    for (char c : str2) {\\n        if (c != ' ')\\n            lowerStr2 += tolower(c);\\n    }\\n\\n    // Check if lengths are different. If so, return false immediately.\\n    if (lowerStr1.length() != lowerStr2.length()) {\\n        return false;\\n    }\\n\\n    //Use a map to count character frequencies. This avoids sorting.   \\n    map<char, int> charCount;\\n    for (char c : lowerStr1) {\\n        charCount[c]++;\\n    }\\n    for (char c : lowerStr2) {\\n        charCount[c]--;\\n        if (charCount[c] < 0) {\\n            return false; //Character count mismatch\\n        }\\n    }\\n    return true; //All character counts matched\\n}\\n\\nint main() {\\n    string string1 = \\\"Listen\\\";\\n    string string2 = \\\"Silent\\\";\\n    string string3 = \\\"hello\\\";\\n    string string4 = \\\"world\\\";\\n\\n    cout << \\\"\\\\\\\" \\\" << string1 << \\\" \\\\\\\" and \\\\\\\" \\\" << string2 << \\\" \\\\\\\" are anagrams: \\\" << (areAnagrams(string1, string2) ? \\\"true\\\" : \\\"false\\\") << endl;\\n    cout << \\\"\\\\\\\" \\\" << string3 << \\\" \\\\\\\" and \\\\\\\" \\\" << string4 << \\\" \\\\\\\" are anagrams: \\\" << (areAnagrams(string3, string4) ? \\\"true\\\" : \\\"false\\\") << endl;\\n    return 0;\\n}\", \"spaceComplexity\": \"O(min(m,n))\", \"timeComplexity\": \"O(m+n)\"}`,
              },
            ],
          },
        ],
      });
      const result = await chat.sendMessage(editorContent);
      const data = await result.response.text();
      console.log(data);
      const responseData = JSON.parse(
        data.replace("```json", "").replace("```", "")
      );
      setEditorContent(
        `//${heading}\n//time complexity: ${responseData.timeComplexity}\n//Space complexity: ${responseData.spaceComplexity} \n` +
        responseData.code
      );
      UpdateLocal();
      toast.success(`Code is optimized.`);
    } catch (error) {
      console.error("Error optimizing code:", error);
    } finally {
      setisGenerating(false); // Ensure this runs after the operation finishes
    }
  };

  const copyOutputToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(output.replace(/<br\/>/g, "\n").replace(/&nbsp;/g, "\t"))
        .then(() => {
          toast.success("Output Copied");
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
          toast.success("Code Explanation Copied");
          setisCopied(true);
          setTimeout(() => setisCopied(false), 3000);
        })
        .catch(console.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header setOpen={setOpen} open={open} setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen} logOut={logOut} />
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
