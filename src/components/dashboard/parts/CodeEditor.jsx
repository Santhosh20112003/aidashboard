import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ language, editorContent, handleChange, theme }) => {
    const editorOptions = {
        automaticLayout: true,
        fontSize: 18,
        fontFamily: "cursive",
        fontLigatures: true,
        lineNumbers: "on",
        minimap: { enabled: true },
        scrollbar: {
            verticalScrollbarSize: 20,
            horizontalScrollbarSize: 10,
        },
        tabSize: 4,
        insertSpaces: true,
        formatOnType: true,
        formatOnPaste: true,
        wordWrap: "on",
        scrollBeyondLastLine: false,
        renderLineHighlight: "all",
        readOnly: false,
        cursorBlinking: "smooth",
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        parameterHints: { enabled: true },
        folding: true,
        occurrencesHighlight: true,
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        guides: {
            indentation: true,
            highlightActiveBracketPair: true,
        },
        bracketPairColorization: { enabled: true },
    };

    return (
        <Editor
            height="55vh"
            language={language}
            value={editorContent}
            options={editorOptions}
            theme={theme}
            onChange={handleChange}
        />
    );
};

export default CodeEditor;
