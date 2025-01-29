import {  useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ArrowTrendingUpIcon,
  RectangleGroupIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../components/Sidebar/Sidebar";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const navigation = [
  { name: "Search", href: "/", icon: MagnifyingGlassIcon, current: true },
  { name: "Tender Tasks", href: "/", icon: RectangleGroupIcon, current: false },
  { name: "Progress", href: "/", icon: ArrowTrendingUpIcon, current: false },
  { name: "Connect", href: "/", icon: PhoneIcon, current: false },
];
const Layout = ({children}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-20 lg:flex-col ">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto  bg-dark-black-700 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-400"
            >
              <Bars3Icon className="size-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.current
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "size-6 shrink-0"
                          )}
                        />
                        {/* {item.name} */}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden ">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>

      <main className="py-10 lg:pl-16 ">
        <div className="px-4 sm:px-6 lg:px-8 ">  {children} </div>
      </main>
    </div>
  );
};

export default Layout;
