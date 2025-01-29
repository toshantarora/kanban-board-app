import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div className="mt-3 flex sm:mt-0 sm:ml-4 relative w-full max-w-lg">
      <input
        id="query"
        name="query"
        type="text"
        placeholder="Search for Tenders"
        aria-label="Search for Tenders"
        className="block lg:w-2xl   w-full rounded-md bg-white py-2 pr-10 pl-3 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
      />
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400"
      />
    </div>
  );
}
