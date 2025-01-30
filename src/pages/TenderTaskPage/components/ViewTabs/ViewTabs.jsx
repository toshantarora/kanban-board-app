import { ChevronDownIcon } from "@heroicons/react/16/solid";

const tabs = [
  { name: "List View", id: "list" },
  { name: "Board View", id: "board" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ViewTabs({ activeTab, setActiveTab }) {
  return (
    <div>
      {/* Mobile Dropdown */}
      <div className="grid grid-cols-1 sm:hidden relative">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-full bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 
                     -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-400"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 fill-gray-500"
        />
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:block">
        <nav aria-label="Tabs" className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={classNames(
                activeTab === tab.id
                  ? "text-white border  border-amber-400"
                  : "text-gray-500 hover:text-amber-200   ",

                "rounded-full px-4 py-3 text-sm font-medium transition-all duration-200"
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
