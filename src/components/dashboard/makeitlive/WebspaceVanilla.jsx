import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext';
import { Frameworks } from '../../../constants';

function WebspaceVanilla() {
    const { id } = useParams();
    const { htmlCode, cssCode, jsCode, framework } = useData();
    const iframeRef = useRef(null);

    useEffect(() => {
        const iframeDocument = iframeRef.current.contentDocument;
        const iframeContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <style>
                    ${cssCode}
                </style>
            </head>
            <body>
                ${htmlCode}
                <script>
                    try {
                        ${jsCode}
                    } catch (err) {
                        console.error('JavaScript Error:', err);
                    }
                </script>
            </body>
            </html>
        `;
        iframeDocument.open();
        iframeDocument.write(iframeContent);
        iframeDocument.close();

        // // Adjust iframe height dynamically based on content
        // const adjustIframeHeight = () => {
        //     if (iframeRef.current) {
        //         const iframeBody = iframeRef.current.contentDocument.body;
        //         iframeRef.current.style.height = `${iframeBody.scrollHeight}px`;
        //     }
        // };

        // // Adjust height initially and on changes
        // adjustIframeHeight();
        // iframeRef.current.contentWindow.addEventListener("resize", adjustIframeHeight);

        // return () => {
        //     iframeRef.current.contentWindow.removeEventListener("resize", adjustIframeHeight);
        // };
    }, [htmlCode, cssCode, jsCode, framework]);

    return (
        <iframe
            ref={iframeRef}
            title="Preview"
            className="w-full min-h-full overflow-auto"
            allow="accelerometer *; bluetooth *; camera *; encrypted-media *; display-capture *; geolocation *; gyroscope *; microphone *; midi *; clipboard-read *; clipboard-write *; web-share *; serial *; xr-spatial-tracking *"
            allowfullscreen="true"
            allowpaymentrequest="true"
            allowtransparency="true"
            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups-to-escape-sandbox allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            name="Preview"
            loading="lazy"
        />
    )
}

export default WebspaceVanilla