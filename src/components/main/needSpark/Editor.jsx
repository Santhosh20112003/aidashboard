import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Delimiter from "@editorjs/delimiter";
import Quote from "@editorjs/quote";
import Title from "title-editorjs";
import Alert from "editorjs-alert";
import MermaidTool from "editorjs-mermaid";
import EJLaTeX from "editorjs-latex";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import ChangeCase from "editorjs-change-case";
import TextVariantTune from "@editorjs/text-variant-tune";
import CodeTool from "@editorjs/code";
import IndentTune from "editorjs-indent-tune";
import Checklist from "@editorjs/checklist";
import { IoCloudOfflineSharp } from "react-icons/io5";
import { IoMdCloudDone } from "react-icons/io";
import toast from "react-hot-toast";

function NoteBookEditor() {
    const editorRef = useRef(null);
    const [editorInstance, setEditorInstance] = useState(null);
    const [editorData, setEditorData] = useState({});
    const [cloudSync, setCloudSync] = useState(true);


    useEffect(() => {
        if (editorRef.current) {
            const newEditor = new EditorJS({
                holder: "editorjs",
                autofocus: true,
                tools: {
                    title: { class: Title, shortcut: "alt+h", inlineToolbar: true },
                    delimiter: { class: Delimiter, shortcut: "alt+d" },
                    inlineCode: { class: InlineCode },
                    checklist: { class: Checklist, inlineToolbar: true },
                    code: { class: CodeTool, shortcut: "alt+c" },
                    list: {
                        class: List,
                        inlineToolbar: true,
                        shortcut: "alt+l",
                        config: { defaultStyle: "unordered" },
                    },
                    underline: { class: Underline, shortcut: "alt+u" },
                    marker: { class: Marker, shortcut: "alt+v" },
                    changeCase: {
                        class: ChangeCase,
                        config: { showLocaleOption: true, locale: "tr" },
                        shortcut: "alt+c",
                    },
                    textVariant: TextVariantTune,
                    indentTune: { class: IndentTune, inlineToolbar: true, shortcut: "alt+x" },
                    quote: {
                        class: Quote,
                        inlineToolbar: true,
                        shortcut: "alt+q",
                        config: {
                            quotePlaceholder: "Enter a quote",
                            captionPlaceholder: "Quote's author",
                        },
                    },
                    mermaid: { class: MermaidTool, shortcut: "alt+g" },
                    alert: { class: Alert, shortcut: "alt+a" },
                    math: { class: EJLaTeX, shortcut: "alt+m" },
                },
                data: editorData,
                onChange: async () => {
                    try {
                        setCloudSync(true);
                        const savedData = await newEditor.save();
                        setEditorData(savedData);
                        setCloudSync(false);
                    } catch (error) {
                        console.error("Error saving content:", error);
                        toast.error("Failed to save content");
                    }
                },
            });
            setEditorInstance(newEditor);
        }
        return () => {
            if (editorInstance) {
                editorInstance.destroy();
            }
        };
    }, []);

    return (
        <div className="bg-white rounded-lg w-full h-full">
            <div className="w-full h-[10vh] px-4 rounded-t-lg bg-main flex items-center justify-between gap-3">
                <h1
                    className="text-lg text-white bg-main rounded-md px-4 py-2 font-bold cursor-pointer"
                >
                    SpaceNotes
                </h1>
                <div className="flex items-center gap-3">
                    <button className=" p-1.5 bg-gray-100 rounded-lg active:scale-90 transition-all">
                        {cloudSync ? <IoCloudOfflineSharp title="data not synced with cloud" className="text-xl md:text-2xl text-yellow-600" /> : <IoMdCloudDone title="data synced with cloud" className="text-xl md:text-2xl text-green-600" />}
                    </button>
                </div>
            </div>
            <div
                ref={editorRef}
                id="editorjs"
                className="w-full rounded-b-lg h-[90%] bg-slate-100 relative text-main placeholder:text-main overflow-y-auto px-4 py-3"
            />
        </div>
    );
}

export default NoteBookEditor;
