import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../config/firebase";

const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [input, setInput] = useState("");
  const [videos, setVideos] = useState(null);
  const [open, setOpen] = useState(false);
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
  const [isGenerating, setisGenerating] = useState(false);

  return (
    <DataContext.Provider
      value={{
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
