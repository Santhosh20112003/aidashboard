import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../../context/DataContext";
import YouTubeFrame from "./parts/YoutubeFrame";
import ChatInputs from "./parts/ChatInputs";
import CodeEditor from "./parts/CodeEditor";
import OutputDisplay from "./parts/OutputDisplay";
import toast, { Toaster } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { BiSolidCopy, BiCopy } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { converter, genAI, generationConfig } from "../../../../common/config";
import "../../../../chat.css";
import { TbSettingsCode } from "react-icons/tb";
import { LANGUAGE_VERSIONS, monacoThemes } from "../../../../constants";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";
import "./css/load.css";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { useUserAuth } from "../../../context/UserAuthContext";
import { extractJsonObject } from "../../../../common/methods";

function CodeEditorMode() {
  const { id } = useParams();
  const {
    setHeading,
    setVideos,
    setVideoID,
    setEditorContent,
    setExplanation,
    setLanguage,
    setLastInput,
    explanation,
    language,
    editorContent,
    output,
    heading,
    videos,
    videoID,
    sharedcodeSpace,
    setisOptimized,
    setInput,
    input,
    isLoading,
    iscopied,
    theme,
    HandleTheme,
    copied,
    copyToClipboard,
    handleCodeExecute,
    copyOutputToClipboard,
    isOutputLoading,
    isGenerating,
    setSpaceid,
    setCodeShared,
    setOutput,
    isFullScreen,
    setIsFullscreen,
    setReloadShared,
    reloadShared,
    lastInput,
    setIsLoading,
    UpdateExistingSpace,
    searchYouTube,
    spaceid,
    CodeShared,
    setisGenerating,
    isOptimized
  } = useData();
  const editorReference = useRef(null);
  const debounceTimeout = useRef(null);
  const [data, setData] = useState(null);
  const { user } = useUserAuth();

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const handleChange = (value, event) => {
    setisOptimized(false);
    setEditorContent(value);

    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      const updateData = {
        spaceid,
        language,
        code: value,
        updatedAt: new Date(),
      };

      const response = await UpdateExistingSpace(updateData);
      if (!response) {
        console.error("Unable to upload to Cloud");
        return;
      }

    }, 500);
  };

  const handleChatSubmission = async () => {
    if (!input || input === lastInput) {
      toast.remove();
      toast.error("Change the Input Prompt to Generate Contents");
      return;
    }

    setIsLoading(true);

    try {
      const history = [
        lastInput && { role: "user", parts: [{ text: lastInput }] },
        editorContent && { role: "model", parts: [{ text: editorContent }] },
      ].filter(Boolean);

      const chatSession = genAI
        .getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `
            Create a JSON object designed for the Monaco Editor interface with the following structure:
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
            Ensure the code is simple, modular, and adheres to best practices for readability.
          `,
        })
        .startChat({ generationConfig, safetySettings, history });

      const result = await chatSession.sendMessage(input);
      const responseData = JSON.parse(await result.response.text());

      const videoz = await searchYouTube(responseData.heading);

      const updateData = {
        userid: data.userid,
        spaceid,
        input,
        lastinput: input,
        language: responseData.language,
        heading: responseData.heading,
        videos: videoz.items,
        shared: CodeShared,
        videoID: videoz.items[0]?.id?.videoId,
        explanation: responseData.explanation,
        code: responseData.code,
        updatedAt: new Date(),
      };

      const response = await UpdateExistingSpace(updateData);
      if (!response) {
        new Error("Unable to upoad to Cloud");
      }

      setVideos(updateData.videos);
      setVideoID(updateData.videoID);
      setHeading(updateData.heading);
      setEditorContent(updateData.code);
      setExplanation(updateData.explanation);
      setLanguage(updateData.language.toLowerCase());
      setLastInput(updateData.input);
      setOutput(null);
      toast.remove();
      toast.success("Content generated successfully!");
    } catch (error) {
      console.error("Error generating content:", error);
      toast.remove();
      toast.error(
        "An error occurred while generating the content. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimizer = async () => {
    setisGenerating(true);
    if (isOptimized) {
      toast.remove();
      toast("Code is Already Optimized", {
        icon: "⚠️",
      });
      setisGenerating(false);
      return;
    }

    try {
      const CodeSetings = {
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
        setisGenerating(false);
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
        setting: CodeSetings,
        history: [
          {
            role: "user",
            parts: [
              {
                text: `#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\n// Function to check if two strings are anagrams\nbooln areAnagrams(string str1, string str2) {\n    str1.erase(remove(str1.begin(), str1.end(), ' '), str1.end());\n    str2.erase(remove(str2.begin(), str2.end(), ' '), str2.end());\n    transform(str1.begin(), str1.end(), str1.begin(), ::tolower);\n    transform(str2.begin(), str2.end(), str2.begin(), ::tolower);\n    // Check if lengths are different\n    if (str1.length() != str2.length()) {\n        return false;\n    }\n    // Sort the strings and compare\n    sort(str1.begin(), str1.end());\n    sort(str2.begin(), str2.end());\n    return str1 == str2;\n}\n\nint main() {\n    string string1 = \"Listen\";\n    string string2 = \"Silent\";\n    string string3 = \"hello\";\n    string string4 = \"world\";\n    cout << \"\\\" \" << string1 << \" \\\" and \\\" \" << string2 << \" \\\" are anagrams: \" << (areAnagrams(string1, string2) ? \"true\" : \"false\") << endl;\n    cout << \"\\\" \" << string3 << \" \\\" and \\\" \" << string4 << \" \\\" are anagrams: \" << (areAnagrams(string3, string4) ? \"true\" : \"false\") << endl;\n    return 0;\n}\n optimize this code and Return the final output in JSON format as follows:\n{\n  "code": "<optimized_code>",\n  "timeComplexity": "<new_time_complexity>",\n  "spaceComplexity": "<new_space_complexity>"\n}`,
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
      const result = await chat.sendMessage(
        editorContent +
        `optimize this code and Return the final output in JSON format as follows:\n{\n  "code": "<optimized_code>",\n  "timeComplexity": "<new_time_complexity>",\n  "spaceComplexity": "<new_space_complexity>"\n}`
      );
      const data = await result.response.text();
      const responseData = extractJsonObject(data);
      setisOptimized(true);
      const optimizedCode = `${LANGUAGE_VERSIONS[language].comment} ${heading}\n${LANGUAGE_VERSIONS[language].comment} Time Complexity: ${responseData.timeComplexity}\n${LANGUAGE_VERSIONS[language].comment} Space Complexity: ${responseData.spaceComplexity}\n${responseData.code}`;
      setEditorContent(optimizedCode);

      const updateData = {
        spaceid,
        language,
        code: optimizedCode,
        updatedAt: new Date(),
      };

      const response = await UpdateExistingSpace(updateData);
      if (!response) {
        throw new Error("Unable to upload to Cloud");
      }

      toast.remove();
      toast.success("Code is optimized successfully.");
    } catch (error) {
      console.error("Error optimizing code:", error);
    } finally {
      setisGenerating(false);
    }
  };

  const HandleFullScreen = () => {
    const codespaceElement = document.getElementById("sharedcodespace");

    if (codespaceElement) {
      if (!document.fullscreenElement) {
        codespaceElement.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch((err) => console.error("Error entering fullscreen:", err));
      } else {
        document.exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch((err) => console.error("Error exiting fullscreen:", err));
      }
    }
  };

  const onSwap = async () => {
    try {
      const randomIndex = Math.floor(Math.random() * videos.length);
      const newVideoID = videos[randomIndex]?.id?.videoId;

      if (newVideoID && newVideoID !== videoID) {
        setVideoID(newVideoID);
        const updateData = {
          spaceid,
          videoID: newVideoID,
          updatedAt: new Date(),
        };

        const response = await UpdateExistingSpace(updateData);
        if (!response) {
          new Error("Unable to upoad to Cloud");
        }

        toast.remove();
        toast.success("Video swapped successfully!");
      } else {
        toast("Same video selected, no swap performed.");
      }
    } catch (error) {
      toast.remove();
      toast.error("Unable to swap video. Please try again.");
      console.error("Error swapping video:", error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(isFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [setIsFullscreen]);

  useEffect(() => {
    const loadSpaceData = () => {
      try {
        const res = sharedcodeSpace.find((item) => item.spaceid === id);
        if (res?.isEditorMode) {
          setOutput(null);
          setHeading(res?.heading);
          setSpaceid(res?.spaceid);
          setInput(res?.input);
          setLastInput(res?.lastinput);
          setVideos(res?.videos);
          setVideoID(res?.videoID);
          setCodeShared(res?.shared);
          setEditorContent(res?.code);
          setExplanation(res?.explanation);
          setLanguage(res?.language.toLowerCase());
          setLastInput(res?.input);
          setData(res || null);
        }
        else {
          setReloadShared(!reloadShared);
          loadSpaceData();
          setData(null);
        }
      }
      catch (err) {
        console.log(err);
      }
    };

    loadSpaceData();
  }, [id, sharedcodeSpace]);

  const container = document.getElementById("sharedcodespace");

  if (!data) {
    return <div className="w-full h-screen flex items-center justify-center">Loading or no space found...</div>;
  }

  return (
    <div id="sharedcodespace" className="w-full h-[90vh] px-4 pb-2 pt-2 bg-white flex space-x-4">
      <div className={`${videoID ? "md:w-1/2 w-full" : "md:w-full w-full"} space-y-4`}>
        <YouTubeFrame videoID={videoID} onSwap={onSwap} videos={videos} />
        {(explanation && videoID) && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <div className={`p-4 cursor-pointer hover:brightness-75 active:scale-[99%] transition-all bg-gray-100 ${isFullScreen ? 'h-[30vh]' : 'h-[25vh]'} overflow-y-auto rounded-lg border border-gray-300`}>
                <div className="flex items-center mb-3 justify-between">
                  <h3 className="text-lg font-semibold  text-black">{heading}</h3>
                  <h3 className="text-sm px-2 pb-0.5 pt-1 uppercase rounded-md bg-black font-semibold  text-gray-100">{language}</h3>
                </div>
                <div className="jarvis no-tailwindcss" dangerouslySetInnerHTML={{ __html: converter.makeHtml(explanation) }} />
              </div>
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
        )}
        <ChatInputs input={input} setInput={setInput} handleChatSubmission={handleChatSubmission} isLoading={isLoading} videoID={videoID} />
      </div>
      <div className={`${videoID ? "w-1/2 md:block hidden" : "hidden"} h-full`}>
        <CodeEditor editorReference={editorReference} language={language} editorContent={editorContent} handleChange={handleChange} theme={theme} />
        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCodeExecute}
              disabled={isLoading || isOutputLoading}
              className="flex active:scale-95 transition-all items-center justify-center py-1 px-4 bg-black text-white font-medium rounded-lg hover:bg-black/85"
            >
              <FaPlay className="mr-2" /> Run Code
            </button>
            <button disabled={isGenerating} onClick={handleOptimizer} className="disabled:opacity-50 disabled:animate-bounce p-1 bg-black rounded-md active:scale-95 transition-all" >
              <TbSettingsCode className="text-[1.4rem] text-white" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => HandleFullScreen()}
              className={`bg-gray-200 p-1.5 rounded-md active:scale-90 transition-all`} >
              {isFullScreen ? <RiFullscreenExitLine className="text-xl text-gray-700" /> : <RiFullscreenFill className="text-xl text-gray-700" />}
            </button>
            <select
              className="p-1 bg-gray-100 w-[150px] rounded-md border border-gray-300 focus:ring-0"
              onChange={(e) => HandleTheme(e)}
              value={theme}
            >
              <option value="vs-light">Light mode</option>
              <option value="vs-dark">Dark mode</option>
              {Object.entries(monacoThemes).map(([themeId, themeName]) => (
                <option key={themeId} value={themeId}>{themeName}</option>))}
            </select>
          </div>
        </div>
        <OutputDisplay
          output={output}
          isOutputLoading={isOutputLoading}
          handleCopy={copyOutputToClipboard}
          copied={copied}
        />
      </div>
      <Toaster position="top-center" />
    </div >
  );
}

export default CodeEditorMode;
