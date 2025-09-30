import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";

export default function NavbarDashboard({ onMenuClick }) {
  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 shadow-sm w-full">
      
      <button
        className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
        onClick={onMenuClick}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      <h1 className="text-lg font-semibold text-gray-700 hidden lg:block">
        Dashboard
      </h1>

      <div className="flex items-center gap-4 ml-auto">
        <button className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}
