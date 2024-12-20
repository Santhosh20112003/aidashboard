import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { LANGUAGE_VERSIONS } from '../../../constants';
import { ParseAIDate } from "../../../common/methods"
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from '@radix-ui/react-dialog';
import { Toaster } from 'react-hot-toast';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaXmark } from 'react-icons/fa6';
import * as HoverCard from "@radix-ui/react-hover-card";
import * as ContextMenu from "@radix-ui/react-context-menu";


function WebTrash() {
  const { isDeleteOpen, webTrashes, HandleWebSpaceRestore, HandleWebSpaceDelete, isRestoring, isDeleting, HandleCodeTrashEmpty, setisDeleteOpen } = useData();

  return (
    <div className="w-full min-h-[90vh] px-6 py-6 bg-gray-50">
      <div className="w-full flex items-center mb-8 justify-between">
        <h1 className="text-2xl ms-2 font-bold text-gray-800">Your WebTrash</h1>
        {webTrashes.length > 0 && <button disabled={isDeleting} onClick={() => setisDeleteOpen(true)} className="text-red-700 disabled:cursor-not-allowed disabled:opacity-60 hover:underline underline-offset-2 font-medium">
          Empty Trash
        </button>}
        <Dialog.Root open={isDeleteOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-md focus:outline-none">
              <Dialog.Title className="text-mauve12 m-0 text-xl font-semibold">
                Permanently Delete WebSpaces
              </Dialog.Title>
              <Dialog.Description className="text-mauve11 font-normal mt-[10px] mb-5 text-[15px] leading-normal">
                Are you sure you want to permanently delete all the WebSpaces in the Trash? This action cannot be undone.
              </Dialog.Description>

              <div className="flex justify-start gap-3">
                <button disabled={isDeleting} onClick={() => HandleCodeTrashEmpty("webspacetrash")} className="px-4 py-2 bg-red-600 disabled:bg-red-400 text-white rounded-md hover:bg-red-700">
                  Delete, all Webspaces
                </button>
                <button onClick={() => setisDeleteOpen(false)} className="px-4 py-2 bg-main/10 text-main/90 rounded-md hover:bg-main/20">
                  Cancel
                </button>
              </div>

              <button
                onClick={() => setisDeleteOpen(false)}
                className="text-main hover:bg-gray-100  absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none"
              >
                <FaXmark />
              </button>

            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <div className="container mx-auto">
        {webTrashes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {webTrashes.map((item, index) => (
              <ContextMenu.Root>
                <ContextMenu.Trigger>
                  <HoverCard.Root>
                    <HoverCard.Trigger asChild>
                      <div key={index}
                        className=" relative cursor-default block p-5 bg-white  rounded-lg border border-gray-200 hover:shadow-md  transform transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <img
                              src={LANGUAGE_VERSIONS[item.frameworks]?.image || 'https://via.placeholder.com/50'}
                              alt={item.frameworks}
                              className="w-8 object-cover"
                            />
                            <div className="ml-3">
                              <h2 className="text-[0.9rem] leading-relaxed line-clamp-1 font-semibold text-gray-700 group-hover:text-gray-900">
                                {item.heading}
                              </h2>
                              <p className="text-xs leading-relaxed line-clamp-1 text-gray-500">{item.spaceid}</p>
                            </div>
                          </div>

                          <Popover.Root>
                            <Popover.Trigger asChild>
                              <button className="bg-gray-100 md:hidden active:scale-95 transition-all text-gray-800 p-2 rounded-md">
                                <BsThreeDotsVertical />
                              </button>
                            </Popover.Trigger>
                            <Popover.Portal>
                              <Popover.Content
                                sideOffset={5}
                                side="left"
                                className="mt-12 rounded-md p-2 flex flex-col border border-gray-100 bg-white shadow-md w-48"
                              >
                                <button disabled={isRestoring} onClick={() => HandleWebSpaceRestore(item)} className="ps-3 py-1 w-full disabled:cursor-not-allowed disabled:opacity-60 text-start text-gray-700 hover:bg-gray-100 rounded-md ">
                                  Restore
                                </button>
                                <button disabled={isDeleting} onClick={() => HandleWebSpaceDelete(item)} className="ps-3 py-1 w-full disabled:cursor-not-allowed disabled:opacity-60 text-start text-red-700 hover:bg-red-100 rounded-md disabled:bg-red-400">
                                  Delete Forever
                                </button>
                              </Popover.Content>
                            </Popover.Portal>
                          </Popover.Root>
                        </div>

                        <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-2">
                          {item.explanation || 'No description available for this space.'}
                        </p>

                        {/* <p className="absolute top-2 right-2 px-1 pb-0.5 rounded bg-black/90 text-white text-xs">{item.language}</p> */}
                      </div>
                    </HoverCard.Trigger>
                    <HoverCard.Portal>
                      <HoverCard.Content
                        className="max-w-[500px] border hidden md:block relative rounded-md bg-white p-5 shadow-md data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
                        sideOffset={20}
                      >
                        <div className="flex items-center gap-3 absolute top-2 right-3">
                          <div className="text-xs bg-black text-white rounded-md px-2 py-0.5">{ParseAIDate(item.updatedAt)}</div>
                          <div className=" text-xs text-white px-2 py-0.5 rounded-md bg-mauve10 uppercase">{item.type}</div>
                        </div>
                        <div className="flex flex-col">
                          <img
                            className="block w-[40px] max-h-[45px] mb-4"
                            src={LANGUAGE_VERSIONS[item.frameworks]?.image || 'https://via.placeholder.com/50'}
                            alt="Radix UI"
                          />
                          <div className="flex flex-col ">
                            <div>
                              <div className="capitalize text-[15px] font-medium text-mauve12">
                                {item?.frameworks}
                              </div>
                              <div className=" text-[12px] text-mauve10">@{item?.spaceid}</div>
                            </div>
                            <div className="leading-relaxed line-clamp-1 mt-3 font-semibold text-[18px] text-mauve12">
                              {item?.heading}
                            </div>
                            <p className="text-sm text-mauve11  leading-relaxed line-clamp-3">
                              {item.explanation || 'No description available for this space.'}
                            </p>
                          </div>
                        </div>

                        <HoverCard.Arrow className="fill-gray-200" />
                      </HoverCard.Content>
                    </HoverCard.Portal>
                  </HoverCard.Root>
                </ContextMenu.Trigger>
                <ContextMenu.Portal>
                  <ContextMenu.Content
                    className="min-w-[220px] border overflow-hidden rounded-md bg-white p-[5px] shadow-md"
                    sideOffset={5}
                    align="end"
                  >
                    <ContextMenu.Item disabled={isRestoring} onClick={() => HandleWebSpaceRestore(item)} className="ps-3 py-1 w-full focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 text-start text-gray-700 hover:bg-gray-100 rounded-md ">
                      Restore
                    </ContextMenu.Item>
                    <ContextMenu.Item disabled={isDeleting} onClick={() => HandleWebSpaceDelete(item)} className="ps-3 py-1 w-full focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 text-start text-red-700 hover:bg-red-100 rounded-md disabled:bg-red-400">
                      Delete Forever
                    </ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu.Portal>
              </ContextMenu.Root>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <img
              src="https://ik.imagekit.io/vituepzjm/undraw_taken_re_yn20.svg?updatedAt=1724617636363"
              alt="Nothing to show"
              className="w-32 mb-6"
            />
            <h2 className="text-xl italic text-gray-600">No WebSpaces are available in the Trash.</h2>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default WebTrash;
