
import SearchBar from "../../../../components/SearchBar/SearchBar";
import Avatar from "../../../../components/Avatar/Avatar";
import { BellIcon } from "@heroicons/react/24/outline";

const TenderTaskHeader = () => {
  return (
    <div className="border-b border-stone-500 pb-5 sm:flex sm:items-center sm:justify-between ">
      <h1 className="text-2xl font-semibold text-white">Tender Tasks</h1>
      <div className="mt-3 flex sm:ml-4 sm:mt-0">
        <div className="mr-4">
          <SearchBar />
        </div>
        <div className="ml-3 flex items-center">
          <Avatar />
        </div>
        <div className="flex  shrink-0 ml-3 items-center">
          <button type="button" className="-m-2.5 p-2.5 text-gray-400">
            <BellIcon className="size-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenderTaskHeader;
