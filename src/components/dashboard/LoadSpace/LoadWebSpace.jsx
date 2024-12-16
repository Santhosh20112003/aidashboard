import React, { useEffect, useState } from 'react'
import ChatInput from '../webparts/ChatInput'
import CodePlayground from '../webparts/CodePlayground'
import Preview from '../webparts/Preview'
import { useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'

function LoadWebSpace() {
    const { id } = useParams();
    const {
        setHeading,
        setExplanation,
        setFramework,
        setLastInput,
        webspaces,
        setInput,
        setWebSpaceid,
        setType,
        Type,
        input,
        isLoading,
        htmlCode, cssCode, jsCode, framework,
        setHtmlCode,
        setCssCode,
        setJsCode,
        setCodeShared,
    } = useData();
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadSpaceData = () => {
            try {
                const res = webspaces.find((item) => item.spaceid === id);
                setHeading(res?.heading);
                setWebSpaceid(res?.spaceid);
                setInput(res?.input);
                setLastInput(res?.lastinput);
                setExplanation(res?.explanation);
                setType(res?.type);
                setFramework(res?.frameworks);
                setHtmlCode(res?.htmlCode);
                setCssCode(res?.cssCode);
                setJsCode(res?.jsCode);
                setCodeShared(res?.shared);
                setData(res || null);
            }
            catch (err) {
                console.log(err);
            }
        };

        loadSpaceData();
    }, [id, webspaces]);

    if (!data) {
        return <div className="w-full h-screen flex items-center justify-center">Loading or no space found...</div>;
    }

    return (
        <div id="webspace" className="w-full h-[90vh] px-4 pb-2 pt-2 bg-white flex space-x-4">
            <div className={`md:w-1/2 w-full h-full space-y-4`}>
                <CodePlayground htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} framework={framework} />
                <ChatInput input={input} setInput={setInput} handleWebChatSubmission={() => { }} isLoading={isLoading} />
            </div>
            <div className={`w-1/2 md:block hidden h-full`}>
                <Preview htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} framework={framework} />
                {/* <Console /> */}
            </div>
            {/* <Toaster /> */}
        </div>
    )
}

export default LoadWebSpace