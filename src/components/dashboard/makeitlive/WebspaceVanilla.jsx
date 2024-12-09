import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Frameworks } from '../../../constants';
import { db } from '../../../config/firebase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

function WebspaceVanilla() {
    const { id } = useParams();
    const { setIsLoading } = useData();
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [framework, setFramework] = useState('css');
    const iframeRef = useRef(null);

    useEffect(() => {
        const fetchWebspaceData = async (userId) => {
            setIsLoading(true);
            try {
                const webspacesQuery = query(
                    collection(db, 'webspaces'),
                    where('spaceid', '==', userId),
                    orderBy('updatedAt', 'desc')
                );
                const snapshot = await getDocs(webspacesQuery);

                if (!snapshot.empty) {
                    const data = snapshot.docs[0].data();
                    setHtml(data.htmlCode || '');
                    setCss(data.cssCode || '');
                    setJs(data.jsCode || '');
                    setFramework(data.frameworks || 'css');
                } else {
                    console.warn('No webspaces found for the given user ID.');
                }
            } catch (error) {
                console.error('Error fetching webspace data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchWebspaceData(id);
        }
    }, [id, setIsLoading]);


    useEffect(() => {
        if (iframeRef.current) {
            try {
                const iframeDocument = iframeRef.current.contentDocument;
                const iframeContent = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        ${framework !== 'css' ? Frameworks[framework]?.cdn || '' : ''}
                        <style>${css}</style>
                    </head>
                    <body>
                        ${html}
                        <script>
                            try {
                                ${js}
                            } catch (err) {
                                console.error('JavaScript Execution Error:', err);
                            }
                        </script>
                    </body>
                    </html>
                `;

                iframeDocument.open();
                iframeDocument.write(iframeContent);
                iframeDocument.close();
            } catch (error) {
                console.error('Error rendering iframe content:', error);
            }
        }
    }, [html, css, js, framework]);

    return (
        <iframe
            ref={iframeRef}
            title="Preview"
            className="w-full min-h-screen overflow-auto"
            allow="accelerometer *; bluetooth *; camera *; encrypted-media *; display-capture *; geolocation *; gyroscope *; microphone *; midi *; clipboard-read *; clipboard-write *; web-share *; serial *; xr-spatial-tracking *"
            allowFullScreen
            allowPaymentRequest
            allowTransparency
            sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups-to-escape-sandbox allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            name="Preview"
            loading="lazy"
        />
    );
}

export default WebspaceVanilla;
