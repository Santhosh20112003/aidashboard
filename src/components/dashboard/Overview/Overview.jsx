import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useUserAuth } from '../../context/UserAuthContext';
import Charts from './Charts';
import { HiMiniXMark, HiOutlineGlobeAlt } from "react-icons/hi2";
import { PiTerminalWindowFill } from 'react-icons/pi';
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from 'react-router-dom';
import { FaPlusSquare, FaRegPlusSquare } from "react-icons/fa";
import { LANGUAGE_VERSIONS } from '../../../constants';
import { FaPlus } from 'react-icons/fa6';

function Overview() {
  const { user } = useUserAuth();
  const { handleWebTemplateAdd, isLoading, handleCodeTemplateAdd, webspacestemplates, spacestemplates, spaces, webspaces, webTrashes, codeTrashes } = useData();
  const [isClosed, setisClosed] = useState(false);
  return (
    <div className="py-5 px-3 bg-gray-100 min-h-[90vh] w-full">
      <div className={`grid grid-cols-2 lg:grid-cols-4 ${isClosed ? 'xl:grid-cols-4' : 'xl:grid-cols-5'} lg:grid-rows-5 gap-3`}>
        <div className="col-span-2 lg:col-span-4 row-span-3 py-3 bg-white rounded-lg flex flex-col-reverse md:flex-row items-center justify-center md:gap-5 md:justify-evenly bg-[url('https://dashboard.algolia.com/client-assets/c1c9361fe75370d1b156733e962f7214/514f2ec3798090c6df00dad1592c8166.svg')]">
          <span className="flex items-start justify-center flex-col p-2">
            <h1 className="lg:text-4xl hidden md:flex md:text-3xl text-2xl ms-4 font-medium title-font mb-4 text-start text-[#3f3d56]">
              Hello, <br className="flex md:hidden" />
              🥷<span className="text-main font-semibold break-words capitalize">
                {user.displayName}
              </span>
              &nbsp;
            </h1>
            <h1 className="lg:text-4xl md:text-3xl break-words md:hidden text-2xl ms-4 font-medium title-font mb-4 text-start text-[#3f3d56]">
              {/* <br className="flex md:hidden" /> */}
              🥷<span className="text-main font-semibold break-words capitalize">
                {user.displayName}
              </span>
              &nbsp;
            </h1>
            <p className="text-[#3f3d56] break-words md:ps-4 ms-4 text-start text-base md:text-lg">
              Check what's happening on your CodeSpark Dashboard.
            </p>
            <div className="hidden mt-8 ms-4 ps-4 lg:flex items-center justify-center gap-5">
              <Link to="/dashboard/space/new" class="inline-flex items-center bg-black border-0 px-4 gap-2 py-2.5 text-white focus:outline-none hover:bg-black/80 rounded-full text-sm mt-4 md:mt-0">
                <FaPlus />
                CodeSpace
              </Link>
              <Link to="/dashboard/webspace/new" class="inline-flex items-center bg-black border-0 px-4 gap-2 py-2.5 text-white focus:outline-none hover:bg-black/80 rounded-full text-sm mt-4 md:mt-0">
                <FaPlus />
                WebSpace
              </Link>
            </div>
          </span>
          <span className=" flex">
            {(spaces.length !== 0 && webspaces.length !== 0) ?
              <div className="hidden md:block size-72 md:w-96 md:h-[21rem]">
                <Charts />
              </div> : <img
                src="https://ik.imagekit.io/vituepzjm/Scribby/Notes-pana.svg?updatedAt=1723928906412"
                alt="banner"
                className="hidden md:block  w-72 grayscale-0 md:w-[22rem]"
              />}
            <img
              src="https://ik.imagekit.io/vituepzjm/Hand%20coding-pana.svg?updatedAt=1734118542225"
              alt="banner"
              className="md:hidden w-72 grayscale-0 md:w-[22rem]"
            />
          </span>
        </div>
        <div className={`row-span-5 hidden grayscale ${isClosed ? 'xl:hidden' : 'xl:flex'
          } brightness-95 col-start-5 flex-col justify-end bg-gradient-to-t relative from-black to-black/60 rounded-lg`}
        >
          <button
            onClick={() => setisClosed(true)}
            className="absolute top-3 p-1 bg-black bg-opacity-30 rounded-md right-3 z-10 text-white"
          >
            <HiMiniXMark className="text-lg" />
          </button>

          <img
            src="https://ik.imagekit.io/vituepzjm/coffee-cups-on-light-blue-ground-3d-westend61.jpg?updatedAt=1734034589476"
            alt="Sample background"
            className="absolute w-full h-full brightness-90 object-cover rounded-lg"
          />

          <Link
            to="/dashboard/shared/list"
            className="relative z-10 px-3 pb-3 pt-5 m-3 mb-3 bg-black bg-opacity-80 rounded-lg"
          >
            <h1 className="mb-2 text-lg font-semibold text-gray-50">
              Your Shared Space
            </h1>
            <p className="text-sm font-light leading-5 text-gray-300 line-clamp-2">
              Collaborate on projects by accessing Codespaces and Webspaces shared by
              others.
            </p>
          </Link>
        </div>
        <div className="lg:row-span-2 relative bg-white flex items-start col-span-2 flex-col justify-end p-5 rounded-lg lg:row-start-4">
          <PiTerminalWindowFill className='text-[2.5rem] mb-2' />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">CodeSpaces</h2>
          <p className="text-gray-600 leading-6 line-clamp-2 text-sm mb-4">
            Set up Codespaces development environments for various programming languages, including Java and Python.
          </p>
          <Link to="/dashboard/space/list" class="inline-flex items-center bg-black border-0 px-4 py-2 text-white focus:outline-none hover:bg-black/80 rounded-lg text-sm mt-4 md:mt-0">
            CodeSpaces
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2 mt-0.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
          {codeTrashes.length > 0 && <Link to="/dashboard/trash/codespace" className="absolute top-3 font-medium right-3 border border-black text-xs px-2 py-1 rounded-md">{codeTrashes.length} in CodeTrash</Link>}
        </div>
        <div className="lg:row-span-2 relative bg-white flex items-start col-span-2 flex-col justify-end p-5 rounded-lg lg:row-start-4">
          <HiOutlineGlobeAlt className='text-[2.5rem] mb-2' />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">WebSpaces</h2>
          <p className="text-gray-600 leading-6 line-clamp-2 text-sm mb-4">
            Create Webspaces development environments for HTML, CSS, JavaScript, and frameworks like Tailwind CSS and Bulma.
          </p>
          <Link to="/dashboard/webspace/list" class="inline-flex items-center bg-black border-0 px-4 py-2 text-white focus:outline-none hover:bg-black/80 rounded-lg text-sm mt-4 md:mt-0">
            WebSpaces
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2 mt-0.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
          {webTrashes.length > 0 && <Link to="/dashboard/trash/webspace" className="absolute top-3 font-medium right-3 border border-black text-xs px-2 py-1 rounded-md">{webTrashes.length} in WebTrash</Link>}
        </div>
        {/* <div className="row-span-2 bg-white p-3 rounded-lg row-start-4">5</div> */}
        {/* <div className="row-span-2 bg-white p-3 rounded-lg row-start-4">4</div> */}
        {/* <div className="row-span-2 bg-white p-3 rounded-lg row-start-4">5</div> */}
        {/* <div className="row-span-2 bg-white p-3 rounded-lg row-start-4">6</div> */}
      </div>
      <div className="md:px-6 mt-14">
        <div className="mb-6 flex items-center justify-center md:justify-between w-full">
          <h1 className="text-xl ms-2 md:text-2xl font-semibold">Recomended CodeSpaces</h1>
          <Link to="/dashboard/space/new" className="active:scale-95 transition-all items-center border-2 gap-3 border-black px-2 py-1 text-black font-semibold focus:outline-none rounded-lg text-sm hidden md:inline-flex">
            Blank CodeSpace
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            spacestemplates.slice(0, 6).map((item, index) => (
              <div key={index} className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                <Dialog.Root >
                  <Dialog.Trigger asChild>
                    <img src={LANGUAGE_VERSIONS[item.language]?.banner || "https://via.placeholder.com/50"} alt={item.language} className="w-full h-32 cursor-pointer shadow-md rounded-lg mb-3 active:scale-95 transition-all" />
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[80vh] w-[90vw] max-w-[1000px] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md focus:outline-none p-6 z-50">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex justify-center items-center">
                          <img
                            src={LANGUAGE_VERSIONS[item.language]?.banner || "https://via.placeholder.com/50"}
                            alt={item.language}
                            className="rounded-lg w-full h-36 md:h-72 object-center object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col">
                          <h1 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">Add this to Your CodeSpace</h1>
                          <h2 className="text-lg font-medium line-clamp-1 text-gray-800">{item.heading}</h2>
                          <p className="text-gray-500 line-clamp-4 font-normal mb-3">{item.explanation}</p>
                          <div className="flex items-center justify-start gap-3">
                            <h1 className="text-sm rounded px-2 py-1 border border-black text-black">5 videos</h1>
                            <h2 className="text-sm rounded-md px-3 py-1 uppercase bg-black text-white">{item.language}</h2>
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
                                  onClick={() => handleCodeTemplateAdd(item)}
                                  className="bg-black hidden md:block disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg px-6 py-2"
                                >
                                  Add to My CodeSpace
                                </button>
                              </Dialog.Close>
                              <Dialog.Close asChild>
                                <button
                                  type="button"
                                  disabled={isLoading}
                                  onClick={() => handleCodeTemplateAdd(item)}
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
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.heading}</h2>
                  <p className="text-xs font-normal capitalize text-white bg-black border border-black px-2 py-0.5 rounded-md">{item.language}</p>
                </span>
                <p className="leading-6 font-light line-clamp-2 text-sm">{item.explanation}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="md:px-6 mt-14">
        <div className="mb-6 flex items-center justify-center md:justify-between w-full">
          <h1 className="text-xl ms-2 md:text-2xl font-semibold">Recomended WebSpaces</h1>
          <Link to="/dashboard/webspace/new" className="active:scale-95 transition-all items-center border-2 gap-3 border-black px-2 py-1 text-black font-semibold focus:outline-none rounded-lg text-sm hidden md:inline-flex">
            Blank WebSpace
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            webspacestemplates.slice(0, 6).map((item, index) => (
              <div key={index} className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                <Dialog.Root >
                  <Dialog.Trigger asChild>
                    <img src={LANGUAGE_VERSIONS[item.frameworks]?.banner || "https://via.placeholder.com/50"} alt={item.frameworks} className="w-full h-32 cursor-pointer shadow-md rounded-lg mb-3 active:scale-95 transition-all" />
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[80vh] w-[90vw] max-w-[1000px] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md focus:outline-none p-6 z-50">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 flex justify-center items-center">
                          <img
                            src={LANGUAGE_VERSIONS[item.frameworks]?.banner || "https://via.placeholder.com/50"}
                            alt={item.frameworks}
                            className="rounded-lg w-full h-36 md:h-72 object-center object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col">
                          <h1 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">Add this to Your WebSpace</h1>
                          <h2 className="text-lg font-medium line-clamp-1 text-gray-800">{item.heading}</h2>
                          <p className="text-gray-500 line-clamp-4 font-normal mb-3">{item.explanation}</p>
                          <div className="flex items-center justify-start gap-3">
                            <h1 className="text-sm rounded px-2 py-1 border border-black text-black">5 videos</h1>
                            <h2 className="text-sm rounded-md px-3 py-1 uppercase bg-black text-white">{item.frameworks}</h2>
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
                                  onClick={() => handleWebTemplateAdd(item)}
                                  className="bg-black hidden md:block disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg px-6 py-2"
                                >
                                  Add to My WebSpace
                                </button>
                              </Dialog.Close>
                              <Dialog.Close asChild>
                                <button
                                  type="button"
                                  disabled={isLoading}
                                  onClick={() => handleWebTemplateAdd(item)}
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
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.heading}</h2>
                  <p className="text-xs font-normal capitalize text-white bg-black border border-black px-2 py-0.5 rounded-md">{item.frameworks}</p>
                </span>
                <p className="leading-6 font-light line-clamp-2 text-sm">{item.explanation}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Overview