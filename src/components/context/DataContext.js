import { createContext, useContext, useRef, useState } from "react";
import {
  genAI,
  generationConfig,
  webGenerationConfig,
} from "../../common/config";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import axios from "axios";
import { LANGUAGE_VERSIONS } from "../../constants";
import { useUserAuth } from "./UserAuthContext";
import { extractJsonObject, extractWebJsonObject } from "../../common/methods";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { defineTheme } from "../../common/defineTheme";
import { FaGear } from "react-icons/fa6";

const DataContext = createContext();

export function DataContextProvider({ children }) {
  const { user } = useUserAuth();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const [searchPrompt, setSearchPrompt] = useState("");
  const [websearchPrompt, setWebSearchPrompt] = useState("");
  const [promptLang, setpromptLang] = useState("");
  const [webpromptLang, setwebpromptLang] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [webprompt, setWebPrompt] = useState("");
  const [videos, setVideos] = useState(null);
  const [open, setOpen] = useState(false);
  const [lastInput, setLastInput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [explanation, setExplanation] = useState("");
  const [Type, setType] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [framework, setFramework] = useState("css");
  const [heading, setHeading] = useState("");
  const [theme, setTheme] = useState("vs-light");
  const [isLoading, setIsLoading] = useState(false);
  const [isWebLoading, setIsWebLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isCodeSpaceDeleting, setisCodeSpaceDeleting] = useState(false);
  const [isWebSpaceDeleting, setisWebSpaceDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iscopied, setisCopied] = useState(false);
  const [isOptimized, setisOptimized] = useState(false);
  const [videoID, setVideoID] = useState("");
  const [spaceid, setSpaceid] = useState("");
  const [webspaceid, setWebSpaceid] = useState("");
  const [isOutputLoading, setIsOutputLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [isGenerating, setisGenerating] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [webspaces, setWebSpaces] = useState([]);
  const [spacestemplates, setSpacesTemplates] = useState([]);
  const [webspacestemplates, setWebSpacesTemplates] = useState([]);
  const [codeTrashes, setCodeTrashes] = useState([]);
  const [webTrashes, setWebTrashes] = useState([]);
  const [sharedcodeSpace, setSharedcodeSpace] = useState([]);
  const [sharedwebSpace, setSharedwebSpace] = useState([]);
  const [isDeleting, setisDeleting] = useState(false);
  const [CodeShared, setCodeShared] = useState([]);
  const [isErrorOccured, setisErrorOccured] = useState(false);
  const [errorSuggesion, setErrorSuggesion] = useState("");
  const [isRestoring, setisRestoring] = useState(false);
  const [isDeleteOpen, setisDeleteOpen] = useState(false);
  const [isErrorOpen, setisErrorOpen] = useState(false);
  const [results, setResults] = useState(spaces);
  const [webresults, setWebResults] = useState(webspaces);
  const debounceTimeout = useRef(null);
  const debounceWebTimeout = useRef(null);
  const [isShareOpen, setisShareOpen] = useState(false);
  const [isCodeOpen, setisCodeOpen] = useState(false);
  const [isFullScreen, setIsFullscreen] = useState(false);
  const [reloadShared, setReloadShared] = useState(false);
  const [notes, setNotes] = useState({});
  const [conversation, setConversation] = useState([]);
  const [newOpen, setNewOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isWebTemplateOpen, setIsWebTemplateOpen] = useState(false);
  const [reloadSpaces, setReloadSpaces] = useState(false);
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [isSaving, setisSaving] = useState(false);

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

      const updatedSpaces = spaces.map((item) =>
        item.spaceid === spaceid ? { ...item, code: value } : item
      );

      setSpaces(updatedSpaces);
    
    }, 500);
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
          resolve(data);
        })
        .catch(reject);
    });

  const UpdateExistingSpace = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || Object.keys(data).length < 1) {
          return reject(new Error("Object is empty. No space can be updated."));
        }

        const userDocQuery = query(
          collection(db, "spaces"),
          where("spaceid", "==", data.spaceid)
        );
        const querySnapshot = await getDocs(userDocQuery);

        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, data);
          resolve(true);
        } else {
          console.log("No matching document found.");
          resolve(false);
        }
      } catch (error) {
        console.error("Error updating space:", error.message);
        reject(error);
      }
    });
  };

  const UpdateWebExistingSpace = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || Object.keys(data).length < 1) {
          return reject(new Error("Object is empty. No space can be updated."));
        }

        const userDocQuery = query(
          collection(db, "webspaces"),
          where("spaceid", "==", data.spaceid)
        );
        const querySnapshot = await getDocs(userDocQuery);

        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, data);
          resolve(true);
        } else {
          console.log("No matching document found.");
          resolve(false);
        }
      } catch (error) {
        console.error("Error updating space:", error.message);
        reject(error);
      }
    });
  };

  const UpdateLanguage = async (data) => {
    try {
      if (!data || Object.keys(data).length < 1) {
        throw new Error("Object is empty. No language can be updated.");
      }

      const userDocQuery = query(
        collection(db, "users"),
        where("userid", "==", user.uid)
      );
      const querySnapshot = await getDocs(userDocQuery);

      if (querySnapshot.empty) {
        console.log("No matching document found.");
        return false;
      }

      const docRef = querySnapshot.docs[0].ref;
      const docData = querySnapshot.docs[0].data();

      const langSet = new Set([data.language, ...(docData.lang || [])]);
      const updatedData = { ...docData, lang: Array.from(langSet) };

      // Update the document
      await updateDoc(docRef, updatedData);
      return true;
    } catch (error) {
      console.error("Error updating language:", error.message);
      throw error;
    }
  };

  const UpdateWeb = async (data) => {
    try {
      if (!data || Object.keys(data).length < 1) {
        throw new Error("Object is empty. No web can be updated.");
      }

      const userDocQuery = query(
        collection(db, "users"),
        where("userid", "==", user.uid)
      );
      const querySnapshot = await getDocs(userDocQuery);

      if (querySnapshot.empty) {
        console.log("No matching document found.");
        return false;
      }

      const docRef = querySnapshot.docs[0].ref;
      const docData = querySnapshot.docs[0].data();
      const webSet = new Set([data.web, ...(docData.web || [])]);
      const updatedData = { ...docData, web: Array.from(webSet) };
      await updateDoc(docRef, updatedData);
      return true;
    } catch (error) {
      console.error("Error updating web:", error.message);
      throw error;
    }
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
        userid: user.uid,
        spaceid,
        input,
        lastinput: input,
        language: responseData.language,
        heading: responseData.heading,
        videos: videoz.items,
        videoID: videoz.items[0]?.id?.videoId,
        explanation: responseData.explanation,
        code: responseData.code,
        updatedAt: new Date(),
      };

      const response = await UpdateExistingSpace(updateData);
      if (!response) {
        new Error("Unable to upoad to Cloud");
      }

      const updatedSpaces = spaces.map((item) =>
        item.spaceid === spaceid
          ? { ...updateData, createdAt: item.createdAt }
          : item
      );

      setSpaces(updatedSpaces);
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

  const searchNewYouTube = (head) =>
    new Promise((resolve, reject) => {
      if (!head) return reject(new Error("head is required"));

      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
          head
        )}&type=video&key=AIzaSyBTzFaLovTRNftZ5peD4AkZe_q4vRpBk8w`
      )
        .then((response) => response.json())
        .then((data) => {
          resolve(data.items);
        })
        .catch(reject);
    });

  const AddNewSpace = async (data) => {
    new Promise(async (resolve, reject) => {
      if (Object.keys(data).length < 1) {
        return reject(new Error("Object is empty. No space can be added."));
      }
      try {
        await addDoc(collection(db, "spaces"), data);
        resolve(true);
      } catch (err) {
        console.log(err);
        toast.remove();
        toast.error("Unable to add Space");
        reject(false);
      }
    });
  };

  const deleteSpace = (space) => {
    return new Promise(async (resolve, reject) => {
      if (Object.keys(space).length < 1) {
        return reject(new Error("Invalid ID. No space can be deleted."));
      }

      try {
        const data = { ...space, updatedAt: new Date() };
        const cardQuery = query(
          collection(db, "spaces"),
          where("spaceid", "==", data.spaceid)
        );

        const querySnapshot = await getDocs(cardQuery);

        if (querySnapshot.empty) {
          return reject(new Error("No space found with the provided ID."));
        }

        const docRef = querySnapshot.docs[0].ref;
        await addDoc(collection(db, "codespacetrash"), data);
        await deleteDoc(docRef);

        resolve(true);
      } catch (error) {
        console.error("Error deleting space:", error);
        reject(new Error("Unable to delete space. Please try again."));
      }
    });
  };

  const handleDeleteCodeSpace = async (data) => {
    setisCodeSpaceDeleting(true);

    try {
      await deleteSpace(data);

      setSpaces((prevSpaces) =>
        prevSpaces.filter((s) => s.spaceid !== data.spaceid)
      );
      setCodeTrashes((prevTrashes) => [
        ...prevTrashes,
        { ...data, updatedAt: new Date() },
      ]);
      toast.remove();
      toast.success("CodeSpace deleted successfully.");
    } catch (error) {
      toast.remove();
      toast.error(error.message || "Unable to delete CodeSpace.");
      console.error("Error in handleDeleteCodeSpace:", error);
    } finally {
      setisCodeSpaceDeleting(false);
    }
  };

  const deleteWebSpace = (space) => {
    return new Promise(async (resolve, reject) => {
      if (Object.keys(space).length < 1) {
        return reject(new Error("Invalid ID. No space can be deleted."));
      }

      try {
        const data = { ...space, updatedAt: new Date() };
        const cardQuery = query(
          collection(db, "webspaces"),
          where("spaceid", "==", data.spaceid)
        );

        const querySnapshot = await getDocs(cardQuery);

        if (querySnapshot.empty) {
          return reject(new Error("No space found with the provided ID."));
        }

        const docRef = querySnapshot.docs[0].ref;
        await addDoc(collection(db, "webspacetrash"), data);
        await deleteDoc(docRef);

        resolve(true);
      } catch (error) {
        console.error("Error deleting space:", error);
        reject(new Error("Unable to delete space. Please try again."));
      }
    });
  };

  const handleDeleteWebSpace = async (data) => {
    setisWebSpaceDeleting(true);

    try {
      await deleteWebSpace(data);

      setWebSpaces((prevSpaces) =>
        prevSpaces.filter((s) => s.spaceid !== data.spaceid)
      );
      setWebTrashes((prevTrashes) => [
        ...prevTrashes,
        { ...data, updatedAt: new Date() },
      ]);
      toast.remove();
      toast.success("CodeSpace deleted successfully.");
    } catch (error) {
      toast.remove();
      toast.error(error.message || "Unable to delete CodeSpace.");
      console.error("Error in handleDeleteCodeSpace:", error);
    } finally {
      setisWebSpaceDeleting(false);
    }
  };

  const handleNewSubmission = async () => {
    if (!prompt) return;
    setIsLoading(true);
    try {
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
            Ensure the code is simple,does not use any external libraries or packages or apis,  modular, and adheres to best practices for readability.`,
        })
        .startChat({
          generationConfig,
          safetySettings,
        });
      const result = await chatSession.sendMessage(prompt);
      const responseData = JSON.parse(await result.response.text());
      if (["html", "css"].includes(responseData.language)) {
        toast.remove();
        toast((t) => (
          <div className="flex flex-col items-center gap-3">
            <p className="font-medium text-black">
              Web-related spaces can be generated with WebSpaces.
            </p>
            <div className="flex items-center justify-start gap-3 w-full">
              <button
                className="border text-black px-2 py-1 rounded-md bg-gray-200 "
                onClick={() => toast.dismiss(t.id)}
              >
                Dismiss
              </button>
              <Link
                to="/dashboard/webspace/new"
                className="border px-2 py-1 rounded-md bg-black text-white"
                onClick={() => toast.dismiss(t.id)}
              >
                WebSpaces
              </Link>
            </div>
          </div>
        ));
        return;
      }
      const videos = await searchNewYouTube(responseData.heading);
      const newData = {
        userid: user.uid,
        spaceid: uuidv4(),
        input: prompt,
        lastinput: prompt,
        language: responseData.language,
        heading: responseData.heading,
        videos,
        videoID: videos[0]?.id?.videoId,
        explanation: responseData.explanation,
        code: responseData.code,
        notes: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const data = {
        userid: user.uid,
        email: user.email,
        name: user.displayName,
        language: responseData.language,
      };
      const response = await AddNewSpace(newData);
      const lang = await UpdateLanguage(data);
      if (!response || !lang) {
        new Error("Unable to upoad to Cloud");
      }
      setSpaces((lastSpaces) => [newData, ...lastSpaces]);
      setPrompt("");
      navigate(`/dashboard/space/${newData.spaceid}`);
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

  const AddNewWebSpace = async (data) => {
    new Promise(async (resolve, reject) => {
      if (Object.keys(data).length < 1) {
        return reject(new Error("Object is empty. No space can be added."));
      }
      try {
        await addDoc(collection(db, "webspaces"), data);
        resolve(true);
      } catch (err) {
        console.log(err);
        toast.remove();
        toast.error("Unable to Add New WebSpace");
        reject(false);
      }
    });
  };

  const handleNewWebSubmission = async () => {
    if (!webprompt) return;
    setIsWebLoading(true);
    try {
      const chatSession = genAI
        .getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: `Generate a JSON response structured as follows, adhering to the provided guidelines:
          {
            "type": "Specify the script type. Options: ['html', 'react', 'angular', 'vuejs'].",
            "html": "If the selected type is 'html', provide a complete HTML document addressing [problem_description]. Include only valid HTML elements. Do not include any '<link>' tags to reference 'style.css' or '<script>' tags to reference 'script.js'. Additionally, do not include styles within '<style>' tags or scripts within '<script>' tags. All styles should be provided in the 'css' field, and all scripts should be provided in the 'js' field.",
            "css": "If the type is 'html', provide a separate CSS file addressing [problem_description]. Exclude HTML or JavaScript content.",
            "js": "If the type is 'html', provide a JavaScript file addressing [problem_description]. Exclude HTML or CSS content.",
            "frameworks": "For 'html', specify the CSS framework(s) used. Options: 'css', 'tailwindcss', 'bulma', 'bootstrap', 'uikit', 'purecss'. If no frameworks are used, set this to 'css'. Do not include CDN links for any frameworks.",
            "Code": "For types 'react', 'angular', or 'vuejs', provide a complete code snippet addressing [problem_description]. Omit this if the selected type is 'html'.",
            "Heading": "Provide a concise title summarizing the code's purpose.",
            "Explanation": "Provide a detailed explanation of how the code works. Ensure the solution is modular, adheres to best practices, and delivers a professional, rich UI experience. Additional CSS frameworks or APIs may be used if necessary."
          }`,
        })
        .startChat({
          // contents: [{ role: "user", parts }],
          webGenerationConfig,
          safetySettings,
        });
      const result = await chatSession.sendMessage(webprompt);
      const data = await result.response.text();
      const responseData = extractWebJsonObject(data);
      if (!["html", "react", "angular", "vuejs"].includes(responseData.type)) {
        toast.remove();
        toast((t) => (
          <div className="flex flex-col items-center gap-3">
            <p className="font-medium text-black">
              Coding related spaces can be generated with CodeSpaces.
            </p>
            <div className="flex items-center justify-start gap-3 w-full">
              <button
                className="border text-black px-2 py-1 rounded-md bg-gray-200 "
                onClick={() => toast.dismiss(t.id)}
              >
                Dismiss
              </button>
              <Link
                to="/dashboard/space/new"
                className="border px-2 py-1 rounded-md bg-black text-white"
                onClick={() => toast.dismiss(t.id)}
              >
                CodeSpaces
              </Link>
            </div>
          </div>
        ));
        return;
      }

      if (responseData.type == "html") {
        const newData = {
          userid: user.uid,
          spaceid: uuidv4(),
          input: webprompt,
          lastinput: webprompt,
          type: responseData.type,
          htmlCode: responseData.html,
          cssCode: responseData.css,
          jsCode: responseData.js,
          frameworks: responseData.frameworks,
          notes: {},
          heading: responseData.Heading,
          explanation: responseData.Explanation,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const data = {
          userid: user.uid,
          email: user.email,
          name: user.displayName,
          web: responseData.frameworks,
        };
        const response = await AddNewWebSpace(newData);

        const lang = await UpdateWeb(data);
        if (!response || !lang) {
          new Error("Unable to upoad to Cloud");
        }
        setWebSpaces((lastSpaces) => [newData, ...lastSpaces]);
        setWebPrompt("");
        navigate(`/dashboard/webspace/${newData.spaceid}`);
      } else {
        toast.remove();
        toast.error("Advanced web-related spaces cannot be created now.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.remove();
      toast.error(
        "An error occurred while generating the webspace content. Please try again later."
      );
    } finally {
      setIsWebLoading(false);
    }
  };

  const handleWebChatSubmission = async () => {
    if (!input || input === lastInput) {
      toast.remove();
      toast.error("Change the Input Prompt to Generate Contents");
      return;
    }

    setIsLoading(true);

    try {
      // Construct chat history for AI interaction
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
                frameworks: framework || "css",
              }),
            },
          ],
        },
      ].filter(Boolean);

      // Initialize chat session with the AI model
      const chatSession = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `
          Generate a JSON response structured as follows:
          {
            "type": "Specify the script type. Options: ['html'].",
            "html": "Provide a complete HTML document without styles or scripts in <style> or <script> tags.",
            "css": "Provide separate CSS content.",
            "js": "Provide separate JavaScript content.",
            "frameworks": "Specify frameworks used. If none, set this to 'css'.",
            "Heading": "Summarize the code's purpose in one line.",
            "Explanation": "Explain the code's functionality and purpose."
          }
        `,
      });

      // Send prompt to AI model
      const result = await chatSession
        .startChat({
          history,
          webGenerationConfig,
          safetySettings,
        })
        .sendMessage(
          JSON.stringify({
            html: htmlCode,
            css: cssCode,
            js: jsCode,
            frameworks: framework || "css",
          }) +
            " this is the old codebase , i want you to" +
            webprompt +
            `,if framework is not mentioned earlier use ${
              framework || "css"
            } and in the response, Do not include any '<link>' tags to reference 'style.css' or '<script>' tags to reference 'script.js'.
                   Additionally, do not include styles within '<style>' tags or scripts within '<script>' tags. All styles should be provided in the 'css' field, and all scripts should be provided in the 'js' field in the 'html' field `
          //  and
          //          give response in JSON Format in this structure
          //         sample response  {
          //   "type": "html",
          //   "html": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Simple Calculator</title>\n</head>\n<body>\n  <div class=\"container mx-auto p-8 bg-white rounded shadow-md mt-16\">\n    <h1 class=\"text-2xl font-bold mb-4 text-center\">Simple Calculator</h1>\n    <input type=\"text\" id=\"display\" class=\"w-full p-2 border border-gray-300 rounded mb-4 text-right text-lg\" readonly>\n    <div class=\"grid grid-cols-4 gap-2\">\n      <button class=\"button bg-gray-200 hover:bg-gray-300\">C</button>\n      <button class=\"button bg-gray-200 hover:bg-gray-300\">&#8592;</button>\n      <button class=\"button bg-gray-200 hover:bg-gray-300\">%</button>\n      <button class=\"button operator bg-orange-500 hover:bg-orange-600 text-white\">&#247;</button>\n      <button class=\"button\">7</button>\n      <button class=\"button\">8</button>\n      <button class=\"button\">9</button>\n      <button class=\"button operator bg-orange-500 hover:bg-orange-600 text-white\">&#215;</button>\n      <button class=\"button\">4</button>\n      <button class=\"button\">5</button>\n      <button class=\"button\">6</button>\n      <button class=\"button operator bg-orange-500 hover:bg-orange-600 text-white\">-</button>\n      <button class=\"button\">1</button>\n      <button class=\"button\">2</button>\n      <button class=\"button\">3</button>\n      <button class=\"button operator bg-orange-500 hover:bg-orange-600 text-white\">+</button>\n      <button class=\"button col-span-2\">0</button>\n      <button class=\"button\">.</button>\n      <button class=\"button operator bg-orange-500 hover:bg-orange-600 text-white\">=</button>\n    </div>\n  </div>\n</body>\n</html>",
          //   "css": "",
          //   "js": "const display = document.getElementById('display');\nconst buttons = document.querySelectorAll('.button');\nlet currentInput = '';\n\nbuttons.forEach(button => {\n  button.addEventListener('click', () => {\n    const value = button.textContent;\n    if (value === '=') {\n      try {\n        currentInput = eval(currentInput).toString();\n      } catch (error) {\n        currentInput = 'Error';\n      }\n    } else if (value === 'C') {\n      currentInput = '';\n    } else if (value === '←') {\n      currentInput = currentInput.slice(0, -1);\n    } else {\n      currentInput += value;\n    }\n    display.value = currentInput;\n  });\n});\n\ndocument.addEventListener('keydown', (event) => {\n  const key = event.key;\n  if (/[0-9+\-*/.%]/.test(key)) {\n    currentInput += key;\n    display.value = currentInput;\n  } else if (key === 'Enter') {\n    try {\n      currentInput = eval(currentInput).toString();\n      display.value = currentInput;\n    } catch (error) {\n      display.value = 'Error';\n      currentInput = '';\n    }\n  } else if (key === 'c' || key === 'C'){\n    currentInput = '';\n    display.value = currentInput;\n  } else if (key === 'Backspace'){\n    currentInput = currentInput.slice(0, -1);\n    display.value = currentInput;\n  }\n});",
          //   "frameworks": "tailwindcss",
          //   "Heading": "Responsive Calculator with Keyboard Support",
          //   "Explanation": "This code implements a simple calculator with a responsive UI using Tailwind CSS.  The calculator allows users to input numbers and perform basic arithmetic operations using both the on-screen buttons and the keyboard.  Keyboard support includes number keys, basic operators (+, -, *, /), decimal point (.), Enter key (=), backspace, and 'c' or 'C' for clear."
          // }`
        );
      const data = await result.response.text();

      // Clean the response (remove backticks and other non-JSON content)
      const responseData = extractJsonObject(data);

      // Validate response and proceed with updates
      if (responseData?.type === "html") {
        const updateData = {
          userid: user.uid,
          spaceid: webspaceid,
          type: Type,
          input,
          lastinput: input,
          htmlCode: responseData.html,
          cssCode: responseData.css,
          jsCode: responseData.js,
          frameworks: responseData.frameworks || "css",
          heading: responseData.Heading || "Generated Content",
          explanation: responseData.Explanation || "No explanation provided.",
          updatedAt: new Date(),
        };

        const response = await UpdateWebExistingSpace(updateData);
        if (!response) throw new Error("Failed to upload data to the cloud.");

        // Update state and UI
        setWebSpaces((prevSpaces) =>
          prevSpaces.map((item) =>
            item.spaceid === webspaceid
              ? { ...updateData, createdAt: item.createdAt }
              : item
          )
        );
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
        toast("This space is for vanilla content. Please create a new space.", {
          icon: "⚠️",
        });
      }
    } catch (error) {
      console.error(error);
      toast.remove();
      toast.error("Failed to generate content.");
    } finally {
      setIsLoading(false);
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
        const updatedSpaces = spaces.map((item) =>
          item.spaceid === spaceid ? { ...item, videoID: newVideoID } : item
        );

        setSpaces(updatedSpaces);
        toast.remove();
        toast.success("Video swapped successfully!");
      } else {
        // toast("Same video selected, no swap performed.");
      }
    } catch (error) {
      toast.remove();
      toast.error("Unable to swap video. Please try again.");
      console.error("Error swapping video:", error);
    }
  };

  const handleCodeExecute = async () => {
    setIsOutputLoading(true);
    setisErrorOccured(false);
    setErrorSuggesion("");

    try {
      // Prepare the payload for code execution
      const payload = {
        language,
        version: LANGUAGE_VERSIONS[language].version,
        files: [{ content: editorContent }],
      };

      // Send a POST request to execute the code
      const { data } = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        payload
      );
      // console.log(data);
      const { stdout = "", stderr, code } = data.run || {};

      if (stdout.trim() === "" && !stderr) {
        setisErrorOccured(true);
        toast("This code doesn't produce any visible output!");
        setOutput("No output.");
      } else if (stderr) {
        setisErrorOccured(true);
        toast.remove();
        toast.error("Error during code execution.");
        setOutput(
          `<strong>Error:</strong><br/>${stderr
            .replace(/\n/g, "<br/>")
            .replace(/\t/g, "&nbsp;")}`
        );
      } else if ([6, 5].includes(code)) {
        setisErrorOccured(true);
        toast.remove();
        toast.error("Error during code execution.");
      } else {
        toast.remove();
        toast.success("Code executed successfully!");
        setOutput(stdout.replace(/\n/g, "<br/>").replace(/\t/g, "&nbsp;"));
      }
    } catch (error) {
      console.error("Error executing code:", error);
      toast.remove();
      toast.error("Failed to execute code. Please try again later.");
      setOutput("Execution error.");
    } finally {
      setIsOutputLoading(false);
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

      const chat = genAI
        .getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction:
            'You’re a skilled software engineer with extensive experience in code optimization and performance analysis. Your expertise lies in evaluating algorithms for both space and time complexity, and you have a knack for rewriting code to enhance efficiency without compromising functionality.\nYour task is to analyze the provided code, evaluate its current space and time complexity, and rewrite it to achieve a more optimized version by reducing unnecessary resource usage and minimizing execution time.\nPlease ensure to clearly state the initial complexity and the new complexity of the rewritten code. Include comments in the code explaining the optimizations made and how they impact performance. Return the final output in JSON format as follows:\n{\n  "code": "<optimized_code>",\n  "timeComplexity": "<new_time_complexity>",\n  "spaceComplexity": "<new_space_complexity>"\n}',
        })
        .startChat({
          setting: CodeSetings,
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

      const updatedSpaces = spaces.map((item) =>
        item.spaceid === spaceid ? { ...item, code: optimizedCode } : item
      );
      setSpaces(updatedSpaces);

      toast.remove();
      toast.success("Code is optimized successfully.");
    } catch (error) {
      console.error("Error optimizing code:", error);
    } finally {
      setisGenerating(false);
    }
  };

  const copyOutputToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(output.replace(/<br\/>/g, "\n").replace(/&nbsp;/g, "\t"))
        .then(() => {
          toast.remove();
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
          toast.remove();
          toast.success("Code Explanation Copied");
          setisCopied(true);
          setTimeout(() => setisCopied(false), 3000);
        })
        .catch(console.error);
    }
  };

  const getSpaces = async (id) => {
    setIsFetching(true);
    try {
      const cardsQuery = query(
        collection(db, "spaces"),
        where("userid", "==", id),
        orderBy("updatedAt", "desc")
      );
      const snapshot = await getDocs(cardsQuery);
      setSpaces(snapshot.docs.map((doc) => doc.data()) || []);
    } catch (error) {
      console.error("Error fetching codespaces:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const getWebSpaces = async (id) => {
    setIsFetching(true);
    try {
      const cardsQuery = query(
        collection(db, "webspaces"),
        where("userid", "==", id),
        orderBy("updatedAt", "desc")
      );
      const snapshot = await getDocs(cardsQuery);
      setWebSpaces(snapshot.docs.map((doc) => doc.data()) || []);
    } catch (error) {
      console.error("Error web fetching webspaces:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const getCodeTrashes = async (id) => {
    setIsFetching(true);
    try {
      const cardsQuery = query(
        collection(db, "codespacetrash"),
        where("userid", "==", id),
        orderBy("updatedAt", "desc")
      );
      const snapshot = await getDocs(cardsQuery);
      setCodeTrashes(snapshot.docs.map((doc) => doc.data()) || []);
    } catch (error) {
      console.error("Error fetching codetrash:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const getWebTrashes = async (id) => {
    setIsFetching(true);
    try {
      const cardsQuery = query(
        collection(db, "webspacetrash"),
        where("userid", "==", id),
        orderBy("updatedAt", "desc")
      );
      const snapshot = await getDocs(cardsQuery);
      setWebTrashes(snapshot.docs.map((doc) => doc.data()) || []);
    } catch (error) {
      console.error("Error fetching webtrash:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const getUserDetails = async (user) => {
    try {
      if (!user?.uid) throw new Error("Invalid user object.");
      const userDocRef = query(
        collection(db, "users"),
        where("userid", "==", user.uid)
      );
      const docSnapshot = await getDocs(userDocRef);
      if (docSnapshot.docs.length === 0) throw new Error("User not found");
      setProfile(docSnapshot.docs[0].data());
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const NewUserCloud = async (user) => {
    try {
      // Validate the user object
      if (!user || Object.keys(user).length < 1 || !user.uid) {
        throw new Error("Invalid user object.");
      }

      const userDocRef = doc(db, "users", user.uid); // Use user.uid as the document ID
      const docSnapshot = await getDoc(userDocRef);

      // Check if the document already exists
      if (docSnapshot.exists()) {
        console.log("User already exists in the database.");
        return;
      }

      // Create a new user document
      const newUser = {
        userid: user.uid,
        name: user.displayName || "Unknown",
        email: user.email || "No Email",
        image:
          user.photoURL ||
          "https://xsgames.co/randomusers/assets/avatars/pixel/51.jpg",
        createdAt: new Date(),
        lang: [],
        web: [],
      };

      // Add the new user to Firestore using set
      await setDoc(userDocRef, newUser);

      toast.remove();
      toast.success("User added successfully.");
    } catch (error) {
      console.error("Error managing user:", error.message);
      // toast.error("Failed to add user. Please try again.");
    }
  };

  const HandleCodeSpaceRestore = async (codespace) => {
    try {
      setisRestoring(true);
      const updatedCard = {
        ...codespace,
        updatedAt: new Date(),
      };
      const cardQuery = query(
        collection(db, "codespacetrash"),
        where("spaceid", "==", codespace.spaceid)
      );
      const querySnapshot = await getDocs(cardQuery);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await addDoc(collection(db, "spaces"), updatedCard);
        await deleteDoc(docRef);
        setCodeTrashes((prevCards) =>
          prevCards.filter((ele) => ele.spaceid !== codespace.spaceid)
        );
        setSpaces((prevTrash) => [updatedCard, ...prevTrash]);
      } else {
        console.error("Error: codespace not found.");
      }
    } catch (error) {
      console.error("Error deleting codespace:", error);
    } finally {
      setisRestoring(false);
    }
  };

  const HandleWebSpaceRestore = async (codespace) => {
    try {
      setisRestoring(true);
      const updatedCard = {
        ...codespace,
        updatedAt: new Date(),
      };
      const cardQuery = query(
        collection(db, "webspacetrash"),
        where("spaceid", "==", codespace.spaceid)
      );
      const querySnapshot = await getDocs(cardQuery);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await addDoc(collection(db, "webspaces"), updatedCard);
        await deleteDoc(docRef);
        setWebTrashes((prevCards) =>
          prevCards.filter((ele) => ele.spaceid !== codespace.spaceid)
        );
        setWebSpaces((prevTrash) => [updatedCard, ...prevTrash]);
      } else {
        console.error("Error: codespace not found.");
      }
    } catch (error) {
      console.error("Error deleting codespace:", error);
    } finally {
      setisRestoring(false);
    }
  };

  const HandleCodeSpaceDelete = async (codespace) => {
    try {
      setisDeleting(true);
      const cardQuery = query(
        collection(db, "codespacetrash"),
        where("spaceid", "==", codespace.spaceid)
      );
      const querySnapshot = await getDocs(cardQuery);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const docData = querySnapshot.docs[0].data();
        await setDoc(doc(collection(db, "hiddencodespace")), docData);
        await deleteDoc(docRef);
        setCodeTrashes((trash) =>
          trash.filter((ele) => ele.spaceid !== codespace.spaceid)
        );
      } else {
        console.error("Error: codespace not found.");
      }
    } catch (error) {
      console.error("Error deleting codespace:", error);
    } finally {
      setisDeleting(false);
      setSearchPrompt("");
      setpromptLang("");
    }
  };

  const HandleWebSpaceDelete = async (codespace) => {
    try {
      setisDeleting(true);

      const cardQuery = query(
        collection(db, "webspacetrash"),
        where("spaceid", "==", codespace.spaceid)
      );
      const querySnapshot = await getDocs(cardQuery);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        const docData = querySnapshot.docs[0].data();

        await setDoc(doc(collection(db, "hiddenwebspace")), docData);

        await deleteDoc(docRef);

        setWebTrashes((trash) =>
          trash.filter((ele) => ele.spaceid !== codespace.spaceid)
        );
      } else {
        console.error("Error: codespace not found.");
      }
    } catch (error) {
      console.error("Error deleting codespace:", error);
    } finally {
      setisDeleting(false);
      setWebSearchPrompt("");
      setwebpromptLang("");
    }
  };

  const fetchUserTrash = async (name) => {
    const userTrashQuery = query(
      collection(db, name),
      where("userid", "==", user.uid)
    );
    return await getDocs(userTrashQuery);
  };

  const deleteAllUserTrash = async (snapshot, name) => {
    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    if (name == "codespacetrash") {
      setCodeTrashes([]);
    } else if (name == "webspacetrash") {
      setWebTrashes([]);
    }

    await batch.commit();
  };

  const HandleCodeTrashEmpty = async (name) => {
    setisDeleting(true);
    try {
      const userTrashSnapshot = await fetchUserTrash(name);
      if (!userTrashSnapshot.empty) {
        await deleteAllUserTrash(userTrashSnapshot, name);
        setisDeleteOpen(false);
      } else {
        console.error("Error: No trash items found for the user.");
      }
    } catch (error) {
      console.error("Error emptying trash:", error);
    } finally {
      setisDeleting(false);
    }
  };

  const handleErrorDegugging = async () => {
    setisGenerating(true);

    if (errorSuggesion) {
      setisGenerating(false);
      setisErrorOpen(true);
      return;
    }

    try {
      const history = [
        {
          role: "user",
          parts: [
            {
              text: '{\n    code:"import SwiftUI\n\nstruct ContentView: View {\n    var body: some View {\n        VStack {\n            Text("Hello, world!")\n                .padding()\n        }\n        .background(Color.gray)\n    }\n}\n\nstruct ContentView_Previews: PreviewProvider {\n    static var previews: some View {\n        ContentView()\n    }\n}",\nerror:"Error:\nfile0.code:1:8: error: no such module \'SwiftUI\'\nimport SwiftUI\n^",\nlanguage:"Swift"\n}',
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "The error \"no such module 'SwiftUI'\" in your Swift code indicates that the compiler cannot find the SwiftUI framework.  This is a common issue stemming from missing or incorrect project configuration. SwiftUI is a framework, not a built-in part of the Swift language itself.\n\n**Root Cause:**  Your Xcode project isn't properly linked to the SwiftUI framework. This can happen for several reasons:\n\n* **Missing Framework Import:** While you have `import SwiftUI`, Xcode needs to know where to find this framework. This is usually handled automatically when creating a SwiftUI project, but might be missing if you're working with a legacy project or have manually altered project settings.\n* **Incorrect Project Setup:**  Ensure your project is set up correctly for SwiftUI development. Check the project's build settings and targets to confirm the SwiftUI framework is included in the linked frameworks and libraries.\n* **Xcode Version:** SwiftUI requires a compatible Xcode version. Check that you're using a recent version that supports SwiftUI.\n\n**Fixes:**\n\n1. **Create a New SwiftUI Project:** The simplest solution is often to create a new SwiftUI project in Xcode. This ensures the correct frameworks and settings are automatically configured.  Then, carefully move your code into the new project.\n\n2. **Manually Add SwiftUI Framework:**  If creating a new project isn't feasible, in Xcode, go to your project settings, select the target, navigate to \"Frameworks, Libraries, and Embedded Content,\" and add the SwiftUI framework.\n\n3. **Clean and Rebuild:** After making any changes, perform a \"Clean Build Folder\" (Product > Clean Build Folder) followed by a rebuild to ensure Xcode refreshes its dependencies.\n\n\nBy addressing the framework linkage, the compiler will be able to locate SwiftUI and your code will compile successfully.\n",
            },
          ],
        },
        {
          role: "user",
          parts: [
            {
              text: '{\n    code:"// Getting Started with Java: A Simple "Hello, World!" Program\n// Time Complexity: O(1)\n// Space Complexity: O(1)\npublic class HelloWorld {\n\n    public static int addTwoValues(int a, int b) {\n        return a + b; //No optimization needed for simple addition\n    }\n\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n         sum = addTwoValues(5,3); //Example usage of addTwoValues\n        System.out.println("The sum is: " + sum); //No changes needed here, already efficient\n    }\n}",\nerror:"Error:\nfile0.code.java:12: error: cannot find symbol\nsum = addTwoValues(5,3); //Example usage of addTwoValues\n^\nsymbol: variable sum\nlocation: class HelloWorld\nfile0.code.java:13: error: cannot find symbol\nSystem.out.println("The sum is: " + sum); //No changes needed here, already efficient\n^\nsymbol: variable sum\nlocation: class HelloWorld\n2 errors\nerror: compilation failed",\nlanguage:"java"\n}',
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: 'The Java code has a compilation error because the variable `sum` is used without being declared.  The `addTwoValues` function calculates the sum, but the result isn\'t stored or used.\n\n**Root Cause:** The `sum` variable is referenced in the `main` method without a prior declaration.  Java requires variables to be declared before use.\n\n**Solution:**  Declare the `sum` variable before using it.  Since `addTwoValues` returns an `int`, `sum` should also be an `int`.\n\n**Corrected Code:**\n\n```java\npublic class HelloWorld {\n\n    public static int addTwoValues(int a, int b) {\n        return a + b; \n    }\n\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        int sum = addTwoValues(5,3); // Declare sum and assign the result\n        System.out.println("The sum is: " + sum); \n    }\n}\n```\n\nThis corrected code declares an integer variable named `sum`, assigns the return value of `addTwoValues` to it, and then uses it in the `println` statement.  This eliminates the "cannot find symbol" error.  The code will now compile and run correctly.\n',
            },
          ],
        },
      ];

      const CodeSetings = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/plain",
      };

      const chat = genAI
        .getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction:
            'You’re a skilled software engineer with extensive experience in code optimization and performance analysis. Your expertise lies in evaluating algorithms for both space and time complexity, and you have a knack for rewriting code to enhance efficiency without compromising functionality.\nYour task is to analyze the provided code, evaluate its current space and time complexity, and rewrite it to achieve a more optimized version by reducing unnecessary resource usage and minimizing execution time.\nPlease ensure to clearly state the initial complexity and the new complexity of the rewritten code. Include comments in the code explaining the optimizations made and how they impact performance. Return the final output in JSON format as follows:\n{\n  "code": "<optimized_code>",\n  "timeComplexity": "<new_time_complexity>",\n  "spaceComplexity": "<new_space_complexity>"\n}',
        })
        .startChat({
          setting: CodeSetings,
          history,
        });
      const result = await chat.sendMessage(
        JSON.stringify({
          code: editorContent,
          error: output,
          language: language,
        })
      );
      const data = await result.response.text();
      setErrorSuggesion(data);
      setisErrorOpen(true);
    } catch (error) {
      console.error("Error optimizing code:", error);
    } finally {
      setisGenerating(false);
    }
  };

  const HandleTheme = (e) => {
    const theme = e.target.value;

    if (["vs-light", "vs-dark"].includes(theme)) {
      setTheme(theme);
    } else {
      defineTheme(theme).then((_) => setTheme(theme));
    }
  };

  function handleEditorValidation(markers) {
    try {
      markers.forEach((marker) => console.log("onValidate:", marker.message));
    } catch (e) {
      console.log(e);
    }
  }

  const Loading = () => (
    <div className="flex bg-gray-200 items-center justify-center w-full h-full">
      <FaGear className="text-3xl animate-spin text-black" />
    </div>
  );

  const fetchSharedItems = async () => {
    try {
      setIsLoading(true);
      const itemsQuery = query(
        collection(db, "sharedspaces"),
        where("email", "==", user.email),
        orderBy("updatedAt", "desc")
      );

      const itemsSnapshot = await getDocs(itemsQuery);

      if (!itemsSnapshot.empty) {
        const itemsData = itemsSnapshot.docs.map((doc) => doc.data());

        const codespaceids = itemsData
          .filter((item) => item.type === "code")
          .map(({ spaceid, isEditorMode }) => ({ spaceid, isEditorMode }));

        const webspaceids = itemsData
          .filter((item) => item.type === "web")
          .map(({ spaceid, isEditorMode }) => ({ spaceid, isEditorMode }));

        // Fetch detailed data for codespaces and webspaces
        const [codespaceData, webspaceData] = await Promise.all([
          fetchDataForSpaces(codespaceids, "spaces"),
          fetchDataForSpaces(webspaceids, "webspaces"),
        ]);
        setIsLoading(false);
        return {
          codespaceData: codespaceData,
          webspaceData: webspaceData,
        };
      } else {
        console.warn("No shared items found.");
        setIsLoading(false);
        return {
          codespaceData: [],
          webspaceData: [],
        };
      }
    } catch (error) {
      console.error(`Error fetching shared items from :`, error);
      setIsLoading(false);
      throw error;
    }
  };

  const fetchDataForSpaces = async (spaceIds, collectionName) => {
    try {
      if (spaceIds.length === 0) return [];

      // Use a single query to fetch all data based on space IDs
      const spaceIdList = spaceIds.map(({ spaceid }) => spaceid);
      const dataQuery = query(
        collection(db, collectionName),
        where("spaceid", "in", spaceIdList)
      );

      const querySnapshot = await getDocs(dataQuery);

      // Combine query results with isEditorMode for each space
      return querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        const isEditorMode = spaceIds.find(
          ({ spaceid }) => spaceid === docData.spaceid
        )?.isEditorMode;
        return { ...docData, isEditorMode };
      });
    } catch (error) {
      console.error(`Error fetching data from ${collectionName}:`, error);
      throw error;
    }
  };

  const getSharedSpaces = async (id, type) => {
    try {
      setIsLoading(true);
      const sharedSpacesQuery = query(
        collection(db, "sharedspaces"),
        where("spaceid", "==", id),
        where("type", "==", type)
      );

      const querySnapshot = await getDocs(sharedSpacesQuery);

      if (!querySnapshot.empty) {
        const data = querySnapshot.docs.map((doc) => doc.data());
        return data;
      } else {
        return [];
      }
    } catch (err) {
      console.error("Error fetching shared spaces:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const AddNewSharedSpace = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || Object.keys(data).length < 1) {
          return reject(new Error("Object is empty. No space can be updated."));
        }
        await addDoc(collection(db, "sharedspaces"), data);
        resolve(true);
      } catch (error) {
        console.error("Error updating space:", error.message);
        reject(error);
      }
    });
  };

  const RevokeSpaceAccess = async (data) => {
    try {
      if (!data || Object.keys(data).length < 1) {
        throw new Error("Object is empty. No space can be updated.");
      }
      const cardQuery = query(
        collection(db, "sharedspaces"),
        where("email", "==", data.email),
        where("spaceid", "==", data.spaceid),
        where("userid", "==", data.userid)
      );

      const querySnapshot = await getDocs(cardQuery);

      if (querySnapshot.empty) {
        throw new Error("No space found with the provided ID.");
      }

      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Error revoking space access:", error.message);
      return false;
    }
  };

  const UpdateSpaceAccess = async (data) => {
    try {
      if (!data || Object.keys(data).length === 0) {
        throw new Error("Object is empty. No space can be updated.");
      }
      const cardQuery = query(
        collection(db, "sharedspaces"),
        where("email", "==", data.email),
        where("spaceid", "==", data.spaceid),
        where("userid", "==", data.userid)
      );

      const querySnapshot = await getDocs(cardQuery);

      if (querySnapshot.empty) {
        throw new Error("No space found with the provided ID.");
      }

      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, data);
      return true;
    } catch (error) {
      console.error("Error updating space access:", error.message);
      throw false;
    }
  };

  const getCodeTemplates = async () => {
    setIsFetching(true);
    try {
      const cardsQuery = query(
        collection(db, "codespacetemplates"),
        orderBy("heading", "asc")
      );
      const snapshot = await getDocs(cardsQuery);

      const fetchedTemplates = snapshot.docs.map((doc) => doc.data()) || [];
      setSpacesTemplates(
        fetchedTemplates.filter(
          (template) =>
            !spaces.some((space) => space.heading === template.heading)
        )
      );
    } catch (error) {
      console.error("Error fetching code templates:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const getWebTemplates = async () => {
    setIsFetching(true);
    try {
      const cardsQuery = query(
        collection(db, "webspacetemplates"),
        orderBy("heading", "asc")
      );
      const snapshot = await getDocs(cardsQuery);
      // setWebSpacesTemplates(snapshot.docs.map((doc) => doc.data()) || []);
      const fetchedTemplates = snapshot.docs.map((doc) => doc.data()) || [];
      setWebSpacesTemplates(fetchedTemplates);
    } catch (error) {
      console.error("Error fetching webtemplates:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleCodeTemplateAdd = async (item) => {
    setIsLoading(true);
    try {
      const videos = await searchNewYouTube(item.heading);
      const videoID = videos[0]?.id?.videoId;

      if (!videoID) {
        throw new Error("No valid video ID found for the given heading.");
      }

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

      console.log(item)

      const chat = genAI
        .getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction:
            'You’re a skilled software engineer with extensive experience in code optimization and performance analysis. Your expertise lies in evaluating algorithms for both space and time complexity, and you have a knack for rewriting code to enhance efficiency without compromising functionality.\nYour task is to analyze the provided code, evaluate its current space and time complexity, and rewrite it to achieve a more optimized version by reducing unnecessary resource usage and minimizing execution time.\nPlease ensure to clearly state the initial complexity and the new complexity of the rewritten code. Include comments in the code explaining the optimizations made and how they impact performance. Return the final output in JSON format as follows:\n{\n  "code": "<optimized_code>",\n  "timeComplexity": "<new_time_complexity>",\n  "spaceComplexity": "<new_space_complexity>"\n}',
        })
        .startChat({
          setting: CodeSetings,
        });
      const result = await chat.sendMessage(
        item.code +
          `optimize this code and Return the final output in JSON format as follows:\n{\n  "code": "<optimized_code>",\n  "timeComplexity": "<new_time_complexity>",\n  "spaceComplexity": "<new_space_complexity>"\n}`
      );
      const data = await result.response.text();
      const responseData = extractJsonObject(data);
      const optimizedCode = `${responseData.code}`;

      const newData = {
        ...item,
        code: optimizedCode,
        userid: user.uid,
        spaceid: uuidv4(),
        input: item.heading,
        lastinput: item.heading,
        notes: {},
        videos,
        videoID,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(collection(db, "spaces"), newData);

      setSpaces((prevSpaces) => [newData, ...prevSpaces]);
      setIsLoading(false);
      setIsTemplateOpen(false);

      navigate(`/dashboard/space/${newData.spaceid}`);
    } catch (error) {
      console.error("Error adding code template:", error.message, error);
      setIsLoading(false);
    }
  };

  const handleWebTemplateAdd = async (item) => {
    setIsLoading(true);
    try {
      const newData = {
        ...item,
        type: "html",
        userid: user.uid,
        spaceid: uuidv4(),
        input: item.heading,
        lastinput: item.heading,
        notes: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(collection(db, "webspaces"), newData);
      setWebSpaces((prevSpaces) => [newData, ...prevSpaces]);
      setIsWebTemplateOpen(false);
      navigate(`/dashboard/webspace/${newData.spaceid}`);
    } catch (error) {
      console.error("Error adding web template:", error.message, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewWebSpaceAdd = async (item) => {
    setIsLoading(true);
    try {
      const newData = {
        ...item,
        userid: user.uid,
        spaceid: uuidv4(),
        notes: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const data = {
        userid: user.uid,
        email: user.email,
        name: user.displayName,
        web: item.frameworks,
      };
      await addDoc(collection(db, "webspaces"), newData);
      const lang = await UpdateWeb(data);
      setWebSpaces((prevSpaces) => [newData, ...prevSpaces]);
      setIsLoading(false);
      navigate(`/dashboard/webspace/${newData.spaceid}`);
      setNewOpen(false);
    } catch (error) {
      console.error("Error adding web template1221:", error.message, error);
      setIsLoading(false);
    }
  };

  const handleNewSpaceAdd = async (item) => {
    setIsLoading(true);
    try {
      const newData = {
        ...item,
        userid: user.uid,
        spaceid: uuidv4(),
        notes: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const data = {
        userid: user.uid,
        email: user.email,
        name: user.displayName,
        language: item.language,
      };
      await addDoc(collection(db, "spaces"), newData);
      const lang = await UpdateLanguage(data);
      setSpaces((prevSpaces) => [newData, ...prevSpaces]);
      setIsLoading(false);
      navigate(`/dashboard/space/${newData.spaceid}`);
      setNewOpen(false);
    } catch (error) {
      console.error("Error adding code template:", error.message, error);
      setIsLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        isSaving,
        setisSaving,
        setProfile,
        profile,
        getUserDetails,
        isHamOpen,
        setIsHamOpen,
        reloadSpaces,
        setReloadSpaces,
        isWebTemplateOpen,
        setIsWebTemplateOpen,
        isTemplateOpen,
        setIsTemplateOpen,
        handleNewSpaceAdd,
        handleNewWebSpaceAdd,
        newOpen,
        setNewOpen,
        conversation,
        setConversation,
        isCodeOpen,
        setisCodeOpen,
        notes,
        setNotes,
        handleWebTemplateAdd,
        handleCodeTemplateAdd,
        getWebTemplates,
        getCodeTemplates,
        spacestemplates,
        webspacestemplates,
        setSpacesTemplates,
        setWebSpacesTemplates,
        searchYouTube,
        isOptimized,
        setisOptimized,
        setReloadShared,
        reloadShared,
        sharedcodeSpace,
        sharedwebSpace,
        setSharedcodeSpace,
        setSharedwebSpace,
        UpdateSpaceAccess,
        RevokeSpaceAccess,
        AddNewSharedSpace,
        getSharedSpaces,
        fetchSharedItems,
        HandleWebSpaceRestore,
        HandleWebSpaceDelete,
        getWebTrashes,
        handleWebChatSubmission,
        debounceWebTimeout,
        UpdateWebExistingSpace,
        webspaceid,
        setWebSpaceid,
        Type,
        setType,
        UpdateExistingSpace,
        Loading,
        handleEditorValidation,
        isFullScreen,
        setIsFullscreen,
        isShareOpen,
        setisShareOpen,
        HandleTheme,
        CodeShared,
        setCodeShared,
        framework,
        setFramework,
        htmlCode,
        cssCode,
        jsCode,
        setCssCode,
        setJsCode,
        setHtmlCode,
        handleNewWebSubmission,
        isWebLoading,
        setIsWebLoading,
        webprompt,
        setWebPrompt,
        webresults,
        setWebResults,
        setisWebSpaceDeleting,
        isWebSpaceDeleting,
        handleDeleteWebSpace,
        websearchPrompt,
        setWebSearchPrompt,
        webpromptLang,
        setwebpromptLang,
        webTrashes,
        setWebTrashes,
        results,
        setResults,
        handleErrorDegugging,
        isErrorOpen,
        setisErrorOpen,
        errorSuggesion,
        isErrorOccured,
        setisErrorOccured,
        searchPrompt,
        promptLang,
        setpromptLang,
        setSearchPrompt,
        isDeleteOpen,
        setisDeleteOpen,
        HandleCodeTrashEmpty,
        isDeleting,
        setisDeleting,
        isRestoring,
        setisRestoring,
        HandleCodeSpaceRestore,
        HandleCodeSpaceDelete,
        getWebSpaces,
        setWebSpaces,
        webspaces,
        getCodeTrashes,
        setCodeTrashes,
        codeTrashes,
        isCodeSpaceDeleting,
        handleDeleteCodeSpace,
        NewUserCloud,
        getSpaces,
        setIsFetching,
        isFetching,
        setPrompt,
        prompt,
        handleChange,
        handleChatSubmission,
        handleNewSubmission,
        onSwap,
        handleCodeExecute,
        handleOptimizer,
        copyOutputToClipboard,
        copyToClipboard,
        isDropdownOpen,
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
        setisGenerating,
        setSpaces,
        spaces,
        setSpaceid,
        spaceid,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
