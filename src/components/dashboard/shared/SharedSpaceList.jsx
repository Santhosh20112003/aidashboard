import React, { useEffect, useState } from 'react';
import * as Tabs from "@radix-ui/react-tabs";
import { useData } from '../../context/DataContext';
import { LANGUAGE_VERSIONS } from '../../../constants';
import { ParseAIDate } from '../../../common/methods';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';

function SharedSpaceList() {
  const { user } = useUserAuth();
  const [current, setCurrent] = useState("CodeSpace");
  const [prompt, setPrompt] = useState("");
  const {
    fetchSharedItems,
    reloadShared,
    setReloadShared,
    setSharedcodeSpace,
    setSharedwebSpace,
    sharedcodeSpace,
    sharedwebSpace,
  } = useData();
  const [filteredcodeData, setFilteredcodeData] = useState([]);
  const [filteredwebData, setFilteredwebData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Object.keys(user).length > 0) {
          const data = await fetchSharedItems();
          setSharedcodeSpace(data.codespaceData);
          setFilteredcodeData(data.codespaceData);
          setSharedwebSpace(data.webspaceData);
          setFilteredwebData(data.webspaceData);
        } else {
          setSharedcodeSpace([]);
          setSharedwebSpace([]);
        }
      } catch (err) {
        console.error(err);
        setSharedcodeSpace([]);
        setSharedwebSpace([]);
      }
    };
    fetchData();
  }, [user, reloadShared]);

  const filterData = () => {
    const search = prompt.toLowerCase();

    if (current === "CodeSpace") {
      setFilteredcodeData(
        sharedcodeSpace.filter(
          (space) =>
            space.heading?.toLowerCase().includes(search) ||
            space.language?.toLowerCase().includes(search) ||
            space.userid?.toLowerCase().includes(search)
        )
      );
    } else if (current === "WebSpace") {
      setFilteredwebData(
        sharedwebSpace.filter(
          (space) =>
            space.heading?.toLowerCase().includes(search) ||
            space.frameworks?.toLowerCase().includes(search) ||
            space.userid?.toLowerCase().includes(search)
        )
      );
    }
  };

  useEffect(() => {
    filterData();
  }, [prompt, current]);

  const renderSpaces = (spaces, type) => {
    if (spaces.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <img
            src="https://ik.imagekit.io/vituepzjm/undraw_void_-3-ggu.svg?updatedAt=1733491948383"
            alt="Nothing to show"
            className="w-40 mb-6"
          />
          <h2 className="text-base break-words italic text-gray-500">
            No {type} are found.
          </h2>
        </div>
      );
    }

    return spaces.map((space) => (
      <div key={space.spaceid} className="relative">
        <img
          src={
            LANGUAGE_VERSIONS[space.language || space.frameworks]?.banner ||
            "https://via.placeholder.com/50"
          }
          alt={space.language || space.frameworks}
          className="h-32 w-full rounded-t-xl object-cover"
        />
        <div className="absolute top-3 right-3 text-sm text-white bg-black/80 px-2 py-1 rounded-md">
          {space.isEditorMode ? "Editor Mode" : "Viewer Mode"}
        </div>
        <div className="relative block px-5 pb-5 pt-3 bg-white shadow-md rounded-b-lg border border-gray-200 hover:shadow-lg transform transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Link
              to={
                space.isEditorMode
                  ? `/dashboard/shared/${type.toLowerCase()}/edit/${space.spaceid}`
                  : `/dashboard/shared/${type.toLowerCase()}/view/${space.spaceid}`
              }
              className="flex items-center"
            >
              <img
                src={
                  LANGUAGE_VERSIONS[space.language || space.frameworks]?.image ||
                  "https://via.placeholder.com/50"
                }
                alt={space.language || space.frameworks}
                className="size-10 p-1 rounded-xl object-cover"
              />
              <div className="ml-3">
                <h2 className="text-[0.9rem] font-semibold text-gray-700">
                  {space.heading.slice(0, 30)} -
                  <span className="text-xs"> {ParseAIDate(space.updatedAt)}</span>
                </h2>
                <p className="text-xs text-gray-500">{space.spaceid}</p>
              </div>
            </Link>
          </div>
          <p className="text-xs text-gray-700 font-semibold">@{space.userid}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {space.explanation || "No description available for this space."}
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full bg-white h-full px-3 py-2 rounded-lg">
      <Tabs.Root
        className="flex flex-col w-full h-full overflow-y-auto"
        defaultValue="CodeSpace"
      >
        <Tabs.List className="text-main font-medium flex items-center justify-center md:justify-between rounded-md w-full gap-2 px-3 md:px-5 pt-3 pb-5">
          <h1 className="text-2xl hidden md:block">Shared Spaces</h1>
          <div className="w-full md:justify-end md:w-fit flex gap-3">
            {(sharedcodeSpace.length > 0 || sharedwebSpace.length > 0) && (
              <input
                type="search"
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full pl-3 p-2.5"
                placeholder="Search for spaces.."
              />
            )}
            <div className="flex items-center gap-3">
              <Tabs.Trigger
                onClick={() => setCurrent("CodeSpace")}
                className="data-[state=active]:bg-main bg-gray-100 data-[state=active]:text-white px-3 py-2 rounded-md text-sm"
                value="CodeSpace"
              >
                CodeSpaces
              </Tabs.Trigger>
              <Tabs.Trigger
                onClick={() => setCurrent("WebSpace")}
                className="data-[state=active]:bg-main bg-gray-100 data-[state=active]:text-white px-3 py-2 rounded-md text-sm"
                value="WebSpace"
              >
                WebSpaces
              </Tabs.Trigger>
            </div>
          </div>
        </Tabs.List>

        <Tabs.Content
          value="CodeSpace"
          className={`rounded-md focus:outline-none pb-1 overflow-y-auto grid ${(sharedcodeSpace.length > 0 && filteredcodeData.length > 0)
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
            } gap-6 w-full px-3 md:px-5`}
        >
          {renderSpaces(filteredcodeData, "CodeSpace")}
        </Tabs.Content>

        <Tabs.Content
          value="WebSpace"
          className={`rounded-md focus:outline-none pb-1 overflow-y-auto grid ${(sharedwebSpace.length > 0 && filteredwebData.length > 0)
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
            } gap-6 w-full px-3 md:px-5`}
        >
          {renderSpaces(filteredwebData, "WebSpace")}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export default SharedSpaceList;
