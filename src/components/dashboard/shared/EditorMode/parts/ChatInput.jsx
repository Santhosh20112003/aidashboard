import React from 'react'
import { BsStars } from 'react-icons/bs'
import { FaGear } from 'react-icons/fa6'
import * as Dialog from "@radix-ui/react-dialog";
import { useData } from '../../../../context/DataContext';
import { genAI, webGenerationConfig } from '../../../../../common/config';
import { useUserAuth } from '../../../../context/UserAuthContext';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { extractWebJsonObject } from '../../../../../common/methods';
import toast from 'react-hot-toast';

function ChatInput({ input, setInput, isLoading }) {
  const { setExplanation, setHeading, webprompt, CodeShared, setLastInput, setFramework, sharedwebSpace, UpdateWebExistingSpace, Type, webspaceid, setIsLoading, isFullScreen, lastInput, editorContent, htmlCode, cssCode, jsCode, framework, setCssCode, setHtmlCode, setJsCode } = useData();
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
  
  const handleWebChatSubmission = async () => {
    if (!input || input === lastInput) {
      toast.remove();
      toast.error("Change the Input Prompt to Generate Contents");
      return;
    }
    setIsLoading(true);

    try {
      const history = [
        lastInput && { role: "user", parts: [{ text: lastInput }] },
        editorContent && {
          role: "model",
          parts: [
            {
              text: JSON.stringify({
                html: htmlCode,
                css: cssCode,
                js: jsCode,
                frameworks: framework,
              }),
            },
          ],
        },
      ].filter(Boolean);

      const chatSession = genAI
        .getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `
            Generate a JSON response structured as follows, adhering to the provided guidelines:
          {
            "type": "Specify the script type. Options: ['html'].",
            "html": "If the selected type is 'html', provide a complete HTML document addressing [problem_description]. Include only valid HTML elements. Do not include any '<link>' tags to reference 'style.css' or '<script>' tags to reference 'script.js'. Additionally, do not include styles within '<style>' tags or scripts within '<script>' tags. All styles should be provided in the 'css' field, and all scripts should be provided in the 'js' field.",
            "css": "If the type is 'html', provide a separate CSS file addressing [problem_description]. Exclude HTML or JavaScript content.",
            "js": "If the type is 'html', provide a JavaScript file addressing [problem_description]. Exclude HTML or CSS content.",
            "frameworks": "For 'html', specify the CSS framework(s) used. Options: 'css', 'tailwind', 'bulma', 'bootstrap', 'uikit', 'purecss'. If no frameworks are used, set this to 'css'. Do not include CDN links for any frameworks.",
            "Heading": "Provide a concise title summarizing the code's purpose.",
            "Explanation": "Provide a detailed explanation of how the code works. Ensure the solution is modular, adheres to best practices, and delivers a professional, rich UI experience. Additional CSS frameworks or APIs may be used if necessary."
          }
          `,
        })
        .startChat({
          history,
          webGenerationConfig,
          safetySettings,
        });
      const result = await chatSession.sendMessage(
        webprompt +
        `Do not include any '<link>' tags to reference 'style.css' or '<script>' tags to reference 'script.js'. Additionally, do not include styles within '<style>' tags or scripts within '<script>' tags. All styles should be provided in the 'css' field, and all scripts should be provided in the 'js' field.`
      );
      const data = await result.response.text();
      const responseData = extractWebJsonObject(data);

      if (responseData.type == "html") {
        const updateData = {
          userid: user.uid,
          spaceid: webspaceid,
          type: Type,
          input,
          lastinput: input,
          shared: CodeShared,
          htmlCode: responseData.html,
          cssCode: responseData.css,
          jsCode: responseData.js,
          frameworks: responseData.frameworks,
          heading: responseData.Heading,
          explanation: responseData.Explanation,
          updatedAt: new Date(),
        };

        const response = await UpdateWebExistingSpace(updateData);
        if (!response) {
          new Error("Unable to upoad to Cloud");
        }
        setHeading(updateData.heading);
        setExplanation(updateData.explanation);
        setHtmlCode(updateData.htmlCode);
        setCssCode(updateData.cssCode);
        setJsCode(updateData.jsCode);
        setFramework(updateData.frameworks);
        setLastInput(updateData.input);
        toast.remove();
        toast.success("Content generated successfully!");
      } else {
        toast(
          "This is Space is particular for Vanilla things try creating new space",
          {
            icon: "⚠️",
          }
        );
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.remove();
      toast.error(
        "An error occurred while generating web content. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const container = document.getElementById("codespace");
  return (
    <div>
      <textarea value={input}
        disabled={isLoading}
        onChange={(e) => setInput(e.target.value)} className={`w-full max-h-[50px] h-[8vh] px-4 py-2  border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black`} placeholder="Type your prompt here..." />
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