import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  CalendarDaysIcon,
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import ProgressBadge from "../../../../components/ProgressBadge/ProgressBadge";

const TaskItems = ({ id, containerData, itemsData }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "px-2 py-4 bg-light-black-500 shadow-md rounded-xl w-full border border-transparent hover:border-stone-500 cursor-pointer",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex flex-col" {...listeners}>
        <div className="py-4 ">
          <div className="-mt-4 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className=" ml-4">
              <div className="flex items-center">
                <div>
                  <ProgressBadge name={containerData?.name} />
                </div>
              </div>
            </div>
            <div className=" ml-4 flex shrink-0">
              <Menu as="div" className="relative ml-3 inline-block text-left">
                <div>
                  <MenuButton className="-my-2 flex items-center  p-2 text-white hover:text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon
                      aria-hidden="true"
                      className="size-5"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="/"
                        className="flex justify-between px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        <span>Edit</span>
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/"
                        className="flex justify-between px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        <span>Delete</span>
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div className="text-white mt-4">
            <h2 className="font-semibold text-xl">{itemsData?.title}</h2>
            <p className="text-sm font-light mt-1">{itemsData?.description}</p>

            <div className="flex items-center justify-between space-x-3 mt-4 ">
              <div className="flex">
                <button
                  type="button"
                  className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-white"
                >
                  <CalendarDaysIcon
                    aria-hidden="true"
                    className="mr-2 -ml-1 size-5 "
                  />
                  <span className="text-sm text-white ">
                    {itemsData?.dueDate}
                  </span>
                </button>
              </div>
              <div className="shrink-0">
                <span
                  className={`inline-flex items-center rounded-md ${
                    itemsData?.priority == "High"
                      ? " bg-rose-800"
                      : "bg-lime-700"
                  } px-2 py-1 text-xs font-medium text-white`}
                >
                  {itemsData?.priority}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {itemsData?.attachmentsCount > 0 && itemsData?.commentsCount > 0 && (
        <div className="flex items-center justify-between space-x-3 border-t border-stone-500 py-2 ">
          <div className="flex">
            <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <ChatBubbleLeftEllipsisIcon
                aria-hidden="true"
                className="mr-2 -ml-1 size-5 group-hover:text-gray-500"
              />
              <span className="text-sm text-gray-400  group-hover:text-gray-400">
                {itemsData?.commentsCount} Comments
              </span>
            </button>
            <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon
                aria-hidden="true"
                className="mr-2 -ml-1 size-5 group-hover:text-gray-500"
              />
              <span className="text-sm text-gray-400  group-hover:text-gray-400">
                {itemsData?.attachmentsCount} Attachments
              </span>
            </button>
          </div>
        </div>
      )}

    
    </div>
  );
};

export default TaskItems;
