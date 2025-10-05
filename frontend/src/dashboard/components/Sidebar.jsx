import {
  RectangleStackIcon,
  UserIcon,
  UserGroupIcon,
  WrenchIcon,
  TrophyIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { ArrowUpDown, CalendarDays } from "lucide-react";

export default function Sidebar({ onClose }) {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  const itemData = [
    { id: 1, name: "Dashboard", icon: <RectangleStackIcon className="size-5" />, path: "/dashboard" },
    { id: 2, name: "Beneficiaries", icon: <UserIcon className="size-5" />, path: "/dashboard/beneficiares" },
    { id: 3, name: "Appointement", icon: <CalendarDays className="size-5" />, path: "/dashboard/appointement" },
    { id: 4, name: "Entries", icon: <ArrowUpDown className="size-5" />, path: "/dashboard/entries" },
    { id: 5, name: "Testimonials", icon: <TrophyIcon className="size-5" />, path: "/dashboard/testimonials" },
    { id: 6, name: "Users", icon: <UserGroupIcon className="size-5" />, path: "/dashboard/users" },
    { id: 7, name: "Settings", icon: <WrenchIcon className="size-5" />, path: "/dashboard/settings" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-tr-xl rounded-br-xl">
      <div className="lg:hidden flex justify-end p-3">
        <button onClick={onClose}>
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="p-4 flex items-center gap-2 bg-gray-100 rounded-tr-xl">
        <div className="size-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold"> LFD</div>
        <h1 className="text-xl font-bold text-green-600">Dashboard</h1>
      </div>
      <div className="pt-4">
        <h1 className="p-4 text-xl font-bold text-green-600">Management</h1>
      </div>

      <div className="flex flex-col flex-1 space-y-1">
        {itemData.map((item) => {
          const isActive = location.pathname === item.path || activeItem === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => {
                setActiveItem(item.id);
                if (onClose) onClose(); 
              }}
              className={`flex items-center gap-3 py-2 px-4 rounded-md transition duration-200 ${
                isActive
                  ? "text-violet-500 font-semibold bg-violet-50"
                  : "text-gray-400 hover:text-violet-500 hover:bg-violet-50"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <button className="mt-auto bg-green-500 p-2 px-4 rounded-md m-4 text-md text-gray-200 font-bold hover:bg-green-400">
        Logout
      </button>
    </div>
  );
}
