import TenderTaskHeader from "./components/TenderTaskHeader/TenderTaskHeader";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import ViewTabs from "./components/ViewTabs/ViewTabs";
import { useState } from "react";
// import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
import KanbanBoard from "./components/KanbanBoard/KanbanBoard";
const TenderTaskPage = () => {
  const [activeTab, setActiveTab] = useState("board");
  return (
    <div>
      <div className="bg-light-black-500 rounded-lg px-4 py-5 shadow ">
        <TenderTaskHeader />
        <div className="px-4 py-5 sm:px-4 mt-2">
          <div className="-mt-2 -ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="mt-2 ml-4 sm:flex-1  items-center rounded-full bg-dark-black-700 ">
              <ViewTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="mt-4 flex lg:mt-0 lg:ml-4">
              <span className="sm:ml-3 mt-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-dark-black-700 px-3 py-3 text-sm font-semibold text-white shadow-xs       border border-transparent hover:border-amber-400  focus:outline-none  focus-visible:outline-2 focus-visible:outline-offset-2  focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-all duration-200"
                >
                  View Tender Details
                </button>
              </span>
              <span className="sm:ml-3 mt-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-full  bg-transparent-500 px-5 py-3 text-sm font-semibold text-white shadow-xs border ring-white hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <AdjustmentsVerticalIcon
                    aria-hidden="true"
                    className="mr-1.5 -ml-0.5 size-5"
                  />
                  Columns
                </button>
              </span>
            </div>
          </div>
        </div>
        <div>
           <KanbanBoard/>
        </div>
      </div>
    </div>
  );
};

export default TenderTaskPage;
