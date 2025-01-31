import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { getStatusColor } from "../../../../utils/functions";

const CardContainer = ({ id, children, data }) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "w-full h-full p-4 bg-dark-black-700 rounded-md flex flex-col gap-y-4",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center justify-between" {...listeners}>
        <div className="flex flex-col gap-y-1">
          <h1
            id="message-heading"
            className="text-base font-semibold text-white"
          >
            <span className="inline-flex items-center gap-x-2 text-xs font-medium text-blue-700 mr-3">
              <svg
                viewBox="0 0 6 6"
                aria-hidden="true"
                className={`w-3 h-3 ${getStatusColor(data?.name)}`}
              >
                <circle r={3} cx={3} cy={3} />
              </svg>
            </span>
            {data?.name}

            <span className="inline-flex ml-3 items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-cyan-600 text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {data?.items?.length}
            </span>
          </h1>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:shrink-0 sm:justify-start">
          <span className="inline-flex items-center  px-2 py-1 text-xs font-medium text-white">
            <PlusIcon aria-hidden="true" className="size-5" />
          </span>
          <Menu as="div" className="relative ml-3 inline-block text-left">
            <div>
              <MenuButton className="-my-2 flex items-center  p-2 text-white hover:text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
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

      {children}
    </div>
  );
};

export default CardContainer;
