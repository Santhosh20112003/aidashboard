import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import CodePlayground from './parts/CodePlayground';
import { Toaster } from 'react-hot-toast';
import Preview from './parts/Preview';

function WebViewerMode() {
  const { id } = useParams();
  const { sharedwebSpace, reloadShared, setReloadShared } = useData();
  const navigate = useNavigate();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [framework, setFramework] = useState("css");
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadSpaceData = () => {
      try {
        const res = sharedwebSpace.find((item) => item.spaceid === id);
        if (!res?.isEditorMode) {
          console.log(res)
          setHtml(res.htmlCode);
          setCss(res.cssCode);
          setJs(res.jsCode);
          setFramework(res.frameworks);
          setData(res);
        }
        else {
          setReloadShared(!reloadShared);
          loadSpaceData();
          setData(null);
        }
      } catch (err) {
        console.log(err);
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
        <CodePlayground html={html} css={css} js={js} setHtml={setHtml} setCss={setCss} setJs={setJs} framework={framework} setFramework={setFramework} />
      </div>
      <div className={`w-1/2 md:block hidden h-full`}>
        <Preview html={html} css={css} js={js} framework={framework} />
      </div>
      <Toaster />
    </div>
  )
}

export default WebViewerMode