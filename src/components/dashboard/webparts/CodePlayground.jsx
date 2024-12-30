import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useData } from "../../context/DataContext";
import * as Popover from "@radix-ui/react-popover";
import { RiSettingsLine } from "react-icons/ri";
import { PiEmptyBold } from "react-icons/pi";
import toast from "react-hot-toast";
import { FrameworksArray, monacoThemes } from "../../../constants";
import '../LoadSpace/editor.css';
import { emmetHTML, emmetCSS } from "emmet-monaco-es";
import { SiPrettier } from "react-icons/si";

function CodePlayground({ htmlCode, cssCode, jsCode, framework }) {
    const editorRef = useRef(null);
    const [activeTab, setActiveTab] = useState("HTML");
    const {
        setisSaving,
        Loading,
        isFullScreen,
        setFramework,
        setHtmlCode,
        setCssCode,
        setJsCode,
        theme,
        HandleTheme,
        handleEditorValidation,
        debounceWebTimeout,
        webspaceid,
        setWebSpaces,
        UpdateWebExistingSpace,
        isCodeOpen
    } = useData();

    const files = {
        "HTML": { name: "index.html", language: "html", value: htmlCode, title: "HTML" },
        "CSS": { name: "style.css", language: "css", value: cssCode, title: "CSS" },
        "JS": { name: "script.js", language: "javascript", value: jsCode, title: "JS" },
    };

    const file = files[activeTab];

    useEffect(() => {
        editorRef.current?.focus();
    }, [file.name]);

    const handleFrameworkChange = async (item) => {
        setisSaving(true);
        if (item.name === framework) return;

        try {
            const updateData = {
                spaceid: webspaceid,
                frameworks: item.name,
                updatedAt: new Date(),
            };

            const response = await UpdateWebExistingSpace(updateData);

            if (!response) {
                console.error("Unable to upload to Cloud");
                toast.error("Failed to update the framework on the server.");
                return;
            }

            setFramework(item.name);
            setWebSpaces((prevWebspaces) =>
                prevWebspaces.map((space) =>
                    space.spaceid === webspaceid
                        ? { ...space, frameworks: item.name }
                        : space
                )
            );

            toast.success(`${item.name} has been applied to your WebSpace.`);
            setisSaving(false);
        } catch (error) {
            console.error("Error changing framework:", error);
            toast.error("Unable to change the CSS framework.");
        }
    };

    const editorOptions = {
        automaticLayout: false,
        fontSize: 18,
        fontLigatures: true,
        lineNumbers: "on",
        minimap: { enabled: true },
        wordWrap: "off",
        scrollBeyondLastLine: false,
        renderLineHighlight: "all",
        cursorBlinking: "smooth",
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        folding: true,
        bracketPairColorization: { enabled: true },
        guides: {
            indentation: true,
            highlightActiveBracketPair: true,
        },
    };

    const FrameworkDropdown = () => {
        const webspaceElement = document.getElementById('webspace');
        return (
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button className="cursor-pointer frameworks-t active:scale-95 transition-all">
                        <RiSettingsLine className="text-xl text-black/80" />
                    </button>
                </Popover.Trigger>
                <Popover.Portal container={webspaceElement} >
                    <Popover.Content sideOffset={10} side="bottom" className="w-[200px]  rounded bg-white p-5 shadow-md z-50">
                        <div className="flex flex-col gap-2.5">
                            <div className="mb-2.5 text-[15px] font-medium">CSS Frameworks</div>
                            <div className="grid gap-3 place-items-center grid-cols-3">
                                <button
                                    onClick={() => setFramework("css")}
                                    className={`bg-gray-100 p-2.5 rounded-md ${framework === "css" ? "border border-gray-400" : ""
                                        }`}
                                >
                                    <PiEmptyBold className="text-xl text-gray-500" />
                                </button>
                                {FrameworksArray.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleFrameworkChange(item)}
                                        className={`bg-gray-50 p-0.5 rounded-md ${item?.name === framework
                                            ? "border border-gray-400"
                                            : "grayscale"
                                            }`}
                                    >
                                        <img
                                            src={item?.logo || "https://via.placeholder.com/50"}
                                            alt={item?.name}
                                            className="w-10 rounded-md"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Popover.Arrow className="fill-gray-300" />
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        )
    };

    useEffect(() => {
        const resizeEditor = () => {
            if (editorRef.current) {
                editorRef.current.layout();
            }
        };

        window.addEventListener("resize", resizeEditor);

        return () => {
            window.removeEventListener("resize", resizeEditor);
        };
    }, []);

    useEffect(() => {
        const resizeEditor = () => {
            if (editorRef.current) {
                editorRef.current.layout();
            }
        };
        resizeEditor();
    }, [isFullScreen, isCodeOpen])

    const handleWebChange = (value) => {
        setisSaving(true);
        switch (file.language) {
            case "html":
                setHtmlCode(value || "");
                break;
            case "css":
                setCssCode(value || "");
                break;
            case "javascript":
                setJsCode(value || "");
                break;
            default:
                break;
        }
        clearTimeout(debounceWebTimeout.current);
        debounceWebTimeout.current = setTimeout(async () => {
            try {
                const updateData = {
                    spaceid: webspaceid,
                    htmlCode: file.language === "html" ? value : htmlCode,
                    cssCode: file.language === "css" ? value : cssCode,
                    jsCode: file.language === "javascript" ? value : jsCode,
                    updatedAt: new Date(),
                };

                const response = await UpdateWebExistingSpace(updateData);

                if (!response) {
                    console.error("Unable to upload to Cloud");
                    return;
                }

                setWebSpaces((prevWebspaces) =>
                    prevWebspaces.map((item) =>
                        item.spaceid === webspaceid
                            ? {
                                ...item,
                                htmlCode: updateData.htmlCode,
                                cssCode: updateData.cssCode,
                                jsCode: updateData.jsCode,
                            }
                            : item
                    )
                );
            } catch (error) {
                console.error("Error updating webspace:", error);
            }
            finally {
                setisSaving(false);
            }
        }, 3000);
    };


    const renderEditor = () => (
        <Editor
            onValidate={handleEditorValidation}
            language={file.language}
            value={file.value}
            onMount={(editor) => {
                emmetHTML(window.monaco);
                emmetCSS(window.monaco);
                editorRef.current = editor;
                editorRef.current.getAction('editor.action.formatDocument').run()
                editor.layout();
            }}
            loading={<Loading />}
            theme={theme}
            options={editorOptions}
            onChange={handleWebChange}
        />
    );

    return (
        <div
            className={`${isFullScreen ? "h-[83vh]" : "h-[70vh]"
                } bg-gray-100 border editor-t border-gray-100 rounded-md`}
        >
            <div className="flex items-center justify-between border-b h-[50px] bg-slate-50">
                <div className="flex code-t">
                    {Object.keys(files).map((tab) => (
                        <button
                            key={tab}
                            className={`md:px-6 md:py-3 md:text-base text-sm px-3 py-3 font-normal hover:bg-gray-100 ${activeTab === tab
                                ? "text-black font-semibold border-b-2 border-black"
                                : "text-gray-500"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.split(".")[0].toUpperCase()}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 px-3">
                    <select
                        className="p-1 mode-t bg-gray-50 w-[100px] md:w-[150px] rounded-md border border-gray-200"
                        onChange={HandleTheme}
                        value={theme}
                    >
                        <option value="vs-light">Light mode</option>
                        <option value="vs-dark">Dark mode</option>
                        {Object.entries(monacoThemes).map(([themeId, themeName]) => (
                            <option key={themeId} value={themeId}>
                                {themeName}
                            </option>
                        ))}
                    </select>
                    <button className="ms-3 formatter-t" onClick={() => {
                        editorRef.current.getAction('editor.action.formatDocument').run()
                    }} >
                        <SiPrettier />
                    </button>
                    {FrameworkDropdown()}
                </div>
            </div>

            <div style={{
                position: "relative",
                overflow: "hidden",
            }} className={`bg-gray-200 rounded-b-md ${isFullScreen ? 'h-[77vh]' : 'h-[90%]'} `}>{renderEditor()}</div>
        </div>
    );
}

export default CodePlayground;
