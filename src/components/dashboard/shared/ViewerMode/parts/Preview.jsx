import React, { useEffect, useRef, useState } from "react";
import { useData } from "../../../../context/DataContext";
import { FaCodepen } from "react-icons/fa";
import * as Avatar from "@radix-ui/react-avatar";
import { Frameworks } from "../../../../../constants";
import { Link } from "react-router-dom";
import { RiFullscreenExitLine, RiFullscreenFill, RiRefreshLine } from "react-icons/ri";
import * as Tooltip from "@radix-ui/react-tooltip";

const Preview = ({ html, css, js, framework }) => {
    const { isFullScreen, setIsFullscreen, isCodeOpen } = useData();
    const [reloadFlag, setReloadFlag] = useState(false);
    const iframeRef = useRef(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, [setIsFullscreen, isCodeOpen]);

    const toggleFullScreen = () => {
        const codespaceElement = document.getElementById("sharedwebspace");

        if (!document.fullscreenElement) {
            codespaceElement?.requestFullscreen().catch((err) =>
                console.error("Error entering fullscreen:", err)
            );
        } else {
            document.exitFullscreen().catch((err) =>
                console.error("Error exiting fullscreen:", err)
            );
        }
    };

    // Load the content in iframe
    useEffect(() => {
        try {
            if (iframeRef.current) {
                const iframeDocument = iframeRef.current.contentDocument;
                const iframeContent = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        ${framework !== "css" ? Frameworks[framework]?.cdn : ""}
                        <style>${css}</style>
                    </head>
                    <body>
                        ${html}
                        <script>
                            try {
                                ${js}
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
            }
        }
        catch (err) {
            console.log(err)
        }
    }, [html, css, js, framework, reloadFlag]);

    return (
        <div className="h-full w-full bg-gray-50 border rounded shadow flex flex-col">
            {/* Header Section */}
            <div className="px-2 py-2 flex w-full items-center justify-between gap-2 border-b bg-gray-100 text-gray-600 font-semibold">
                <div className="flex items-center gap-2">
                    <FaCodepen className="ms-2" /> Live Preview
                </div>
                <div className="flex items-center gap-2">
                    {framework && (
                        <Tooltip.Provider>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <Link target="_blank" to={Frameworks[framework]?.link}>
                                        <Avatar.Root className="inline-flex size-8 select-none items-center justify-center overflow-hidden rounded-md align-middle">
                                            <Avatar.Image
                                                src={Frameworks[framework]?.image}
                                                alt={framework}
                                                className="size-full object-cover rounded-md"
                                            />
                                            <Avatar.Fallback
                                                delayMs={600}
                                                className="leading-1 uppercase flex size-full items-center justify-center text-[15px] font-medium text-black"
                                            >
                                                {framework.slice(0, 2)}
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                    </Link>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        className="select-none rounded bg-white capitalize px-[15px] py-2.5 text-[15px] leading-none text-black/80 shadow-md"
                                        sideOffset={10}
                                        side="bottom"
                                    >
                                        {framework} CSS Framework Added
                                        <Tooltip.Arrow className="fill-gray-400" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Tooltip.Provider>
                    )}
                    <button
                        onClick={() => setReloadFlag((prev) => !prev)}
                        className="p-2 bg-gray-200 rounded-md transition-all active:scale-95"
                    >
                        <RiRefreshLine className="text-gray-700 text-lg transition-transform active:rotate-90" />
                    </button>
                    <button
                        onClick={toggleFullScreen}
                        className="bg-gray-200 p-2 rounded-md active:scale-90 transition-all"
                    >
                        {isFullScreen ? (
                            <RiFullscreenExitLine className="text-lg text-gray-700" />
                        ) : (
                            <RiFullscreenFill className="text-lg text-gray-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Iframe Section */}
            <div className="h-full w-full overflow-auto">
                <iframe
                    ref={iframeRef}
                    title="Preview"
                    className="w-full min-h-full overflow-auto"
                    sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups-to-escape-sandbox allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                    allow="accelerometer *; bluetooth *; camera *; encrypted-media *; display-capture *; geolocation *; gyroscope *; microphone *; midi *; clipboard-read *; clipboard-write *; web-share *; serial *; xr-spatial-tracking *"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default Preview;
