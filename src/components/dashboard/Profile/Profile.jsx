import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { MdOutlineKeyboardDoubleArrowRight, MdOutlinePlayCircleFilled, MdVerified } from "react-icons/md";
import { useData } from "../../context/DataContext";
import { ping } from "ldrs";
import { Link } from "react-router-dom";
import { LANGUAGE_VERSIONS } from "../../../constants";

function Profile() {
  const { user } = useUserAuth();
  const { setwebpromptLang, setpromptLang, profile, spaces, webspaces, codeTrashes, webTrashes, isLoading } = useData();

  const formatCount = (count) => (count < 10 ? `0${count}` : count);

  useEffect(() => {
    ping.register();
  }, [])

  return (
    <section class="relative bg-white overflow-y-auto h-full max-h-[90vh] pt-44">
      <img
        src={'https://picsum.photos/1000/200' || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"}
        alt="cover-image"
        class="w-full absolute md:object-cover md:object-center top-0 left-0 z-0 h-60"
      />

      <div class="w-full mx-auto max-w-7xl px-6 md:px-8">
        <div class="flex items-center justify-center sm:justify-start relative z-10 mb-3">
          <img
            src={user.photoURL || 'https://xsgames.co/randomusers/assets/avatars/pixel/51.jpg'}
            alt="user-avatar-image"
            class="border-4 border-solid bg-gray-300 size-[120px] border-white rounded-full"
          />
        </div>
        <div class="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-10">
          <div class="block">
            <h3 class=" font-bold text-4xl text-black mb-1 max-sm:text-center">
              {user?.displayName}
            </h3>
            <p class="font-normal lg:ms-3 text-base leading-7 text-gray-600 dark:text-white max-sm:text-center">
              @{user?.uid}
            </p>
          </div>
          <div class="hidden lg:flex items-center gap-4">

            <Link to="/dashboard/space/list" className="rounded-xl border inline-flex items-center justify-center gap-2 border-solid border-main bg-main py-3 px-4 font-semibold text-white  text-sm whitespace-nowrap shadow-sm transition-all duration-500 ">
              {spaces?.length > 0 ? `${formatCount(spaces?.length)} CodeSpaces` : `Not Created`}
            </Link>

            <Link to="/dashboard/webspace/list" className="rounded-xl border inline-flex items-center justify-center gap-2 border-solid border-main bg-main py-3 px-4 font-semibold text-white  text-sm whitespace-nowrap shadow-sm transition-all duration-500 ">
              {webspaces?.length > 0 ? `${formatCount(webspaces?.length)} WebSpaces` : `Not Created`}
            </Link>

          </div>
        </div>
        <div className="flex mb-10 max-sm:flex-wrap max-sm:justify-center items-center gap-4">
          <Link to="/dashboard/trash/codespace" className="rounded-full py-2 px-4 md:py-3 md:px-6 bg-black/5 text-black font-semibold text-sm leading-6 transition-all duration-500 hover:bg-black/10">
            {codeTrashes?.length > 0 ? `${formatCount(codeTrashes?.length)} in CodeTrash` : `Nothing in CodeTrash`}
          </Link>
          <Link to="/dashboard/trash/webspace"
            className="rounded-full py-2 px-4 md:py-3 md:px-6 bg-black/5 text-black font-semibold text-sm leading-6 transition-all duration-500 hover:bg-black/10"
          >
            {webTrashes?.length > 0 ? `${formatCount(webTrashes?.length)} in WebTrash` : `Nothing in WebTrash`}
          </Link>
        </div>
        <div className="mb-10 grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6">
          <div className="border-2 cursor-default relative md:col-span-3 flex items-center gap-3 justify-start flex-wrap border-dashed border-black/60 rounded-md px-5 pb-5 pt-7">
            {profile?.lang && profile.lang.length > 0 ? (
              profile.lang.map((item, index) =>
                <Link to="/dashboard/space/list" key={index} onClick={() => { setpromptLang(item) }} className="rounded-full pt-1.5 pb-2 px-4 bg-black/5 text-black font-semibold text-sm leading-6 transition-all duration-500 hover:bg-black/10 uppercase">
                  {item}
                </Link>)
            ) : (
              <div>No languages specified</div>
            )}

            <h1 className="px-3 py-1 absolute -top-3.5 left-5 bg-black text-white rounded-md text-xs">Preferred Languages</h1>
          </div>
          <div className="border-2 cursor-default relative md:col-span-2 flex items-center gap-3 justify-start flex-wrap border-dashed border-black/60 rounded-md px-5 pb-5 pt-7">
            {profile?.web && profile.web.length > 0 ? (
              profile.web.map((item, index) =>
                <Link to="/dashboard/webspace/list" key={index} onClick={() => { setwebpromptLang(item) }} className="rounded-full pt-1.5 pb-2 px-4 bg-black/5 text-black font-semibold text-sm leading-6 transition-all duration-500 hover:bg-black/10 uppercase">
                  {item}
                </Link>)
            ) : (
              <div>No frameworks specified</div>
            )}

            <h1 to="/dashboard/shared/list" className="px-3 py-1 absolute -top-3.5 left-5 bg-black text-white rounded-md text-xs">Preferred Frameworks</h1>
          </div>
        </div>
        {spaces?.length > 0 && <div className="mb-5" >
          {isLoading ? <div className="flex items-center flex-col w-full h-[200px] mb-5 px-3 justify-center ">
            <l-ping bg-opacity="0.1" speed="1.75" color="#1a1a1a"></l-ping>
          </div> :
            <div>
              {spaces?.length == 0 ?
                <div className="flex items-center flex-col w-full h-full mb-5 px-3 justify-center ">
                  <img src="https://ik.imagekit.io/vituepzjm/No%20data-pana.svg?updatedAt=1724334371763" alt="NO DATA" className="size-52" />
                  <p className="text-black text-xl dark:text-white break-words">Not Created Any spaces Yet !! </p>
                </div>
                :
                <div>
                  <h1 className="text-xl mb-5 text-black dark:text-white font-semibold">Recent CodeSpaces</h1>
                  <div className="grid gap-5 h-auto pb-5 overflow-y-auto relative md:pe-12 md:grid-cols-1 grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3">
                    {spaces?.length > 0 && spaces?.slice(0, 3).map((space) => <div key={space.spaceid} className="">
                      <img
                        src={LANGUAGE_VERSIONS[space.language]?.banner || "https://via.placeholder.com/50"}
                        alt={space.language}
                        className="h-32 w-full rounded-t-xl object-cover"
                      />
                      <div className="relative hover:shadow-lg transform transition-all duration-300 block px-5 pb-5 pt-3 bg-white shadow-md rounded-b-lg border border-gray-200 "
                      >
                        <div className="flex items-center justify-between mb-4">
                          <Link to={`/dashboard/space/info/${space.spaceid}`} className="flex items-center">
                            <img
                              src={LANGUAGE_VERSIONS[space.language]?.image || "https://via.placeholder.com/50"}
                              alt={space.language}
                              className="size-10 p-1 rounded-xl object-cover"
                            />
                            <div className="ml-3">
                              <h2 className="text-[0.9rem] leading-relaxed line-clamp-1 me-6 font-semibold text-gray-700 group-hover:text-gray-900">
                                {space.heading}
                              </h2>
                              <p className="text-xs leading-relaxed line-clamp-1 text-gray-500">{space.spaceid}</p>
                            </div>
                          </Link>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-2">
                          {space.explanation || "No description available for this space."}
                        </p>
                      </div>
                    </div>)}
                    {spaces.length > 3 && <Link to="/dashboard/space/list" className="absolute lg:flex hidden -right-2.5 top-1/2 transition-all  bg-main/80 text-white -mt-8 p-2 rounded-full -translate-x-1/2"><MdOutlineKeyboardDoubleArrowRight className="text-lg" /></Link>}
                  </div>
                </div>
              }
            </div>
          }
        </div>}
        {webspaces?.length > 0 && <div className="mb-5" >
          {isLoading ? <div className="flex items-center flex-col w-full h-[200px] mb-5 px-3 justify-center ">
            <l-ping bg-opacity="0.1" speed="1.75" color="#1a1a1a"></l-ping>
          </div> :
            <div>
              {webspaces?.length == 0 ?
                <div className="flex items-center flex-col w-full h-full mb-5 px-3 justify-center ">
                  <img src="https://ik.imagekit.io/vituepzjm/No%20data-pana.svg?updatedAt=1724334371763" alt="NO DATA" className="size-52" />
                  <p className="text-black text-xl dark:text-white break-words">Not Created Any webspaces Yet !! </p>
                </div>
                :
                <div>
                  <h1 className="text-xl mb-5 text-black dark:text-white font-semibold">Recent WebSpaces</h1>
                  <div className="grid gap-5 h-auto pb-5 overflow-y-auto relative md:pe-12 md:grid-cols-1 grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3">
                    {webspaces?.length > 0 && webspaces?.slice(0, 3).map((space) => <div key={space.spaceid} className="">
                      <img
                        src={LANGUAGE_VERSIONS[space.frameworks]?.banner || "https://via.placeholder.com/50"}
                        alt={space.frameworks}
                        className="h-32 w-full rounded-t-xl object-cover"
                      />
                      <div className="relative hover:shadow-lg transform transition-all duration-300 block px-5 pb-5 pt-3 bg-white shadow-md rounded-b-lg border border-gray-200 "
                      >
                        <div className="flex items-center justify-between mb-4">
                          <Link to={`/dashboard/webspace/info/${space.spaceid}`} className="flex items-center">
                            <img
                              src={LANGUAGE_VERSIONS[space.frameworks]?.image || "https://via.placeholder.com/50"}
                              alt={space.frameworks}
                              className="w-8 object-cover"
                            />
                            <div className="ml-3">
                              <h2 className="text-[0.9rem] leading-relaxed line-clamp-1 me-6 font-semibold text-gray-700 group-hover:text-gray-900">
                                {space.heading}
                              </h2>
                              <p className="text-xs leading-relaxed line-clamp-1 text-gray-500">{space.spaceid}</p>
                            </div>
                          </Link>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-2">
                          {space.explanation || "No description available for this space."}
                        </p>
                      </div>
                    </div>)}
                    {webspaces.length > 3 && <Link to="/dashboard/webspace/list" className="absolute lg:flex hidden -right-2.5 top-1/2 transition-all  bg-main/80 text-white -mt-8 p-2 rounded-full -translate-x-1/2"><MdOutlineKeyboardDoubleArrowRight className="text-lg" /></Link>}
                  </div>
                </div>
              }
            </div>
          }
        </div>}
      </div>
    </section>
  );
}

export default Profile;
