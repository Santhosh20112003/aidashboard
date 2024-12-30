import { useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { useData } from "../../context/DataContext";

const CodeEditor = ({ editorReference, language, editorContent, handleChange, theme }) => {
    const debounceTimeout = useRef(null);
    const latestContent = useRef(editorContent);
    const { setisSaving, isCodeOpen, Loading, handleEditorValidation, isFullScreen } = useData();

    const DEBOUNCE_TIME = 3000;

    const handleEditorChange = (value) => {
        setisSaving(true);
        latestContent.current = value;

        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            handleChange(latestContent.current);
            setisSaving(false);
        }, DEBOUNCE_TIME);
    };

    const resizeTimeout = useRef(null);

    const resizeEditor = () => {
        if (editorReference.current) {
            editorReference.current.layout();
        }
    };

    useEffect(() => {
        const debouncedResize = () => {
            clearTimeout(resizeTimeout.current);
            resizeTimeout.current = setTimeout(resizeEditor, 100); // Debounce resize
        };
        window.addEventListener("resize", debouncedResize);
        return () => window.removeEventListener("resize", debouncedResize);
    }, []);

    useEffect(() => {
        if (editorReference.current && editorContent) {
            editorReference.current.getAction('editor.action.formatDocument').run();
        }
    }, [editorContent]);

    useEffect(() => {
        resizeEditor(); // Ensure layout on fullscreen toggle
    }, [isFullScreen, isCodeOpen]);

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

    return (
        <div
            className={`${isFullScreen ? 'h-[60vh] pt-1' : 'h-[55vh]'} editor-t rounded-lg`}
            style={{
                position: "relative",
                overflow: "hidden",
                height: isFullScreen ? "60vh" : "55vh",
            }}
        >
            <Editor
                onValidate={handleEditorValidation}
                language={language}
                value={editorContent}
                theme={theme}
                loading={<Loading />}
                onMount={(editor) => {
                    editorReference.current = editor;
                    editor.layout();
                }}
                onChange={handleEditorChange}
                options={editorOptions}
            />
        </div>
    );
};

export default CodeEditor;
