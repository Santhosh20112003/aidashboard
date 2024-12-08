import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import ChatInput from './parts/ChatInput'
import CodePlayground from './parts/CodePlayground'
import Preview from './parts/Preview'
import { useNavigate, useParams } from 'react-router-dom'
import { useData } from '../../../context/DataContext'
import { useUserAuth } from '../../../context/UserAuthContext'

function LoadWebSpace() {
  const { id } = useParams();
  const { user } = useUserAuth();
  const {
    setHeading,
    setExplanation,
    setFramework,
    setLastInput,
    sharedwebSpace,
    setInput,
    setWebSpaceid,
    setType,
    Type,
    input,
    isLoading,
    htmlCode,
    cssCode,
    jsCode,
    framework,
    setHtmlCode,
    setCssCode,
    setJsCode,
    setCodeShared,
    setReloadShared,
    reloadShared
  } = useData();

  const navigate = useNavigate();
  const [data, setData] = useState(null);
 
  useEffect(() => {
    const loadSpaceData = () => {
      try {
        const res = sharedwebSpace.find((item) => item.spaceid === id);
        if (res?.isEditorMode) {
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
        } else {
          setReloadShared(!reloadShared);
          loadSpaceData();
          setData(null);
        }
      }
      catch (err) {
        console.log(err)
      }
    };

    loadSpaceData();
  }, [id, sharedwebSpace]);

  if (!data) {
    return <div className="w-full h-screen flex items-center justify-center">Loading or no space found...</div>;
  }

  return (
    <div id="sharedwebspace" className="w-full h-[90vh] px-4 pb-2 pt-2 bg-white flex space-x-4">
      <div className={`md:w-1/2 w-full h-full space-y-4`}>
        <CodePlayground htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} framework={framework} />
        <ChatInput input={input} setInput={setInput} handleWebChatSubmission={() => { }} isLoading={isLoading} />
      </div>
      <div className={`w-1/2 md:block hidden h-full`}>
        <Preview htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} framework={framework} />
      </div>
      <Toaster />
    </div>
  )
}

export default LoadWebSpace