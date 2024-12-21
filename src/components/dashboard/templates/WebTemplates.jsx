import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { LANGUAGE_VERSIONS } from "../../../constants";
import { getUniqueWebLanguages } from "../../../common/methods";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import { Toaster } from "react-hot-toast";
import { PiEmptyBold } from "react-icons/pi";
import { FaFilter } from "react-icons/fa6";

const WebTemplates = () => {
    const {
        setpromptLang,
        setSearchPrompt,
        searchPrompt,
        promptLang,
        webspacestemplates,
        results,
        setResults,
        isLoading,
        handleWebTemplateAdd
    } = useData();

    const availableLangs = getUniqueWebLanguages(webspacestemplates);

    useEffect(() => {
        filterSpaces();
    }, [searchPrompt, promptLang, webspacestemplates]);

    const filterSpaces = () => {
        let filtered = webspacestemplates;

        if (searchPrompt) {
            filtered = filtered.filter(
                (space) =>
                    space.heading.toLowerCase().includes(searchPrompt.toLowerCase()) ||
                    space.frameworks.toLowerCase().includes(searchPrompt.toLowerCase())
            );
        } else if (promptLang?.trim()) {
            filtered = filtered.filter((space) => space.frameworks === promptLang);
        }

        setResults(filtered);
    };


    const renderSpaceCard = (space) => (
        <div key={space.heading} className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition">
            <Dialog.Root >
                <Dialog.Trigger asChild>
                    <img src={LANGUAGE_VERSIONS[space.frameworks]?.banner || "https://via.placeholder.com/50"} alt={space.frameworks} className="w-full h-32 cursor-pointer shadow-md rounded-lg mb-3 active:scale-95 transition-all" />
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[80vh] w-[90vw] max-w-[1000px] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md focus:outline-none p-6 z-50">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 flex justify-center items-center">
                                <img
                                    src={LANGUAGE_VERSIONS[space.frameworks]?.banner || "https://via.placeholder.com/50"}
                                    alt={space.frameworks}
                                    className="rounded-lg w-full h-36 md:h-72 object-center object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col">
                                <h1 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">Add this to Your WebSpace</h1>
                                <h2 className="text-lg font-medium line-clamp-1 text-gray-800">{space.heading}</h2>
                                <p className="text-gray-500 line-clamp-4 font-normal mb-3">{space.explanation}</p>
                                <div className="flex items-center justify-start gap-3">
                                    <h1 className="text-sm rounded px-2 py-1 border border-black text-black">5 videos</h1>
                                    <h2 className="text-sm rounded-md px-3 py-1 uppercase bg-black text-white">{space.frameworks}</h2>
                                </div>
                                <div className="flex flex-col mt-4 gap-4">
                                    <div className="mt-6 flex justify-end gap-4">
                                        <Dialog.Close asChild>
                                            <button
                                                type="button"
                                                className="bg-gray-200 text-gray-800 rounded-lg px-6 py-2"
                                            >
                                                Cancel
                                            </button>
                                        </Dialog.Close>
                                        <Dialog.Close asChild>
                                            <button
                                                type="button"
                                                disabled={isLoading}
                                                onClick={() => handleWebTemplateAdd(space)}
                                                className="bg-black hidden md:block disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg px-6 py-2"
                                            >
                                                Add to My WebSpace
                                            </button>
                                        </Dialog.Close>
                                        <Dialog.Close asChild>
                                            <button
                                                type="button"
                                                disabled={isLoading}
                                                onClick={() => handleWebTemplateAdd(space)}
                                                className="bg-black md:hidden disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg px-6 py-2"
                                            >
                                                Add Space
                                            </button>
                                        </Dialog.Close>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
            <span className="w-full flex items-center justify-between gap-5 mb-2">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{space.heading}</h2>
                <p className="text-xs font-normal capitalize text-white bg-black border border-black px-2 py-0.5 rounded-md">{space.frameworks}</p>
            </span>
            <p className="leading-6 font-light line-clamp-2 text-sm">{space.explanation}</p>
        </div>

    );

    return (
        <div className="w-full min-h-screen px-6 py-6 bg-gray-50">
            <div className="flex items-center w-full mb-10 justify-between">
                <h1 className="text-2xl hidden md:block font-semibold ms-3 me-10">
                    WebSpace&nbsp;Templates
                </h1>
                <div className="flex items-center md:max-w-[500px] w-full">
                    <input
                        type="search"
                        onChange={(e) => setSearchPrompt(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full pl-3 p-2.5"
                        placeholder="Search for your Web Templates.."
                    />
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <button className="p-2.5 relative ml-2 text-sm font-medium text-white bg-main rounded-lg border border-main transition-all active:scale-95">
                                <FaFilter className="text-[1rem] mt-1" />
                                {promptLang !== "" && <div className="absolute -top-1 -right-1 size-3 rounded bg-green-400"></div>}
                            </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content
                                sideOffset={10}
                                side="bottom"
                                className="z-[100] rounded-lg px-5 py-4 bg-white focus:outline-none border border-gray-300 shadow-lg w-fit"
                            >
                                <div className="pb-3">
                                    <h1 className="text-main mb-3">Language</h1>
                                    <div className="grid gap-3 place-items-center grid-cols-3">
                                        <button onClick={() => setpromptLang('')} className="p-2 bg-gray-100 text-gray-400 rounded-md border">
                                            <PiEmptyBold />
                                        </button>
                                        {availableLangs.map((item, index) => (
                                            <button
                                                title={item}
                                                key={index}
                                                onClick={() => setpromptLang(item)}
                                                className={` rounded-md ${item == promptLang ? 'border border-gray-500' : ''} p-1`}
                                            >
                                                <img src={LANGUAGE_VERSIONS[item]?.image || "https://via.placeholder.com/50"} alt={item} className="w-6" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Popover.Arrow className="fill-main/50" />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </div>
            </div>
            <div className="container mx-auto">
                {results.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((space) => renderSpaceCard(space))}
                    </div>
                )}
                {results.length < 1 && webspacestemplates.length > 0 && (
                    <div className="flex flex-col items-center justify-center h-[70vh]">
                        <img
                            src="https://ik.imagekit.io/vituepzjm/undraw_empty_re_opql.svg?updatedAt=1732993642328"
                            alt="Nothing to show"
                            className="w-40 mb-6"
                        />
                        <h2 className="text-base break-words italic text-gray-500">No WebSpaces are found matching given context.</h2>

                    </div>
                )}
                {webspacestemplates.length < 1 && <div className="flex flex-col items-center justify-center h-[70vh]">
                    <img
                        src="https://ik.imagekit.io/vituepzjm/undraw_taken_re_yn20.svg?updatedAt=1724617636363"
                        alt="Nothing to show"
                        className="w-32 mb-6"
                    />
                    <h2 className="text-xl font-medium text-gray-600">No WebTemplates are available</h2>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        Create a new WebSpace to organize your projects and collaborate efficiently.
                    </p>
                    <Link
                        to="/dashboard/space/new"
                        className="mt-6 px-5 py-2 bg-black text-white rounded-lg shadow hover:bg-black/80 transition"
                    >
                        Create a WebSpace
                    </Link>
                </div>}
            </div>
            <Toaster />
        </div>
    );
};

export default WebTemplates;
