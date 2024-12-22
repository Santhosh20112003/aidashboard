import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { converter } from "../../../common/config";
import { useUserAuth } from "../../context/UserAuthContext";
import { LANGUAGE_VERSIONS } from "../../../constants";
import "../../../chat.css";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { IoClose, IoCloseSharp } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";
import { FaCircleArrowLeft, FaUserPlus } from "react-icons/fa6";
import { HiTrash } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import * as Tooltip from "@radix-ui/react-tooltip";
import { convertToEventDate, ParseAIDate, ParseFullDate } from "../../../common/methods";

function SpaceInfo() {
  const { id } = useParams();
  const { user } = useUserAuth();
  const {
    setHeading,
    setVideos,
    setVideoID,
    setEditorContent,
    setExplanation,
    setLanguage,
    setLastInput,
    explanation,
    language,
    heading,
    spaceid,
    spaces,
    handleDeleteCodeSpace,
    setInput,
    setSpaceid,
    setOutput,
    setCodeShared,
    CodeShared,
    isCodeSpaceDeleting,
    setisShareOpen,
    isShareOpen,
    UpdateSpaceAccess,
    getSharedSpaces,
    AddNewSharedSpace,
    RevokeSpaceAccess
  } = useData();
  const navigate = useNavigate();
  const [Share, setShare] = useState({
    email: "",
    isEditorMode: false
  });
  const [isEditorMode, setisEditorMode] = useState(false);
  const [isRevoking, setisRevoking] = useState(false);
  const [isChanging, setisChanging] = useState(false);
  const [isSharing, setisSharing] = useState(false);
  const [data, setData] = useState(null);

  const HandleShare = async (e) => {
    e.preventDefault();
    const emailToShare = Share.email.trim().toLowerCase();

    if (emailToShare === user.email) {
      return toast("Cannot share with your own account", { icon: "🚫" });
    }
    if (CodeShared.some((user) => user.email.toLowerCase() === emailToShare)) {
      return toast("Email already shared with this space", { icon: "⚠️" });
    }
    setisSharing(true);
    try {
      const newData = { spaceid, userid: user.uid, email: Share.email, isEditorMode: Share.isEditorMode, type: "code", updatedAt: new Date() }
      const updatedShared = [...CodeShared, newData];
      // console.log(newData)
      const response = await AddNewSharedSpace(newData);
      if (!response) throw new Error("Failed to update cloud");
      setCodeShared(updatedShared);
      setisEditorMode(false)
      toast.success("CodeSpace shared successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Unable to share space.");
    } finally {
      setShare({
        email: "",
        isEditorMode: false
      })
      setisEditorMode(false)
      setisSharing(false);
      setisShareOpen(false);
    }
  };

  const HandleRevoke = async (item) => {
    setisRevoking(true);
    try {
      const updatedShared = CodeShared.filter((user) => user.email !== item.email);
      const response = await RevokeSpaceAccess({ ...item, updatedAt: new Date() });
      if (response) {
        setCodeShared(updatedShared);
        toast.success("User Access revoked successfully.");
      }
      else {
        toast.error("cannot revoke the access.")
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to revoke access.");
    } finally {
      setisRevoking(false);
    }
  };

  const handleToggleViewerMode = async (item) => {
    try {
      setisChanging(true);
      const updatedShared = CodeShared.map((user) =>
        user.email === item.email
          ? { ...user, isEditorMode: !user.isEditorMode, updatedAt: new Date() }
          : user
      );

      const data = { ...item, isEditorMode: !item.isEditorMode };
      const response = await UpdateSpaceAccess({ ...data, updatedAt: new Date() });
      if (response) {
        setCodeShared(updatedShared);
        toast.success(`${!item.isEditorMode ? 'Editor Mode' : 'Viewer Mode'} applied to the User.`);
      }
      else {
        toast.error("Access mode cannot update.");
      }
    } catch (error) {
      console.error("Error updating access mode:", error);
      toast.error("Failed to update access mode.");
    } finally {
      setisChanging(false);
    }
  };

  useEffect(() => {
    const loadSpaceData = async () => {
      try {
        const res = spaces.find((item) => item.spaceid === id);
        setOutput(null);
        setHeading(res?.heading);
        setSpaceid(res?.spaceid);
        setInput(res?.input);
        const response = await getSharedSpaces(res?.spaceid, "code");
        setCodeShared(response);
        setLastInput(res?.lastinput);
        setVideos(res?.videos);
        setVideoID(res?.videoID);
        setEditorContent(res?.code);
        setExplanation(res?.explanation);
        setLanguage(res?.language.toLowerCase());
        setLastInput(res?.input);
        setData(res || null);
        console.log(res)
      }
      catch (err) {
        console.log(err)
      }
    };

    loadSpaceData();
  }, [id, spaces]);

  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading or no space found...</p>
      </div>
    );
  }

  return (
    <section className="relative pt-20 pb-16">
      <img
        src={LANGUAGE_VERSIONS[language]?.banner || "https://via.placeholder.com/50"}
        alt="cover"
        className="w-full absolute object-cover md:object-fill top-0 left-0 z-0 h-80 "
      />
      <div className="relative w-full max-w-[90rem] mx-auto mt-24 px-6 md:px-8 bg-white md:border md:border-gray-300 rounded-xl overflow-hidden">
        <div className="flex flex-col gap-5 md:flex-row items-start md:items-center justify-between py-6 md:py-10 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={LANGUAGE_VERSIONS[language]?.image || "https://via.placeholder.com/50"}
              alt="language-logo"
              className="size-12 p-1 rounded-lg object-cover"
            />
            <div>
              <h1 title={heading} className="md:text-2xl leading-relaxed line-clamp-1 overflow-hidden font-semibold text-gray-800">{heading}</h1>
              <p title={spaceid} className="text-xs md:text-sm leading-relaxed line-clamp-1 overflow-hidden text-gray-500">{spaceid}</p>
            </div>
          </div>
          <div className="flex items-center w-full sm:w-fit justify-between md:justify-start gap-3">
            <Link
              to={`/dashboard/space/${spaceid}`}
              className="px-4 py-2 text-sm inline-flex items-center justify-center gap-2 font-medium text-white bg-gradient-to-r from-black/80 to-black/70 rounded-lg "
            >
              Open&nbsp;Space <FiArrowRight />
            </Link>

            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button
                  disabled={isCodeSpaceDeleting}
                  className="px-2 disabled:opacity-50 active:scale-95 transition-all py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 inline-flex items-center gap-2"
                  title="Delete"
                >
                  <HiTrash className="text-lg" />
                </button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                  <AlertDialog.Title className="text-red-600 font-semibold m-0 text-xl">
                    Are you absolutely sure?
                  </AlertDialog.Title>
                  <AlertDialog.Description className="text-gray-600 mt-3 mb-5 text-[15px] leading-normal">
                    This action cannot be undone. This will move <span className="text-gray-700 font-semibold capitalize" >{language} CodeSpace</span> on <span className="text-gray-700 font-semibold" >{heading}</span> to Trash page you can restore at anytime.
                  </AlertDialog.Description>
                  <div className="flex justify-start gap-[25px]">
                    <AlertDialog.Action asChild>
                      <button
                        onClick={() => {
                          handleDeleteCodeSpace(data);
                          navigate('/dashboard/space/list');
                        }}
                        className="bg-red-500 text-white hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                      >
                        Move to Trash
                      </button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel asChild>
                      <button className="bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                        Cancel
                      </button>
                    </AlertDialog.Cancel>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>
        </div>
        <div className="py-6 md:px-4 md:py-6">
          <div className="flex flex-row items-center w-fit md:w-full justify-between gap-4 mb-6">
            <span className="inline-flex items-center md:gap-3 justify-start md:space-x-2">
              <h1 className="text-xl hidden md:block font-semibold ms-2 text-gray-600">Shared with</h1>
              <button onClick={() => { setisShareOpen(true) }} className="p-2.5 bg-black/90 text-white active:scale-95 transition-all rounded-lg" >
                <FaUserPlus className="text-base" />
              </button>
              <AlertDialog.Root open={isShareOpen}>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay className="bg-black/30 fixed inset-0" />
                  <AlertDialog.Content className="fixed top-1/2 left-1/2 max-h-[80vh] w-[90vw] max-w-[900px] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-md focus:outline-none p-6 z-50">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 flex justify-center items-center">
                        <img
                          src="https://cdn.pixabay.com/photo/2024/01/15/08/56/women-8509637_640.jpg"
                          alt="Share Image"
                          className="rounded-lg w-full h-36 md:h-72 object-center object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <h1 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">Share Your {language[0].toUpperCase() + language.slice(1)} CodeSpace</h1>
                        <p className="text-gray-500  font-normal">You can share your CodeSpace for <span className="font-semibold text-gray-600" >{heading}</span> with others, so they can access and edit it from their shared space.</p>


                        <form className="flex flex-col mt-4 gap-4" onSubmit={HandleShare}>
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg className="size-4 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                              </svg>
                            </div>
                            <input type="email" value={Share.email || ""}
                              onChange={(e) => setShare({ ...Share, email: e.target.value })} className="placeholder-gray-500 border border-gray-300 text-gray-700 text-sm rounded-lg focus:outline-none block w-full  pl-10 p-2" placeholder="example@gmail.com" required />
                          </div>

                          <div className="flex items-center justify-between md:justify-start gap-3">
                            <label htmlFor="viewerMode" className="text-base w-[7.5rem] text-center font-medium text-white px-2 py-0.5 rounded-md bg-blue-500">
                              {isEditorMode ? 'Editor Mode' : 'Viewer Mode'}
                            </label>
                            <button type="button" onClick={() => {
                              const newMode = !isEditorMode;
                              setShare((prevState) => ({
                                ...prevState,
                                isEditorMode: newMode,
                              }));
                              setisEditorMode(newMode);
                            }}
                              class={`relative inline-block h-7 w-14 cursor-pointer rounded-md transition [-webkit-tap-highlight-color:_transparent] ${isEditorMode ? 'bg-black/70' : 'bg-gray-300'}`}
                            >
                              <input checked={isEditorMode}
                                className="peer sr-only" id="AcceptConditions" type="checkbox" />
                              <span
                                class={`absolute inset-y-0 m-1 w-5 rounded ring-2 ring-inset transition-all ${isEditorMode ? ' start-7 bg-white ring-transparent' : 'bg-gray-300 start-0 ring-white'}`}
                              ></span>
                            </button>
                          </div>

                          <div className="mt-6 flex justify-end gap-4">
                            <AlertDialog.Cancel asChild>
                              <button
                                type="button"
                                className="bg-gray-200 text-gray-800 rounded-lg px-6 py-2"
                                onClick={() => setisShareOpen(false)}
                              >
                                Cancel
                              </button>
                            </AlertDialog.Cancel>
                            <button
                              type="submit"
                              disabled={isSharing}
                              className="bg-black disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-lg px-6 py-2"
                            >
                              Share
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>

                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog.Root>
            </span>
            <button className="rounded-lg uppercase py-2 px-3 bg-gray-200 flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition">
              {language}
            </button>
          </div>
          <div className="grid gap-3 md:mx-3 mb-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {CodeShared.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow flex gap-3 items-center justify-between"
              >
                <p className="text-sm text-gray-700 truncate" title={item.email}>
                  {item.email}
                </p>
                <span className="flex items-center gap-2">


                  <AlertDialog.Root>
                    <AlertDialog.Trigger asChild>
                      <button
                        disabled={isRevoking}
                        className={`bg-red-500 text-white disabled:opacity-60 disabled:cursor-not-allowed text-xs px-2 py-0.5 rounded-lg transition duration-200 ease-in-out hover:bg-red-700 active:bg-red-800 focus:outline-none`}
                      >
                        Revoke
                      </button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Portal>
                      <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] z-50 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <AlertDialog.Title className="text-red-600 font-semibold m-0 text-xl">
                          Remove Access to User
                        </AlertDialog.Title>
                        <AlertDialog.Description className="text-gray-600 mt-3 mb-5 text-[15px] leading-normal">
                          This action cannot be undone. This will remove the access to <span className="truncate font-semibold text-gray-600">{item.email}</span> to access this <span className="uppercase">{language}</span> CodeSpace.
                        </AlertDialog.Description>
                        <div className="flex justify-start gap-[25px]">

                          <AlertDialog.Action asChild>
                            <button
                              onClick={() => HandleRevoke(item)}
                              className="bg-red-500 text-white hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                            >
                              Revoke Access
                            </button>
                          </AlertDialog.Action>
                          <AlertDialog.Cancel asChild>
                            <button className="bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                              Cancel
                            </button>
                          </AlertDialog.Cancel>
                        </div>
                      </AlertDialog.Content>
                    </AlertDialog.Portal>
                  </AlertDialog.Root>

                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button
                          disabled={isChanging}
                          onClick={() => handleToggleViewerMode(item)}
                          class={`relative disabled:opacity-50 disabled:cursor-not-allowed inline-block h-5 w-9 cursor-pointer rounded-lg transition [-webkit-tap-highlight-color:_transparent] ${item.isEditorMode ? 'bg-black/90' : 'bg-gray-300'}`}
                        >
                          <input class="peer sr-only" id="AcceptConditions" type="checkbox" />
                          <span
                            class={`absolute inset-y-0  m-1 size-3 rounded ring-[3px] ring-inset  transition-all ${item.isEditorMode ? 'start-[1.3rem] w-1 bg-white ring-transparent' : 'bg-gray-300 start-0 ring-white'}`}
                          ></span>
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="select-none rounded bg-white px-[15px] py-2.5 text-[15px] leading-none text-black/80 shadow-md will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
                          sideOffset={10}
                        >
                          {item.isEditorMode ? 'Editor Mode' : 'Viewer Mode'}
                          <Tooltip.Arrow className="fill-white" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </span>
              </div>
            ))}
          </div>
          <div
            className="prose jarvis no-tailwindcss "
            dangerouslySetInnerHTML={{ __html: converter.makeHtml(explanation.slice(0, 500) + '..') }}
          ></div>
        </div>
      </div >
      {/* <div className="absolute top-5 left-5 bg-white p-0.5 rounded-full">
        <Link to="/dashboard/space/list" className="active:scale-95 transition-all" >
          <FaCircleArrowLeft className="text-3xl shadow-md rounded-full text-black" />
        </Link>
      </div> */}
      <div className="absolute top-5 right-5 text-sm text-white bg-black/80 px-2 py-1 rounded-md">
        {ParseFullDate(data.createdAt)}
      </div>
      <Toaster />
    </section >
  );
}

export default SpaceInfo;
